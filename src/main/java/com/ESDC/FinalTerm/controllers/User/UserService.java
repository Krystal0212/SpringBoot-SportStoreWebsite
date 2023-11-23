package com.ESDC.FinalTerm.controllers.User;

import com.ESDC.FinalTerm.controllers.Product.Product;
import com.google.firebase.database.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
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

    public List<User> getUserList() {
        CompletableFuture<List<User>> future = new CompletableFuture<>();

        FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance();
        DatabaseReference customerRef = firebaseDatabase.getReference("Customer");
        List<User> users = new ArrayList<>();

        customerRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                try {
                    for (DataSnapshot snap : snapshot.getChildren()) {
                        User user1 = snap.getValue(User.class);
                        user1.setUserID(snap.getKey());
                        users.add(user1);
                    }
                    future.complete(users);
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

    public CompletableFuture<User> updateUserState(String email, String newState) {
        initialize();
        Query userQuery = usersRef.orderByChild("email").equalTo(email);

        CompletableFuture<User> future = new CompletableFuture<>();

        userQuery.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                for (DataSnapshot userSnapshot : dataSnapshot.getChildren()) {
                    String userId = userSnapshot.getKey();
                    Map<String, Object> updates = new HashMap<>();
                    updates.put("state", newState);

                    usersRef.child(userId).updateChildren(updates, (databaseError, databaseReference) -> {
                        if (databaseError == null) {
                            // Update successful
                            User updatedUser = userSnapshot.getValue(User.class);
                            updatedUser.setState(newState);
                            future.complete(updatedUser);
                        } else {
                            // Update failed
                            future.completeExceptionally(databaseError.toException());
                        }
                    });
                }
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.completeExceptionally(databaseError.toException());
            }
        });

        return future;
    }


}