package com.ssafy.dodo.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
public enum ErrorCode {

    // JWT
    REFRESH_NOT_VALID(HttpStatus.UNAUTHORIZED, "리프레시 토큰이 유효하지 않습니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "액세스 토큰 기한이 만료되었습니다."),
    UNSUPPORTED_TOKEN(HttpStatus.UNAUTHORIZED, "지원하지 않는 토큰입니다."),
    WRONG_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 토큰입니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),

    // USER
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."),

    // S3
    FILE_UPLOAD_FAIL(HttpStatus.CONFLICT, "파일 업로드에 실패했습니다."),

    // BucketList
    BUCKET_LIST_NOT_FOUND(HttpStatus.NOT_FOUND, "버킷리스트를 찾을 수 없습니다."),
    NOT_BUCKET_LIST_MEMBER(HttpStatus.FORBIDDEN, "버킷리스트의 멤버가 아닙니다."),
    DEFAULT_BUCKET_LIST(HttpStatus.FORBIDDEN, "기본 버킷리스트는 삭제할 수 없습니다."),
    NOT_BUCKET_LIST_OWNER(HttpStatus.FORBIDDEN, "버킷리스트의 주인이 아닙니다."),

    // Bucket
    BUCKET_NOT_FOUND(HttpStatus.NOT_FOUND, "버킷을 찾을 수 없습니다."),
    NOT_BUCKET_OWNER(HttpStatus.FORBIDDEN, "버킷의 소유자가 아닙니다."),
    DUPLICATED_BUCKET(HttpStatus.CONFLICT, "이미 담은 버킷입니다."),
    
    // Category
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "카테고리를 찾을 수 없습니다."),

    // AddedBucket
    ADDED_BUCKET_NOT_FOUND(HttpStatus.NOT_FOUND, "담은 버킷을 찾을 수 없습니다."),


    // BucketList 참여 및 공유
    EXPIRE_OR_NOT_EXIST_TOKEN(HttpStatus.BAD_REQUEST, "만료되거나 존재하지 않는 토큰입니다."),
    SINGLE_TYPE_CAN_NOT_INVITE(HttpStatus.BAD_REQUEST, "개인 버킷리스트에는 다른 사용자를 초대할 수 없습니다."),


    ;


    private final HttpStatus status;
    private final String message;

}
