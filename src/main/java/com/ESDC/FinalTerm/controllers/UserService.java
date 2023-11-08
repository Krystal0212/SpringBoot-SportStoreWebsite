package com.ESDC.FinalTerm.controllers;

import com.ESDC.FinalTerm.objects.User;
import com.google.firebase.database.*;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private FirebaseDatabase firebaseDatabase;
    private User user;
    boolean isChecked = false;

    public UserService() {
        user = new User();
    }

    public User loginCustomer(String username, String password) {
        FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance();
        DatabaseReference usersRef = firebaseDatabase.getReference("Customer");
        Query query = usersRef.orderByChild("username").equalTo(username);

        query.addValueEventListener(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for (DataSnapshot customerSnapshot : dataSnapshot.getChildren()) {
                    User tempUser = customerSnapshot.getValue(User.class);

                    if (tempUser != null && tempUser.getPassword().equals(password)) {
                        tempUser.setUserID(customerSnapshot.getKey());
                        user.setUser(tempUser);
                        break;
                    }
                }
                isChecked = true;
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                user = null;
            }
        });

        while (isChecked) {
            return user;
        }
        return null;
    }

    public interface UserCallback {
        void onLoginResult(User user);
    }
}
