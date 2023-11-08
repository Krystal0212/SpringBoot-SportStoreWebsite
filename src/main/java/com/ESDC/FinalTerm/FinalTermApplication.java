package com.ESDC.FinalTerm;

import com.ESDC.FinalTerm.controllers.HomeController;
import com.ESDC.FinalTerm.controllers.UserController;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Objects;

@SpringBootApplication(exclude = {SecurityAutoConfiguration.class })
@Service
//@DependsOn("fcminitializer")
public class FinalTermApplication {

	public static void main(String[] args) throws IOException {
		FileInputStream serviceAccount =
				new FileInputStream("src/main/resources/static/json/firebaseAccessKey.json");

		FirebaseOptions options = FirebaseOptions.builder()
				.setCredentials(GoogleCredentials.fromStream(serviceAccount))
				.setDatabaseUrl("https://finalterm-sportstorewebsite-default-rtdb.asia-southeast1.firebasedatabase.app")
				.build();

		List<FirebaseApp> e = FirebaseApp.getApps();
		if(FirebaseApp.getApps().size() == 0) { //<--- check with this line
			FirebaseApp.initializeApp(options);
		}

		SpringApplication.run(FinalTermApplication.class, args);
	}

}