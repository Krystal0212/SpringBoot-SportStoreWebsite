package com.ESDC.FinalTerm.controllers.User;

import com.google.firebase.database.*;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class UserService {
    private FirebaseDatabase firebaseDatabase;
    private User user;
    boolean isChecked = false;
    private DatabaseReference usersRef;
    private CompletableFuture<User> future;

    public UserService() {
        user = new User();
    }
    private void saveUser(User userGet){
        user = userGet;
    }

    public void initialize(){
        user = new User();
        FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance();
        usersRef = firebaseDatabase.getReference("Customer");
        future = new CompletableFuture<>();
    }

    public void logoutUser(){
        user = new User();
    }

    public User findAndSaveGoogleUser(User userGet) throws ExecutionException, InterruptedException {
        initialize();
        User userData = loginCustomerByGoogle(userGet.getEmail(),userGet.getUsername());
        saveUser(userData);
        return userData;
    }

    public User loginCustomerByGoogle(String email, String username) throws ExecutionException, InterruptedException {
        Query query = usersRef.orderByChild("email").equalTo(email);

        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                User userFound = null;
                for (DataSnapshot customerSnapshot : dataSnapshot.getChildren()) {
                    User tempUser = customerSnapshot.getValue(User.class);

                    if (tempUser != null && tempUser.getUsername().equals(username)) {
                        tempUser.setUserID(customerSnapshot.getKey());
                        userFound = tempUser;
                        break;
                    }
                }
                future.complete(userFound);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.complete(null);
            }
        });

        return future.get();
    }


    public User loginCustomerByTyping(String username, String password) throws ExecutionException, InterruptedException {
        initialize();
        Query query = usersRef.orderByChild("username").equalTo(username);
        CompletableFuture<User> future = new CompletableFuture<>();

        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                User userFound = null;
                for (DataSnapshot customerSnapshot : dataSnapshot.getChildren()) {
                    User tempUser = customerSnapshot.getValue(User.class);

                    if (tempUser != null && tempUser.getPassword().equals(password)) {
                        tempUser.setUserID(customerSnapshot.getKey());
                        saveUser(tempUser);
                        userFound = tempUser;
                        break;
                    }
                }
                future.complete(userFound);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.complete(null);
            }
        });
        saveUser(future.get());
        return future.get();
    }

    public User registerUser(User newUser) throws ExecutionException, InterruptedException {
        initialize();

        //

        return newUser;
    }

    public User getCurrentUser() {
        return user;
    }

    public boolean isUserLoggedIn() {
        // Add the logic to check if a user is logged in
        return user != null && user.getUserID() != null;
    }
}