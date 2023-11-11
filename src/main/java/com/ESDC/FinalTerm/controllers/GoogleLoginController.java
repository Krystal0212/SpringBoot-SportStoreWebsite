package com.ESDC.FinalTerm.controllers;

import com.ESDC.FinalTerm.objects.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;

import java.util.concurrent.ExecutionException;

@Controller
public class GoogleLoginController {
    @Autowired
    private UserService userService;
}
