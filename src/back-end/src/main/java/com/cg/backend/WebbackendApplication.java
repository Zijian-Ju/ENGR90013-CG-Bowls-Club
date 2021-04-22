package com.cg.backend;

import tk.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.cg.backend.dao")
public class WebbackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(WebbackendApplication.class, args);
    }

}
