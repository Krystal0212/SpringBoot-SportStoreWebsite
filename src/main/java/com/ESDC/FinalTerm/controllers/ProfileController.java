package com.ESDC.FinalTerm.controllers;
import com.ESDC.FinalTerm.firebase.FirebaseService;
import com.ESDC.FinalTerm.objects.User;
import com.ESDC.FinalTerm.objects.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ProfileController {
    private final FirebaseService firebaseService;

    public ProfileController(FirebaseService firebaseService) {
        this.firebaseService = firebaseService;
    }

    @GetMapping("/profile")
    public String userProfile(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Fetch user information from Firebase using the FirebaseService
        User user = firebaseService.getUserByUsername(username);

        model.addAttribute("user", user);
        return "profile";
    }
}

