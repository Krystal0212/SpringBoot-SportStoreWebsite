package com.ESDC.FinalTerm.controllers.Product;

import org.springframework.stereotype.Service;
import com.google.firebase.database.*;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import java.util.ArrayList;
import java.util.List;
@Service
public class ProductServiceImpl implements ProductService {

    // Triển khai phương thức getProductsByType để lấy sản phẩm từ Firebase
    @Override
    public List<Product> getProductsByType(String type) {
        CompletableFuture<List<Product>> future = new CompletableFuture<>();

        FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance();
        DatabaseReference productRef = firebaseDatabase.getReference("Product");
        List<Product> products = new ArrayList<>();

        productRef.child(type).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                try {
                    for (DataSnapshot snap : snapshot.getChildren()) {
                        Product myProduct = snap.getValue(Product.class);
                        products.add(myProduct);
                    }
                    future.complete(products);
                } catch (Exception e) {
                    future.completeExceptionally(e);
                }
            }

            @Override
            public void onCancelled(DatabaseError error) {
                future.completeExceptionally(error.toException());
            }
        });

        return future.join();
    }
}
