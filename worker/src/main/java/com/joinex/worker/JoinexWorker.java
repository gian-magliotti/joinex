package com.joinex.worker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class JoinexWorker {

	public static void main(String[] args) {
		SpringApplication.run(JoinexWorker.class, args);
	}

}
