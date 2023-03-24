package com.ssafy.dodo.dto;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class DataResponse<T> extends CommonResponse {

    private T data;

    @Builder
    public DataResponse(T data) {
        super(true);
        this.data = data;
    }
}
