package com.example.pc_fe_building;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {
    private List<PCPart> allItems = new ArrayList<>();

    public WebController() {
        allItems.add(new PCPart("Operating System", "os"));
        allItems.add(new PCPart("Wireless Network Card", "wirelessnetworkcard"));
        allItems.add(new PCPart("Wired Network Card", "wirednetworkcard"));
        allItems.add(new PCPart("Webcam", "webcam"));
        allItems.add(new PCPart("Video Card", "videocard"));
        allItems.add(new PCPart("UPS", "ups"));
        allItems.add(new PCPart("Thermalpaste", "thermalpaste"));
        allItems.add(new PCPart("Speakers", "speakers"));
        allItems.add(new PCPart("Soundcard", "soundcard"));
        allItems.add(new PCPart("Power Supply", "powersupply"));
        allItems.add(new PCPart("Optical Drive", "opticaldrive"));
        allItems.add(new PCPart("Mouse", "mouse"));
        allItems.add(new PCPart("Motherboard", "motherboard"));
        allItems.add(new PCPart("Monitor", "monitor"));
        allItems.add(new PCPart("Memory", "memory"));
        allItems.add(new PCPart("Keyboard", "keyboard"));
        allItems.add(new PCPart("Internal Hard Drive", "internalharddrive"));
        allItems.add(new PCPart("Headphones", "headphones"));
        allItems.add(new PCPart("Fan Controller", "fancontroller"));
        allItems.add(new PCPart("External Hard Drive", "externalharddrive"));
        allItems.add(new PCPart("Cpu Cooler", "cpucooler"));
        allItems.add(new PCPart("Cpu", "cpu"));
        allItems.add(new PCPart("Cases", "cases"));
        allItems.add(new PCPart("Case Fan", "casefan"));
        allItems.add(new PCPart("Case Accessory", "caseaccessory"));
    }

    @GetMapping("/login")
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
        @GetMapping("/reset_password")
    public String resetPassword(){
        return "reset_password";
    }
     @GetMapping("/index")
    public String homePage(){
        return "index";
    }
}
