package com.ESDC.FinalTerm.controllers;

import com.google.firebase.database.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class FirebaseController {

    @Autowired
    private DatabaseReference firebaseDatabase;

    @GetMapping("/user-list")
    public Map<String, Object> getUserList() {
        return fetchDataFromFirebase("userlist");
    }

    @GetMapping("/product-list")
    public Map<String, Object> getProductList() {
        return fetchDataFromFirebase("productlist");
    }

    @GetMapping("/order-list")
    public Map<String, Object> getOrderList() {
        return fetchDataFromFirebase("orderlist");
    }

    @GetMapping("/giftcode-list")
    public Map<String, Object> getGiftCodeList() {
        return fetchDataFromFirebase("giftcodelist");
    }

    @GetMapping("/staff-list")
    public Map<String, Object> getStaffList() {
        return fetchDataFromFirebase("stafflist");
    }

    @GetMapping("/customer-cart-list")
    public Map<String, Object> getCustomerCartList() {
        return fetchDataFromFirebase("customercartlist");
    }

    private Map<String, Object> fetchDataFromFirebase(String listName) {
        DatabaseReference listRef = firebaseDatabase.child(listName);
        Map<String, Object> result = new HashMap<>();

        listRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for (DataSnapshot snapshot : dataSnapshot.getChildren()) {
                    result.put(snapshot.getKey(), snapshot.getValue());
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // Handle errors here
            }
        });

        return result;
    }
}
