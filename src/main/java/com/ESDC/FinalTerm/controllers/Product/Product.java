package com.ESDC.FinalTerm.controllers.Product;

public class Product {
    private String brand;
    private String name;
    private String price;
    private String quantity;
    private String description;
    private String url;

    public Product(String brand, String name, String price, String quantity, String url, String description) {
        this.brand = brand;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.url = url;
        this.description = description;
    }

    public Product() {
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
