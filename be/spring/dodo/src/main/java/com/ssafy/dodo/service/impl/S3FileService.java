package com.ssafy.dodo.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.ssafy.dodo.exception.CustomException;
import com.ssafy.dodo.exception.ErrorCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.UUID;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class S3FileService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    private final AmazonS3 amazonS3;

    public String uploadFile(MultipartFile file) {
        try{
            String originalName = file.getOriginalFilename();
            String extension = originalName.substring(originalName.lastIndexOf("."));
            String savedName = UUID.randomUUID() + "-" + originalName;

            ObjectMetadata objMeta = new ObjectMetadata();
            objMeta.setContentLength(file.getSize());
            objMeta.setContentType(file.getContentType());

            amazonS3.putObject(bucket, savedName, file.getInputStream(), objMeta);

            return amazonS3.getUrl(bucket, savedName).toString();

        }catch (Exception e){
            throw new CustomException(ErrorCode.FILE_UPLOAD_FAIL);
        }
    }

}
