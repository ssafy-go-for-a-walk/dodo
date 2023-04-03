package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.dto.*;
import com.ssafy.dodo.entity.*;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import com.ssafy.dodo.repository.*;
import com.ssafy.dodo.service.BucketListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class BucketListServiceImpl implements BucketListService {

    private static final String DEFAULT_BUCKETLIST_IMAGE = "https://dodo-walk-bucket.s3.ap-northeast-2.amazonaws.com/default-bucklist-image.jpg";
    private static final String DEFAULT_BUCKETLIST_NAME = "새로운 버킷리스트";
    public static final String INVITE_BUCKETLIST_CLAIM_KEY = "buckletlist";
    public static final String INVITER_CLAIM_KEY = "inviter";

    private final AddedBucketRepository addedBucketRepository;
    private final UserRepository userRepository;
    private final BucketListRepository bucketListRepository;
    private final PublicBucketRepository publicBucketRepository;
    private final PreferenceRepository preferenceRepository;
    private final S3FileService s3FileService;
    private final BucketListMemberRepository bucketListMemberRepository;
    private final InviteTokenRepository inviteTokenRepository;

    @Override
    public Map<String, Object> getBucketListInfo(UserDetails userDetails, Long bucketListSeq) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));


        List<AddedBucket> allByBucketList = addedBucketRepository.findAllByBucketList(bucketList);

        List<AddedBucketDto> addedBucketDtos = allByBucketList.stream()
                .map(a -> AddedBucketDto.builder()
                        .seq(a.getSeq())
                        .title(a.getPublicBucket().getTitle())
                        .category(a.getPublicBucket().getCategory() != null ? CategoryInfoDto.of(a.getPublicBucket().getCategory()) : null)
                        .isComplete(a.isComplete())
                        .emoji(a.getEmoji())
                        .dDay(a.getDDay())
                        .location(a.getLocation())
                        .desc(a.getDesc())
                        .build())
                .collect(Collectors.toList());

        Map<String, Object> ret = new HashMap<>();
        ret.put("bucketListInfo", new BucketListInfoDto(bucketList));
        ret.put("addedBuckets", addedBucketDtos);

        return ret;
    }

    @Override
    public List<AddedBucketDto> getBucketListBuckets(UserDetails userDetails, Long bucketListSeq) {

        /**
         *  페이징 처리 삭제
         */

        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));

        List<AddedBucket> allByBucketList = addedBucketRepository.findAllByBucketList(bucketList);

        List<AddedBucketDto> addedBucketDtos = allByBucketList.stream()
                .map(a -> AddedBucketDto.builder()
                        .seq(a.getSeq())
                        .title(a.getPublicBucket().getTitle())
                        .category(a.getPublicBucket().getCategory() == null ? null : CategoryInfoDto.of(a.getPublicBucket().getCategory()))
                        .isComplete(a.isComplete())
                        .emoji(a.getEmoji())
                        .dDay(a.getDDay())
                        .location(a.getLocation())
                        .desc(a.getDesc())
                        .build())
                .collect(Collectors.toList());

        return addedBucketDtos;
    }

    @Override
    public List<AddedBucketDto> addSearchedBucket(Long bucketListSeq, Long publicBucketSeq, UserDetails userDetails) {

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

        List<AddedBucket> allByBucketList = addedBucketRepository.findAllByBucketList(bucketList);

        List<AddedBucketDto> addedBucketDtos = allByBucketList.stream()
                .map(a -> AddedBucketDto.builder()
                        .seq(a.getSeq())
                        .title(a.getPublicBucket().getTitle())
                        .category(a.getPublicBucket().getCategory() == null ? null : CategoryInfoDto.of(a.getPublicBucket().getCategory()))
                        .isComplete(a.isComplete())
                        .emoji(a.getEmoji())
                        .dDay(a.getDDay())
                        .location(a.getLocation())
                        .desc(a.getDesc())
                        .build())
                .collect(Collectors.toList());

        return addedBucketDtos;
    }

    @Override
    public BucketListInfoDto updateBucketListInfo(Long bucketListSeq, BucketListInfoDto bucketListInfoDto, MultipartFile file, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));

        if(file != null)
            bucketList.updateBucketListImage(s3FileService.uploadFile(file));

        // 공개 여부를 바꾸면 자신이 만든 public_buckets의 공개 여부도 똑같이 바꾼다
        if(bucketList.isPublic() != bucketListInfoDto.getIsPublic()){
            List<AddedBucket> addedBuckets = addedBucketRepository.findAllByBucketList(bucketList);

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

        return new BucketListInfoDto(bucketList);
    }

    @Override
    public Map<String, List<SimpleBucketListDto>> deleteBucketList(Long bucketListSeq, UserDetails userDetails) {
        User user = userRepository.findById(Long.parseLong(userDetails.getUsername()))
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        BucketList bucketList = bucketListRepository.findById(bucketListSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));

        if(bucketList.isDefault()){
            throw new CustomException(ErrorCode.DEFAULT_BUCKET_LIST);
        }

        // added_buckets의 public_buckets의 선호도 삭제
        List<AddedBucket> addedBuckets = addedBucketRepository.findAllByBucketList(bucketList);

        List<PublicBucket> publicBuckets = addedBuckets.stream()
                .map(a -> a.getPublicBucket()).collect(Collectors.toList());

        preferenceRepository.deleteAllByUserAndPublicBucketIn(user, publicBuckets);

        // public_buckets의 담은 수 -1
        publicBucketRepository.minusAddedCount(publicBuckets);

        // 버킷리스트에 있는 added_buckets 다 삭제
        addedBucketRepository.deleteByBucketList(bucketList);

        // 버킷리스트 삭제
        bucketListRepository.delete(bucketList);

        List<SimpleBucketListDto> list = bucketListRepository.getBucketListByUserWithCompleteRate(user);

        Map<String, List<SimpleBucketListDto>> data = new HashMap<>();
        data.put(BucketListType.SINGLE.name(), new ArrayList<>());
        data.put(BucketListType.GROUP.name(), new ArrayList<>());

        for (SimpleBucketListDto simpleBucketListDto : list) {
            data.get(simpleBucketListDto.getType().name()).add(simpleBucketListDto);
        }

        return data;
    }

    @Override
    public BucketList createBucketList(User user, CreateBucketListDto dto, MultipartFile image, boolean isDefault) {
        return createBucketList(user, dto.getTitle(), dto.getType(), image, isDefault);
    }

    @Override
    public BucketList createBucketList(User user, String title, BucketListType type, MultipartFile image, boolean isDefault) {
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
                .isDefault(isDefault)
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

        Double completeRate = bucketListRepository.getBucketListCompleteRate(bucketList);

        // 소수점 첫번째자리까지 리턴
        return completeRate == null ? 0.0 : Math.round(completeRate * 10) / 10.0;
    }

    @Override
    public String createInviteToken(Long bucketListSeq, Long inviterSeq) {
        String inviteTokenKey = createInviteTokenKey();
        InviteToken inviteToken = new InviteToken(inviteTokenKey, bucketListSeq, inviterSeq);
        inviteTokenRepository.save(inviteToken);

        return inviteTokenKey;
    }

    private String createInviteTokenKey() {
        int leftLimit = 48; // numeral '0'
        int rightLimit = 122; // letter 'z'
        int targetStringLength = 10;
        Random random = new Random();

        String generatedString = random.ints(leftLimit, rightLimit + 1)
                .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
                .limit(targetStringLength)
                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
                .toString();

        return generatedString;
    }

    @Override
    public void joinBucketList(Long participantSeq, String inviteToken) {
        // 참여하려는 유저 조회
        User participant = userRepository.findById(participantSeq)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        // 초대 토큰 조회
        InviteToken token = inviteTokenRepository.findById(inviteToken)
                .orElseThrow(() -> new CustomException(ErrorCode.EXPIRE_OR_NOT_EXIST_TOKEN));

        // 참여하려는 버킷리스트 조회
        BucketList bucketList = bucketListRepository.findById(token.getBucketListSeq())
                .orElseThrow(() -> new CustomException(ErrorCode.BUCKET_LIST_NOT_FOUND));

        // 해당 버킷리스트에 새로운 멤버 생성
        BucketListMember newMember = BucketListMember.builder()
                .user(participant)
                .bucketList(bucketList)
                .build();

        // 새로운 멤버 추가
        bucketListMemberRepository.save(newMember);
    }
}
