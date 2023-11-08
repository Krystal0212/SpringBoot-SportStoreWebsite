package com.ESDC.FinalTerm.firebase;

import com.ESDC.FinalTerm.objects.User;
import com.google.firebase.database.*;
import org.springframework.stereotype.Service;

@Service
public class FirebaseService {
    private final FirebaseDatabase firebaseDatabase;

    public FirebaseService() {
        this.firebaseDatabase = FirebaseDatabase.getInstance();
    }

    public User getUserByUsername(String username) {
        DatabaseReference usersRef = firebaseDatabase.getReference("Customer");

        // Create a listener to fetch user data
        ValueEventListener userListener = new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                User user = dataSnapshot.getValue(User.class);
                // Do something with the user object
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                // Handle any errors
            }
        };

        usersRef.orderByChild("username").equalTo(username).addListenerForSingleValueEvent(userListener);

        return null; // You may return the user object or modify the method accordingly
    }
}
