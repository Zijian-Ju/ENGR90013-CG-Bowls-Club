package com.cg.backend.common.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.ThreadPoolExecutor;

@Configuration
@EnableAsync
public class SyncConfig {

    @Bean(name = "emailPoolTaskExecutor")
    public ThreadPoolTaskExecutor SendEmailPoolTaskExecutor(){
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        // Set core thread number
        taskExecutor.setCorePoolSize(10);
        //
        taskExecutor.setMaxPoolSize(100);

        taskExecutor.setQueueCapacity(50);

        taskExecutor.setKeepAliveSeconds(200);

        taskExecutor.setThreadNamePrefix("Email-");
        // 重复调用excutor直到成功
        taskExecutor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());

        taskExecutor.initialize();

        return taskExecutor;

    }
}
