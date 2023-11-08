package com.ESDC.FinalTerm.controllers;

import com.ESDC.FinalTerm.objects.User;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;


import java.util.concurrent.ExecutionException;

@Controller
public class UserController {
    private UserService userService;
    Boolean isChecked = false;
    private User user;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/login")
    public String loginPage() {
        return "login";
    }


    @PostMapping("/login")
    public String checkLogin(@RequestParam String username, @RequestParam String password, Model model) throws InterruptedException, ExecutionException {

        final String[] file = {"login", "index"};
        User userGet = userService.loginCustomer(username, password);
        model.addAttribute("user", userGet);
        user = userGet;

        if (userGet != null) {
            if (userGet.getUserID() != null) {
                return file[1];
            }
        }


        return file[0];
    }
}
