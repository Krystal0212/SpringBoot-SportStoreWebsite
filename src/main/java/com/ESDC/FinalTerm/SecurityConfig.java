//package com.ESDC.FinalTerm;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public AuthenticationSuccessHandler myAuthenticationSuccessHandler() {
//        return new MySimpleUrlAuthenticationSuccessHandler();
//    }
//
//    @Configuration
//    public static class MySimpleUrlAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
//        @Override
//        protected String determineTargetUrl(Authentication authentication, String defaultTargetUrl) {
//            // You can customize the logic here to determine the target URL based on the user's role or any other criteria.
//            return "/user/home";
//        }
//    }
//
//    @Configuration
//    public static class MySecurityConfigurerAdapter extends WebSecurityConfigurerAdapter {
//
//        @Autowired
//        private AuthenticationSuccessHandler myAuthenticationSuccessHandler;
//
//        @Override
//        protected void configure(HttpSecurity http) throws Exception {
//            http
//                    .authorizeRequests()
//                    .antMatchers("/user/**").authenticated()
//                    .antMatchers("/**").permitAll()
//                    .and()
//                    .formLogin()
//                    .loginPage("/user/login")
//                    .successHandler(myAuthenticationSuccessHandler)
//                    .and()
//                    .logout()
//                    .logoutUrl("/user/logout")
//                    .logoutSuccessUrl("/")
//                    .permitAll();
//        }
//    }
//}
//
