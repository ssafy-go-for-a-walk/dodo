package com.ssafy.dodo.dto;

import com.ssafy.dodo.exception.ErrorCode;
import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ErrorResponse extends CommonResponse {

    private String code;
    private String message;

    @Builder
    public ErrorResponse(String code, String message) {
        super(false);
        this.code = code;
        this.message = message;
    }

    public static ErrorResponse of(ErrorCode errorCode) {
        ErrorResponse errorResponse = new ErrorResponse();
        errorResponse.setSuccess(false);
        errorResponse.setCode("errorCode");
        errorResponse.setMessage(errorCode.getMessage());
        return errorResponse;
    }
}
