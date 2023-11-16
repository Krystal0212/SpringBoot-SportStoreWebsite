package com.ESDC.FinalTerm.controllers.Product;

import org.springframework.stereotype.Service;
import com.google.firebase.database.*;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
                        if (myProduct.getStatus().equals("enable")) {
                            products.add(myProduct);
                        }
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
    @Override
    public List<Product> getProductList(String type) {
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





    @Override
    public List<Product> getProductByTypeAndFilter(String type, String productName, Double minPrice, Double maxPrice, String sortOrder, List<String> brandList) {
        List<Product> allProducts = getProductsByType(type);

        // Apply filters
        List<Product> filteredProducts = allProducts.stream()
                .filter(product -> productName == null || product.getName().toLowerCase().contains(productName.toLowerCase()))
                .filter(product -> minPrice == null || product.getIntPrice() >= minPrice)
                .filter(product -> maxPrice == null || product.getIntPrice() <= maxPrice)
                .filter(product -> brandList == null || brandList.contains(product.getBrand()))
                .sorted((p1, p2) -> {
                    if ("asc".equals(sortOrder)) {
                        return Integer.compare(p1.getIntPrice(), p2.getIntPrice());
                    } else if ("desc".equals(sortOrder)) {
                        return Integer.compare(p2.getIntPrice(), p1.getIntPrice());
                    }
                    return 0;
                })
                .collect(Collectors.toList());

        return filteredProducts;
    }

    public List<String> getCurrentBrands(List<Product> products) {
        Set<String> uniqueBrandsSet = new HashSet<>();

        for (Product product : products) {
            uniqueBrandsSet.add(product.getBrand());
        }

        // Convert the set to a list
        List<String> uniqueBrandsList = new ArrayList<>(uniqueBrandsSet);

        return uniqueBrandsList;
    }

    @Override
    public CompletableFuture<List<ProductInCart>> getCustomerCart(String userID) {
        CompletableFuture<List<ProductInCart>> customerCartFuture = new CompletableFuture<>();
        DatabaseReference databaseRef = FirebaseDatabase.getInstance().getReference("CustomerCart");
        databaseRef.child(userID).addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot customerSnapshot) {
                List<ProductInCart> customerCart = new ArrayList<>();
                // duyệt 3 loại product
                for (DataSnapshot productTypeSnapshot : customerSnapshot.getChildren()) {
                    String productType = productTypeSnapshot.getKey();
                    // duyệt product của tung loại
                    for (DataSnapshot productSnapshot : productTypeSnapshot.getChildren()) {
                        ProductInCart product = productSnapshot.getValue(ProductInCart.class);
                        customerCart.add(product);
                    }
                }

                customerCartFuture.complete(customerCart);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                databaseError.toException().printStackTrace();
                customerCartFuture.completeExceptionally(databaseError.toException());
            }
        });

        return customerCartFuture;
    }

    @Override
    public CompletableFuture<Void> deleteItem(String userID, String itemName) {
        CompletableFuture<Void> future = new CompletableFuture<>();

        FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance();
        DatabaseReference userRef = firebaseDatabase.getReference("CustomerCart").child(userID);
        userRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                if (dataSnapshot.exists()) {
                    // Duyệt qua từng loại item
                    for (DataSnapshot itemTypeSnapshot : dataSnapshot.getChildren()) {
                        String itemType = itemTypeSnapshot.getKey();

                        // Duyệt qua từng item trong loại item
                        for (DataSnapshot itemSnapshot : itemTypeSnapshot.getChildren()) {
                            String currentItemName = itemSnapshot.child("name").getValue(String.class);

                            // So sánh itemName và xóa nếu khớp
                            if (currentItemName != null && currentItemName.equals(itemName)) {
                                // Xóa chỉ item đó, không làm ảnh hưởng đến cha (itemTypeSnapshot)
                                itemSnapshot.getRef().setValue(null, new DatabaseReference.CompletionListener() {
                                    @Override
                                    public void onComplete(DatabaseError error, DatabaseReference ref) {
                                        if (error == null) {
                                            // Xóa thành công item
                                            future.complete(null);
                                        } else {
                                            // Xử lý lỗi nếu có
                                            future.completeExceptionally(error.toException());
                                        }
                                    }
                                });
                                return; // Dừng vòng lặp nếu đã xóa item
                            }
                        }
                    }
                }

                // Item không tồn tại hoặc không tìm thấy
                future.complete(null);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // Xử lý lỗi nếu có
                future.completeExceptionally(databaseError.toException());
            }
        });

        return future;
    }
}