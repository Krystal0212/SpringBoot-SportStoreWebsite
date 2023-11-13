package com.ESDC.FinalTerm.controllers.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }
    @GetMapping("/products/{type}")
    public String getProductsByType(@PathVariable String type, Model model) {
        List<Product> products = productService.getProductsByType(type);
        model.addAttribute("products", products);
        return "productList"; // Giả sử có một view có tên là "productList" để hiển thị danh sách sản phẩm
    }
}
