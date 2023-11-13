package com.ESDC.FinalTerm.controllers;


import com.ESDC.FinalTerm.controllers.Product.Product;
import com.ESDC.FinalTerm.controllers.Product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.List;


@Controller
public class HomeController {
    @Autowired
    private ProductService productService;
    private List<String> brands;

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
        List<Product> products = productService.getProductsByType("Shoes");
        brands = productService.getCurrentBrands(products);
        model.addAttribute("brands", brands);
        model.addAttribute("products", products);
        return "product-shoes";
    }

    @PostMapping("/shoes/filter")
    public String getProductByTypeAndFilter(@RequestParam(required = false) String productName,
                                            @RequestParam(required = false) Double minPrice,
                                            @RequestParam(required = false) Double maxPrice,
                                            @RequestParam(required = false) String sortByPrice,
                                            @RequestParam(required = false) List<String> brandList,
                                            Model model) {
        List<Product> products = productService.getProductByTypeAndFilter("Shoes",productName, minPrice, maxPrice, sortByPrice, brandList);
        model.addAttribute("products", products);
        model.addAttribute("brands", brands);
        return "product-shoes"; // Giả sử có một view có tên là "productList" để hiển thị danh sách sản phẩm
    }
    @GetMapping("/staff-main")
    public String staffProduct() {
        return "staffmain"; // Return the name of the product.html template
    }

    @GetMapping("/staff-customer")
    public String staffCustomer() {
        return "staffcustomer"; // Return the name of the product.html template
    }

    @GetMapping("/cart")
    public String Cart() {
        return "redirect:/home"; // Return the name of the product.html template
    }
}
