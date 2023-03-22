package com.ssafy.dodo.config;

import com.ssafy.dodo.dto.ErrorResponse;
import com.ssafy.dodo.exception.CustomException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalRestControllerAdvice {

    @ExceptionHandler(value = CustomException.class)
    public ErrorResponse
}
