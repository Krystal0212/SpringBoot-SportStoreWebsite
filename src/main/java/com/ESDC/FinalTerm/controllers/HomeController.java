package com.ESDC.FinalTerm.controllers;


import com.ESDC.FinalTerm.controllers.Product.Product;
import com.ESDC.FinalTerm.controllers.Product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;


@Controller
public class HomeController {
    @Autowired
    private ProductService productService;
    @RequestMapping("/home")
    public String index(){
        return "index";
    }

    @RequestMapping("/login")
    public String loginPage() {
        return "login"; // Return the name of the login-old.html template
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register"; // Return the name of the old-register.html template
    }

    @GetMapping("/shoes")
    public String shoes(Model model){
        // Lấy danh sách sản phẩm Shoes
        List<Product> shoes = productService.getProductsByType("Shoes");
        model.addAttribute("shoes", shoes);
        return "Shoes";
    }
}
