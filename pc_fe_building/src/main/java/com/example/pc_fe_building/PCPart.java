package com.example.pc_fe_building;

public class PCPart {
    private String item;
    private String name;
    private boolean added;
    private String partname;
    private double price;

    public PCPart(String item, String name) {
        this.item = item;
        this.name = name;
        this.added = false;
        this.partname = "";
        this.price = 0.0;
    }

    public String getItem() { return item; }
    public void setItem(String item) { this.item = item; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public boolean isAdded() { return added; }
    public void setAdded(boolean added) { this.added = added; }

    public String getPartname() { return partname; }
    public void setPartname(String partname) { this.partname = partname; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }
}
