package com.ESDC.FinalTerm.controllers.Product;
import com.ESDC.FinalTerm.controllers.Product.Product;

import java.util.List;


public interface ProductService {
    List<Product> getProductsByType(String type);
}
