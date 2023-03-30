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
    WRONG_TYPE_TOKEN(HttpStatus.UNAUTHORIZED, "토큰의 타입이 잘못되었습니다."),
    UNSUPPORTED_TOKEN(HttpStatus.UNAUTHORIZED, "지원하지 않는 토큰입니다."),
    WRONG_TOKEN(HttpStatus.UNAUTHORIZED, "잘못된 토큰입니다."),

    // USER
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."),

    // S3
    FILE_UPLOAD_FAIL(HttpStatus.CONFLICT, "파일 업로드에 실패했습니다."),

    // BucketList
    BUCKET_LIST_NOT_FOUND(HttpStatus.NOT_FOUND, "버킷리스트를 찾을 수 없습니다."),
    NOT_BUCKET_LIST_MEMBER(HttpStatus.FORBIDDEN, "버킷리스트의 멤버가 아닙니다."),
    LAST_BUCKET_LIST(HttpStatus.FORBIDDEN, "마지막 버킷리스트는 삭제할 수 없습니다."),

    // Bucket
    BUCKET_NOT_FOUND(HttpStatus.NOT_FOUND, "버킷을 찾을 수 없습니다."),
    NOT_BUCKET_OWNER(HttpStatus.FORBIDDEN, "버킷의 소유자가 아닙니다."),
    DUPLICATED_BUCKET(HttpStatus.CONFLICT, "이미 담은 버킷입니다."),
    
    // Category
    CATEGORY_NOT_FOUND(HttpStatus.NOT_FOUND, "카테고리를 찾을 수 없습니다."),

    // AddedBucket
    ADDED_BUCKET_NOT_FOUND(HttpStatus.NOT_FOUND, "담은 버킷을 찾을 수 없습니다."),


    // BucketList 참여
    EXPIRE_OR_NOT_EXIST_TOKEN(HttpStatus.BAD_REQUEST, "만료되거나 존재하지 않는 토큰입니다."),


    ;


    private final HttpStatus status;
    private final String message;

}
