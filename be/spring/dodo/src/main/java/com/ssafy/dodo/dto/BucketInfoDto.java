package com.ssafy.dodo.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateDeserializer;
import lombok.Getter;

import java.time.LocalDate;

@Getter
public class BucketInfoDto {
    private String emoji;

    @JsonDeserialize(using = LocalDateDeserializer.class)
    private LocalDate dDay;
    private String location;
    private String desc;
}
