package com.ssafy.dodo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class DodoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DodoApplication.class, args);
    }

}
