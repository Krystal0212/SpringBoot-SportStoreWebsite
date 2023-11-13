package com.ESDC.FinalTerm.controllers.Product;

import lombok.Getter;
import lombok.Setter;

public class ProductInCart {

    String brand;
    String name;
    String price;
    String quantity;
    String url;
    String deleteIcon;

    public ProductInCart(String brand, String name, String price, String quantity, String url) {
        this.brand = brand;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.url = url;
    }

    public ProductInCart(){

    }

    public String getDeleteIcon() {
        return deleteIcon;
    }

    public void setDeleteIcon(String deleteIcon) {
        this.deleteIcon = deleteIcon;
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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

}
