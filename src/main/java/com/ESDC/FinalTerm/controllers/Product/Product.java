package com.ESDC.FinalTerm.controllers.Product;

import lombok.Getter;
import lombok.Setter;

@Getter
public class Product {
    @Setter
    private String brand;
    private String name;
    @Setter
    private String price;
    @Setter
    private String quantity;
    @Setter
    private String description;
    @Setter
    private String url;
    @Setter
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

    public Product(String brand, String name, String price, String quantity, String url) {
        this.brand = brand;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.url = url;
    }

    public Product() {
    }

    public int getIntPrice() {
        return Integer.parseInt(price);
    }

    public int getIntQuantity() {
        return Integer.parseInt(quantity);
    }

    public void setName(String name) {
        this.name = name;
    }

}
