package com.example.pc_fe_building;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class BuildService {

    private final List<Part> allItems = new ArrayList<>();

    public BuildService() {
        allItems.add(new Part("Operating System", "os"));
        allItems.add(new Part("Wireless Network Card", "wirelessnetworkcard"));
        allItems.add(new Part("Wired Network Card", "wirednetworkcard"));
        allItems.add(new Part("Webcam", "webcam"));
        allItems.add(new Part("Video Card", "videocard"));
        allItems.add(new Part("UPS", "ups"));
        allItems.add(new Part("Thermalpaste", "thermalpaste"));
        allItems.add(new Part("Speakers", "speakers"));
        allItems.add(new Part("Soundcard", "soundcard"));
        allItems.add(new Part("Power Supply", "powersupply"));
        allItems.add(new Part("Optical Drive", "opticaldrive"));
        allItems.add(new Part("Mouse", "mouse"));
        allItems.add(new Part("Motherboard", "motherboard"));
        allItems.add(new Part("Monitor", "monitor"));
        allItems.add(new Part("Memory", "memory"));
        allItems.add(new Part("Keyboard", "keyboard"));
        allItems.add(new Part("Internal Hard Drive", "internalharddrive"));
        allItems.add(new Part("Headphones", "headphones"));
        allItems.add(new Part("Fan Controller", "fancontroller"));
        allItems.add(new Part("External Hard Drive", "externalharddrive"));
        allItems.add(new Part("Cpu Cooler", "cpucooler"));
        allItems.add(new Part("Cpu", "cpu"));
        allItems.add(new Part("Cases", "cases"));
        allItems.add(new Part("Case Fan", "casefan"));
        allItems.add(new Part("Case Accessory", "caseaccessory"));
    }

    public List<Part> getAllItems() {
        return allItems;
    }

    public void addPart(int index, String partName, double price) {
        Part part = allItems.get(index);
        part.setPartName(partName);
        part.setPrice(price);
        part.setAdded(true);
    }

    public void removePart(int index) {
        Part part = allItems.get(index);
        part.setAdded(false);
        part.setPartName("");
        part.setPrice(0.0);
    }
}
