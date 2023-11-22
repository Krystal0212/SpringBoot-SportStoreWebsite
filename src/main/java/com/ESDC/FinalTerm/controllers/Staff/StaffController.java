package com.ESDC.FinalTerm.controllers.Staff;

import com.ESDC.FinalTerm.controllers.User.User;
import com.ESDC.FinalTerm.controllers.User.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.concurrent.ExecutionException;

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
}
