package com.ESDC.FinalTerm.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
    @RequestMapping("home")
    public String index(){
        return "index";
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register"; // Return the name of the register.html template
    }
}
