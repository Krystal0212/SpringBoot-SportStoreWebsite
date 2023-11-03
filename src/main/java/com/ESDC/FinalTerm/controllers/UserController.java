package com.ESDC.FinalTerm.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // Return the name of the login.html template
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register"; // Return the name of the register.html template
    }
}
