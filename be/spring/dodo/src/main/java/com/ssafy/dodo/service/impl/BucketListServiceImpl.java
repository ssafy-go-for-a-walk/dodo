package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.AddedBucketDto;
import com.ssafy.dodo.dto.BucketListInfoDto;
import com.ssafy.dodo.dto.CreateBucketListDto;
import com.ssafy.dodo.entity.*;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import com.ssafy.dodo.repository.*;
import com.ssafy.dodo.service.BucketListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BucketListServiceImpl implements BucketListService {

    private static final String DEFAULT_BUCKETLIST_IMAGE = "https://dodo-walk-bucket.s3.ap-northeast-2.amazonaws.com/default-bucklist-image.jpg";
    private static final String DEFAULT_BUCKETLIST_NAME = "새로운 버킷리스트";

    private final AddedBucketRepository addedBucketRepository;
    private final UserRepository userRepository;
    private final BucketListRepository bucketListRepository;
    private final PublicBucketRepository publicBucketRepository;
    private final PreferenceRepository preferenceRepository;
    private final S3FileService s3FileService;
    private final BucketListMemberRepository bucketListMemberRepository;

    @Override
    public Page<AddedBucketDto> getBucketListBuckets(UserDetails userDetails, Long bucketListSeq, Pageable pageable) {

        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));

        Page<AddedBucket> allByBucketList = addedBucketRepository.findAllByBucketList(bucketList, pageable);

        Page<AddedBucketDto> addedBucketDtos = allByBucketList
                .map(a -> AddedBucketDto.builder()
                        .addedBucketSeq(a.getSeq())
                        .bucketListSeq(a.getBucketList().getSeq())
                        .bucketSeq(a.getPublicBucket().getSeq())
                        .isComplete(a.isComplete())
                        .emoji(a.getEmoji())
                        .dDay(a.getDDay())
                        .location(a.getLocation())
                        .desc(a.getDesc())
                        .build());

        return addedBucketDtos;
    }

    @Override
    public void addSearchedBucket(Long bucketListSeq, Long publicBucketSeq, UserDetails userDetails) {

        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));

        PublicBucket publicBucket = publicBucketRepository.findById(publicBucketSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_NOT_FOUND));

        if(addedBucketRepository.existsByBucketListAndPublicBucket(bucketList, publicBucket)){
            throw new CustomException(ErrorCode.DUPLICATED_BUCKET);
        }

        // added_bucket
        addedBucketRepository.save(AddedBucket.builder()
                        .isComplete(false)
                        .emoji(publicBucket.getEmoji())
                        .bucketList(bucketList)
                        .publicBucket(publicBucket)
                        .build()
        );

        // preference
        preferenceRepository.save(Preference.builder()
                .user(user)
                .publicBucket(publicBucket)
                .build()
        );

        // public_bucket 담은 수 +1
        publicBucketRepository.plusAddedCount(Arrays.asList(publicBucket));
    }

    @Override
    public void updateBucketListInfo(Long bucketListSeq, BucketListInfoDto bucketListInfoDto, MultipartFile file, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));

        if(file != null)
            bucketList.updateBucketListImage(s3FileService.uploadFile(file));

        // 공개 여부를 바꾸면 자신이 만든 public_buckets의 공개 여부도 똑같이 바꾼다
        if(bucketList.isPublic() != bucketListInfoDto.getIsPublic()){
            List<AddedBucket> addedBuckets = addedBucketRepository.findAllByBucketList(bucketList, null).getContent();

            List<Long> publicBuckets = addedBuckets.stream()
                    .filter(addedBucket -> addedBucket.getPublicBucket().getCreatedBy() == user.getSeq())
                    .map(addedBucket -> addedBucket.getPublicBucket().getSeq())
                    .collect(Collectors.toList());

            if(bucketListInfoDto.getIsPublic()){
                publicBucketRepository.makePublicAllBySeqIn(publicBuckets);
            }else{
                publicBucketRepository.makePrivateAllBySeqIn(publicBuckets);
            }
        }

        bucketList.updateBucketListInfo(bucketListInfoDto.getTitle(), bucketListInfoDto.getIsPublic());
    }

    @Override
    public void deleteBucketList(Long bucketListSeq, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));

        // added_buckets의 public_buckets의 선호도 삭제
        List<AddedBucket> addedBuckets = addedBucketRepository.findAllByBucketList(bucketList, null).getContent();

        List<PublicBucket> publicBuckets = addedBuckets.stream()
                .map(a -> a.getPublicBucket()).collect(Collectors.toList());

        preferenceRepository.deleteAllByUserAndPublicBucketIn(user, publicBuckets);

        // public_buckets의 담은 수 -1
        publicBucketRepository.minusAddedCount(publicBuckets);

        // 버킷리스트에 있는 added_buckets 다 삭제
        addedBucketRepository.deleteByBucketList(bucketList);

        // 버킷리스트 삭제
        bucketListRepository.delete(bucketList);
    }

    @Override
    public BucketList createBucketList(User user, CreateBucketListDto dto, MultipartFile image) {
        return createBucketList(user, dto.getTitle(), dto.getType(), image);
    }

    @Override
    public BucketList createBucketList(User user, String title, BucketListType type, MultipartFile image) {
        // title이 없는 경우 기본 버킷리스트 이름으로 생성
        title = title == null ? DEFAULT_BUCKETLIST_NAME : title;

        // 업로드된 이미지가 없으면 디폴트 이미지로 저장
        // 업로드된 이미지가 있으면 S3에 업로드 후 이미지 경로 저장
        String bucketListImage = image == null ? DEFAULT_BUCKETLIST_IMAGE : s3FileService.uploadFile(image);

        // 버킷리스트 생성
        BucketList bucketList = BucketList.builder()
                .title(title)
                .type(type)
                .image(bucketListImage)
                .build();
        bucketList = bucketListRepository.save(bucketList);

        // 사용자를 버킷리스트 멤버로 등록
        BucketListMember bucketListMember = BucketListMember.builder()
                .user(user)
                .bucketList(bucketList)
                .build();
        bucketListMemberRepository.save(bucketListMember);

        return bucketList;
    }

    @Override
    public Double getBucketListCompleteRate(Long bucketListSeq) {
        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));

        // 소수점 첫번째자리까지 리턴
        return Math.round(bucketListRepository.getBucketListCompleteRate(bucketList) * 10) / 10.0;
    }
}
