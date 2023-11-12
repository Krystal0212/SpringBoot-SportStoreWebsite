package com.ESDC.FinalTerm.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@ControllerAdvice
@RequestMapping("/product")
public class ProductController {

    @GetMapping("/shoes")
    public String index(){
        return "/product-shoes";
    }
}
