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

    @RequestMapping("/login")
    public String loginPage() {
        return "login"; // Return the name of the login.html template
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register"; // Return the name of the register.html template
    }

    @GetMapping("/staff-main")
    public String staffProduct() {
        return "staffmain"; // Return the name of the product.html template
    }

    @GetMapping("/staff-customer")
    public String staffCustomer() {
        return "staffcustomer"; // Return the name of the product.html template
    }
}
