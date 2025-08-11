package com.example.pc_fe_building;

public class Part {
    private String item;
    private String name;
    private boolean added;
    private String partName;
    private Double price;

    public Part(String item, String name) {
        this.item = item;
        this.name = name;
        this.added = false;
        this.partName = "";
        this.price = 0.0;
    }

    // Getters & setters
    public String getItem() { return item; }
    public void setItem(String item) { this.item = item; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public boolean isAdded() { return added; }
    public void setAdded(boolean added) { this.added = added; }

    public String getPartName() { return partName; }
    public void setPartName(String partName) { this.partName = partName; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }
}
