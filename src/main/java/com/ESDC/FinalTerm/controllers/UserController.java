package com.ESDC.FinalTerm.controllers;


import com.ESDC.FinalTerm.objects.User;
import com.google.gson.Gson;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;


import java.util.concurrent.ExecutionException;

@Controller
@ControllerAdvice
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


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    @ModelAttribute
    public ModelAndView login(@RequestParam String username, @RequestParam String password, Model model) throws InterruptedException, ExecutionException {
        User userGet = userService.loginCustomer(username, password);
        ModelAndView modelAndView = new ModelAndView("index");

        // Add the user object to the ModelAndView
        modelAndView.addObject("user", userGet);
        modelAndView.addObject("userName", userGet.getName());

        // Return the ModelAndView object
        return modelAndView;
//        model.addAttribute("user", userGet);
//        model.addAttribute("userID", userGet.getUserID());
//        model.addAttribute("userFullName", userGet.getName());

//        if (userGet != null) {
//            user = userGet;
//        } else {
//            user = null;
//        }
//
//        if (userGet != null && userGet.getUserID() != null) {
//            return new RedirectView("/home");
//        }
//
//        return new RedirectView("/login");

//        if (userGet != null) {
//            if (userGet.getUserID() != null) {
//                return file[1];
//            }
//        }
//
//
//        return file[0];
    }
}
