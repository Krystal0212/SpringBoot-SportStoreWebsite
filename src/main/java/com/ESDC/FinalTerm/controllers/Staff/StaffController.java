package com.ESDC.FinalTerm.controllers.Staff;

import com.ESDC.FinalTerm.controllers.Product.Product;
import com.ESDC.FinalTerm.controllers.Product.ProductService;
import com.ESDC.FinalTerm.controllers.User.User;
import com.ESDC.FinalTerm.controllers.User.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Controller
@ControllerAdvice
@RequestMapping("/staff")
public class StaffController {
    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private StaffService staffService;

    @Autowired
    private ProductService productService;
    @RequestMapping("/login")
    public String loginPage() {
        return "staff-login";}

    @GetMapping("/staff-customer")
    public String staffCustomer(Model model) {
        List<User> suck = userService.getUserList();
        model.addAttribute("customers", suck);
        return "staffcustomer"; // Return the name of the product.html template
    }


    @GetMapping("/index")
    public String staffCheck() {
        return "check-staff";
    }

    @GetMapping("")
    public String staffCheck1() {
        return "check-staff";
    }

    @RequestMapping("/staffSection")
    public String loginCheck(@ModelAttribute Staff staff, Model model) {
        try {
            Staff loggedInStaff = staffService.loginStaffByTyping(staff.getUsername(), staff.getPassword());

            if(userService.isUserLoggedIn()){
                    model.addAttribute("error", "You are not allowed to log in");
                    return "staff-login";
            }

            if (loggedInStaff != null) {
                //đưa user đó vào localStorage
                String myStaff = objectMapper.writeValueAsString(loggedInStaff);

                model.addAttribute("myStaff", myStaff);
                model.addAttribute("staff", loggedInStaff);

                if(loggedInStaff.getRole().equals("admin")){
                    return "staff-page-admin";
                }
                else if(loggedInStaff.getRole().equals("salesmanager")){
                    List<User> suck = userService.getUserList();
                    model.addAttribute("customers", suck);
                    return "staff-page-sales-manager";
                }
                else if(loggedInStaff.getRole().equals("productmanager")){
                    List<Product> suck = Stream.of(
                                    productService.getProductList("Shoes"),
                                    productService.getProductList("Clothes"),
                                    productService.getProductList("Accessory"))
                            .flatMap(List::stream)
                            .collect(Collectors.toList());
                    model.addAttribute("product", suck);
                    return "staff-page-product-manager";
                }
                else {
                    return "staff-page-employee";
                }
            } else {
                model.addAttribute("error", "Invalid username or password");
                return "staff-login";
            }
        } catch (ExecutionException | InterruptedException e) {
            model.addAttribute("error", "Error during login");
            return "staff-login";
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/backup/{listName}")
    public ResponseEntity<String> backupData(@PathVariable String listName) {
        try {
            List<?> backupData = null;
            // Call a method in FirebaseService to get data from the specified list
            if(listName.equals("user")) {
                backupData = userService.getUserList();
            } else if (listName.equals("staff")) {
                backupData = staffService.getStaffList();
            }else if (listName.equals("product")) {
                backupData = productService.getProductList();
            }

            ObjectMapper objectMapper = new ObjectMapper();
            String jsonData = objectMapper.writeValueAsString(backupData);

            // You can modify the response based on your requirements
            return ResponseEntity.ok(jsonData);
        } catch (Exception e) {
            // Handle exceptions and return an appropriate response
            return ResponseEntity.status(500).body("Error during data backup");
        }
    }
}
