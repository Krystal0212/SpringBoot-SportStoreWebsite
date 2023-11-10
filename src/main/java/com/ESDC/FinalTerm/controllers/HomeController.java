package com.ESDC.FinalTerm.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping("home")
    public String index(){
        return "/index";
    }

    @RequestMapping("/login")
    public String loginPage() {
        return "login"; // Return the name of the login-old.html template
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register"; // Return the name of the old-register.html template
    }
}
