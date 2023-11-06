//package com.ESDC.FinalTerm.controllers;
//
//import com.ESDC.FinalTerm.objects.User;
//import jakarta.servlet.http.HttpSession;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Controller;
//import org.springframework.ui.Model;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.SessionAttribute;
//
//@Controller
//public class UserController {
//    @Autowired
//    private UserRepository userRepository;
//
//    @PostMapping("/login")
//    public String loginUser(@RequestParam String username, @RequestParam String password, HttpSession session, Model model) {
//        User user = userRepository.findByUserName(username);
//
//        if (user != null && user.getUserPassword().equals(password)) {
//            // Authentication successful, store user data in the session.
//            session.setAttribute("user", user);
//            model.addAttribute("username", user.getUserName());
//            return "redirect:/protected/index"; // Redirect to the protected index page.
//        } else {
//            return "redirect:/login?error=true"; // Redirect back to the login page with an error flag.
//        }
//    }
//
//    @GetMapping("/protected/index")
//    public String protectedIndexPage(@SessionAttribute User user, Model model) {
//        model.addAttribute("username", user.getUserName());
//        return "index"; // Display the protected index page.
//    }
//}
