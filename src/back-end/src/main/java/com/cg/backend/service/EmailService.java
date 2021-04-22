package com.cg.backend.service;


import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service("emailService")
@Slf4j
public class EmailService {

    @Async("emailPoolTaskExecutor")
    public void SendEmail(long id) {
        try{
            Thread.sleep(3000);
            log.info("User " + id + " send success");
        } catch (InterruptedException e) {
            System.out.println(e);
        }
    }
}
