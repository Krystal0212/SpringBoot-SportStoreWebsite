package com.ESDC.FinalTerm;

import com.ESDC.FinalTerm.controllers.HomeController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })

public class FinalTermApplication {

	public static void main(String[] args) {
		SpringApplication.run(FinalTermApplication.class, args);
	}

}