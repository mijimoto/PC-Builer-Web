package com.example.pc_fe_building;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    @GetMapping("/")
    public String login() {
        return "login"; 
    }
    @GetMapping("/signup")
    public String signup() {
        return "signup"; 
    }
   
    @GetMapping("/build")
    public String build() {
        return "build_page"; 
    }
    @GetMapping("/item")
    public String item(){
        return "item_batch";
    }
    @GetMapping("/forgot_password")
    public String forgotPassword(){
        return "forgot_password";
    }
    @GetMapping("/user_profile")
    public String userProfile(){
        return "user_profile";
    }
    @GetMapping("/user_profile_edit")
    public String userProfileEdit(){
        return "user_profile_edit";
    }
}
