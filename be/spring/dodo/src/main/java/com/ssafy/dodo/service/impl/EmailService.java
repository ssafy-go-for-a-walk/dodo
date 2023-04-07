package com.ssafy.dodo.service.impl;

import com.ssafy.dodo.entity.User;
import com.ssafy.dodo.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
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
//    @Scheduled(cron = "0 0 18 1/1 * ?") // 매일 18시
    @Scheduled(cron="0 0 9 1/1 * ?") // 매일 9시
    public void sendRemindEmail() {
        // 마지막 로그인으로부터 1분이 지난 사용자에게 리마인드 메일 발송
//        log.info("리마인드 메일 전송 시작");
        List<User> users = userRepository.findAll();

        for(User user : users){

            LocalDateTime lastLogin = user.getLastLoginAt();

            Duration duration = Duration.between(lastLogin, LocalDateTime.now());

            if(duration.getSeconds() > 3600){ // 1달 : 2592000, 1분 : 3600 10초 : 600

                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                try {
                    MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

                    helper.setTo(user.getEmail());
                    helper.setSubject("[Do?Do!] 잠들어 있는 버킷리스트를 깨워주세요!");
                    helper.setText("<img src=\"https://dodo-walk-bucket.s3.ap-northeast-2.amazonaws.com/%EC%B4%88%EB%8C%80%EC%9E%A5.png\" width=\"500px\" height=\"500px\">" +
                            "<br>" +
                            "<h1><a href=\"https://j8b104.p.ssafy.io\">Do?Do! 이동하기</a></h1>", true);

                    javaMailSender.send(mimeMessage);
                } catch (MessagingException e) {
                    throw new RuntimeException(e);
                }
            }
        }
//        log.info("리마인드 메일 전송 종료");
    }
}
