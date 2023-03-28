package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;

@EnableScheduling
@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class EmailService {

    private final UserRepository userRepository;
    private final JavaMailSender javaMailSender;

    @Async
    @Scheduled(cron="0 0 9 1/1 * ?")
    public void sendRemindEmail() {
        log.info("리마인드 메일 전송 시작");
        List<User> users = userRepository.findAll();

        for(User user : users){

            LocalDateTime lastLogin = user.getLastLoginAt();

            Duration duration = Duration.between(lastLogin, LocalDateTime.now());

            log.info("마지막 로그인으로부터 지난 시간 : {}초", duration.getSeconds());

            if(duration.getSeconds() > 2592000){ // 1달 : 2592000, 1분 : 3600

                SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

                log.info("리마인드 대상 : {}", user.getEmail());

                simpleMailMessage.setTo(user.getEmail());
                simpleMailMessage.setSubject("[Do?Do!] 잠들어 있는 버킷리스트를 깨워주세요!");
                simpleMailMessage.setText("https://j8b104.p.ssafy.io로 접속해서 버킷리스트를 확인해보세요!");
                javaMailSender.send(simpleMailMessage);
            }
        }
        log.info("리마인드 메일 전송 종료");

    }
}
