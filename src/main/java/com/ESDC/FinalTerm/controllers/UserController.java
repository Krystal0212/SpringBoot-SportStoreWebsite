package com.ESDC.FinalTerm.controllers;


import com.ESDC.FinalTerm.objects.User;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;


import java.util.concurrent.ExecutionException;

@Controller
@ControllerAdvice
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String showLoginForm(Model model) {
        model.addAttribute("user", new User());
        return "login";
    }

    @PostMapping("/login")
    public String loginUser(@ModelAttribute User user, Model model) {
        try {
            User loggedInUser = userService.loginCustomerByTyping(user.getUsername(), user.getPassword());

            if (loggedInUser != null) {
                model.addAttribute("user", loggedInUser);
                return "index";
            } else {
                model.addAttribute("error", "Invalid username or password");
                return "login";
            }
        } catch (ExecutionException | InterruptedException e) {
            model.addAttribute("error", "Error during login");
            return "login";
        }
    }

    @GetMapping("/logout")
    public String logoutUser() {
        userService.logoutUser();
        return "redirect:/";
    }

    @GetMapping("/dashboard")
    public String showDashboard(Model model) {
        // Retrieve user information from the service
        User user = userService.getCurrentUser();
        model.addAttribute("user", user);
        return "dashboard";
    }

    @GetMapping("/home")
    public String showHome() {
        if (userService.isUserLoggedIn()) {
            return "index";
        } else {
            return "home";
        }
    }

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "register";
    }

    @PostMapping("/register")
    public String registerUser(@ModelAttribute User user, Model model) {
        try {
            User registeredUser = userService.registerUser(user);
            model.addAttribute("user", registeredUser);
            return "redirect:/user/login";
        } catch (ExecutionException | InterruptedException e) {
            model.addAttribute("error", "Error during registration");
            return "register";
        } catch (RuntimeException e) {
            model.addAttribute("error", e.getMessage());
            return "register";
        }
    }

//    @GetMapping("/google-login")
//    public String googleLogin(@RequestParam("userName") String userName,
//                              @RequestParam("email") String email,
//                              @RequestParam("isGoogleUser") boolean isGoogleUser,
//                              Model model) {
//
//        // Create a User object with the received data
//        User user = new User();
//        user.setUsername(userName);
//        user.setEmail(email);
//        user.setGoogleUser(isGoogleUser);
//
//        try {
//            // Login or save the user to the Firebase Realtime Database as needed
//            if (isGoogleUser) {
//                user = userService.findAndSaveGoogleUser(user);
//            } else {
//                // Handle regular login logic
//                // Example: user = userService.loginUser(user.getUsername(), user.getPassword());
//            }
//
//            // Add the user to the model for use in the view
//            model.addAttribute("user", user);
//
//            // Redirect to the dashboard or home page
//            return "redirect:/user/dashboard";
//        } catch (Exception e) {
//            model.addAttribute("error", "Error during login");
//            return "login";
//        }
//    }

        @PostMapping("/google-login")
        public ResponseEntity<String> loginGoogleUser(@RequestParam("userName") String userName, @RequestParam("email") String email, @RequestParam("isGoogleUser") boolean isGoogleUser, Model model) {
            try {
                User user = new User();
                user.setUsername(userName);
                user.setEmail(email);
                user.setGoogleUser(isGoogleUser);

                User loggedInUser = userService.findAndSaveGoogleUser(user);

                if (loggedInUser != null) {
                    model.addAttribute("user", user);

                    // Return a success response
                    return ResponseEntity.ok("Google login successful");
                } else {
                    model.addAttribute("error", "Google login failed");
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Invalid account");
                }
            } catch (ExecutionException | InterruptedException e) {
                model.addAttribute("error", "Error during Google login");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error during Google login");
            }
        }

//    private UserService userService;
//    Boolean isChecked = false;
//    private User user;
//
//    public UserController(UserService userService) {
//        this.userService = userService;
//    }
//
//    @GetMapping("/login")
//    public String loginPage() {
//        return "login";
//    }
//
//    @RequestMapping(value = "/login", method = RequestMethod.POST)
//    @ModelAttribute
//    public ModelAndView login(@RequestParam String username, @RequestParam String password, Model model) throws InterruptedException, ExecutionException {
//        User userGet = userService.loginCustomerByTyping(username, password);
//        ModelAndView modelAndView = new ModelAndView();
//
//        if (userGet != null) {
//        // modelAndView = new ModelAndView(new RedirectView("/home", true));
//            modelAndView = new ModelAndView("/index" );
//
//            // Add the user object to the ModelAndView
//            modelAndView.addObject("user", userGet);
//            modelAndView.addObject("userName", userGet.getName());
//        } else {
//            modelAndView = new ModelAndView("redirect:/login?error=true");
//        }
//
//        // Return the ModelAndView object
//        return modelAndView;
////        if (userGet != null) {
////            // Add the user object to the model
////            model.addAttribute("user", userGet);
////            model.addAttribute("userName", userGet.getName());
////
////            // Redirect to "/home"
////            return "redirect:/home";
////        } else {
////            // Handle unsuccessful login
////            model.addAttribute("error", "true");
////
////            // Redirect to "/login"
////            return "redirect:/login";
////        }
//    }
//
//    @PostMapping(value = "/google-login")
//    @ModelAttribute
//    public String googleLogin(@RequestParam("userName") String userName, @RequestParam("email") String email, @RequestParam("isGoogleUser") boolean isGoogleUser, HttpServletRequest request) throws ExecutionException, InterruptedException {
//        try {
//            // Create a new User object
////            User user = new User();
////            user.setUsername(userName);
////            user.setEmail(email);
////            user.setGoogleUser(isGoogleUser);
////
////            // Save the user object to the database
////            User userGet = userService.findAndSaveGoogleUser(user);
////
////            ModelAndView modelAndView = new ModelAndView("index");
////
////            // Add the user object to the ModelAndView
////            modelAndView.addObject("user", userGet);
////
////            //viet cai if de tra ve userName neu name ko ton tai
////            modelAndView.addObject("userName", userGet.getUsername());
////
////            // Return the ModelAndView object
////            return modelAndView;
//            User user = new User();
//            user.setUsername(userName);
//            user.setEmail(email);
//            user.setGoogleUser(isGoogleUser);
//
//            // Save the user object to the database
//            User userGet = userService.findAndSaveGoogleUser(user);
//
//            // Add the user object to the session
//            request.getSession().setAttribute("user", userGet);
//
//            // Add the user name only if it exists
//            if (userGet.getUsername() != null) {
//                request.getSession().setAttribute("userName", userGet.getUsername());
//            }
//
//            // Redirect to "/home"
//            return "redirect:/home";
//        } catch (Exception e) {
//            // Log the exception
//            e.printStackTrace();
//
//            // Handle the exception, you might want to redirect to an error page or handle it in a way that makes sense for your application
//            //return new ModelAndView("error");
//            return "redirect:/login";
//        }
//    }
//
//    @PostMapping("/logout")
//    public ModelAndView logout(Model model, HttpSession session) {
//
//        userService.logoutUser();
//        session.invalidate();
//
//        ModelAndView modelAndView = new ModelAndView("redirect:/login");
//
//        return modelAndView;
//    }
}
