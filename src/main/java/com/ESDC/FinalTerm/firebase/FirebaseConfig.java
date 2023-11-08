package com.ESDC.FinalTerm.firebase;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;

@Configuration
public class FirebaseConfig {
    @Bean
    public void initializeFirebaseApp() throws IOException {
        InputStream serviceAccount = this.getClass().getClassLoader().getResourceAsStream("serviceAccountKey.json");

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://your-firebase-database-url.firebaseio.com")
                .build();

        FirebaseApp.initializeApp(options);
    }
}