package com.ESDC.FinalTerm.controllers.Product;
import com.ESDC.FinalTerm.controllers.Product.Product;

import java.util.List;
import java.util.concurrent.CompletableFuture;


public interface ProductService {
    List<Product> getProductsByType(String type);

    List<Product> getProductList(String type);

    public List<Product> getProductByTypeAndFilter(String type, String productName, Double minPrice, Double maxPrice, String sortOrder, List<String> brandList);

    public List<String> getCurrentBrands(List<Product> products);

    CompletableFuture<List<ProductInCart>> getCustomerCart(String userID);

    CompletableFuture<Void> deleteItem(String userID, String itemName);
}
