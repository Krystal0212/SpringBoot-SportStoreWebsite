package com.ESDC.FinalTerm.controllers;


import com.ESDC.FinalTerm.controllers.Product.Product;
import com.ESDC.FinalTerm.controllers.Product.ProductService;
import com.ESDC.FinalTerm.controllers.User.User;
import com.ESDC.FinalTerm.controllers.User.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;


@Controller
public class HomeController {
    @Autowired
    private ProductService productService;
    @Autowired
    private UserService userService;
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
    public String shoesFilter(@RequestParam(required = false) String productName,
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

    @GetMapping("/clothes")
    public String clothes(Model model){
        // Lấy danh sách sản phẩm Shoes
        List<Product> products = productService.getProductsByType("Clothes");
        brands = productService.getCurrentBrands(products);
        model.addAttribute("brands", brands);
        model.addAttribute("products", products);
        return "product-clothes";
    }

    @PostMapping("/clothes/filter")
    public String clothesFilter(@RequestParam(required = false) String productName,
                                            @RequestParam(required = false) Double minPrice,
                                            @RequestParam(required = false) Double maxPrice,
                                            @RequestParam(required = false) String sortByPrice,
                                            @RequestParam(required = false) List<String> brandList,
                                            Model model) {
        List<Product> products = productService.getProductByTypeAndFilter("Clothes",productName, minPrice, maxPrice, sortByPrice, brandList);
        model.addAttribute("products", products);
        model.addAttribute("brands", brands);
        return "product-clothes"; // Giả sử có một view có tên là "productList" để hiển thị danh sách sản phẩm
    }

    @GetMapping("/accessories")
    public String accessories(Model model){
        // Lấy danh sách sản phẩm Shoes
        List<Product> products = productService.getProductsByType("Accessory");
        brands = productService.getCurrentBrands(products);
        model.addAttribute("brands", brands);
        model.addAttribute("products", products);
        return "product-accessories";
    }

    @PostMapping("/accessories/filter")
    public String accessoriesFilter(@RequestParam(required = false) String productName,
                                @RequestParam(required = false) Double minPrice,
                                @RequestParam(required = false) Double maxPrice,
                                @RequestParam(required = false) String sortByPrice,
                                @RequestParam(required = false) List<String> brandList,
                                Model model) {
        List<Product> products = productService.getProductByTypeAndFilter("Accessory",productName, minPrice, maxPrice, sortByPrice, brandList);
        model.addAttribute("products", products);
        model.addAttribute("brands", brands);
        return "product-accessories"; // Giả sử có một view có tên là "productList" để hiển thị danh sách sản phẩm
    }
    @GetMapping("/staff-main")
    public String staffProduct(Model model) {
        // Xử lý giá trị của tham số (paramName) nếu nó được truyền vào
        List<Product> suck = Stream.of(
                        productService.getProductList("Shoes"),
                        productService.getProductList("Clothes"),
                        productService.getProductList("Accessory"))
                .flatMap(List::stream)
                .collect(Collectors.toList());
      model.addAttribute("product", suck);
        return "staffmain"; // Trả về tên của template product.html
    }
}
