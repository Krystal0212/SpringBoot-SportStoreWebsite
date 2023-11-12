package com.ESDC.FinalTerm.controllers.Product;

import lombok.Getter;
import lombok.Setter;

public class Product {
    @Getter @Setter
    private String brand;
    @Getter @Setter
    private String name;
    @Setter
    private String price;
    @Setter
    private String quantity;
    @Getter @Setter
    private String description;
    @Getter @Setter
    private String url;
    @Getter @Setter
    private String status;

    public Product(String brand, String name, String price, String quantity, String status, String url, String description) {
        this.brand = brand;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.url = url;
        this.description = description;
        this.status = status;
    }

    public Product() {
    }

    public String getPrice() {
        return price;
    }

    public String getQuantity() {
        return quantity;
    }

    public int getIntPrice() {
        return Integer.parseInt(price);
    }

    public int getIntQuantity() {
        return Integer.parseInt(quantity);
    }

}
