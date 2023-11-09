package com.ESDC.FinalTerm.controllers;


import com.ESDC.FinalTerm.objects.User;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpSession;
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
        User userGet = userService.loginCustomerByTyping(username, password);
        ModelAndView modelAndView = new ModelAndView("index");

        // Add the user object to the ModelAndView
        modelAndView.addObject("user", userGet);
        modelAndView.addObject("userName", userGet.getName());

        // Return the ModelAndView object
        return modelAndView;
    }

    @RequestMapping(value = "/google-login", method = RequestMethod.POST)
    @ModelAttribute
    public ModelAndView googleLogin(@RequestParam("userName") String userName, @RequestParam("email") String email, @RequestParam("isGoogleUser") boolean isGoogleUser) throws ExecutionException, InterruptedException {
        // Create a new User object
        User user = new User();
        user.setUsername(userName);
        user.setEmail(email);
        user.setGoogleUser(isGoogleUser);

        // Save the user object to the database
        User userGet = userService.findAndSaveGoogleUser(user);

        ModelAndView modelAndView = new ModelAndView("index");

        // Add the user object to the ModelAndView
        modelAndView.addObject("user", userGet);

        //viet cai if de tra ve userName neu name ko ton tai
        modelAndView.addObject("userName", userGet.getUsername());

        // Return the ModelAndView object
        return modelAndView;
    }

    @PostMapping("/logout")
    public ModelAndView logout(Model model, HttpSession session) {

        userService.logoutUser();
        session.invalidate();

        ModelAndView modelAndView = new ModelAndView("redirect:/login");

        return modelAndView;
    }
}
