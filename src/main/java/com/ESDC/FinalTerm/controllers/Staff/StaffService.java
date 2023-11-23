package com.ESDC.FinalTerm.controllers.Staff;

import com.ESDC.FinalTerm.controllers.Staff.Staff;
import com.google.firebase.database.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class StaffService {
    private FirebaseDatabase firebaseDatabase;
    private Staff staff;
    boolean isChecked = false;
    private DatabaseReference staffsRef;
    private CompletableFuture<Staff> future;

    public StaffService() {
        staff = new Staff();
    }
    private void saveStaff(Staff staffGet){
        staff = staffGet;
    }
    public Staff getCurrentStaff() {
        return staff;
    }

    public void initialize(){
        staff = new Staff();
        FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance();
        staffsRef = firebaseDatabase.getReference("Staff");
        future = new CompletableFuture<>();
    }

    public Staff loginStaffByTyping(String username, String password) throws ExecutionException, InterruptedException {
        initialize();
        Query query = staffsRef.orderByChild("username").equalTo(username);
        CompletableFuture<Staff> future = new CompletableFuture<>();

        query.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot dataSnapshot) {
                Staff staffFound = null;
                for (DataSnapshot customerSnapshot : dataSnapshot.getChildren()) {
                    Staff tempStaff = customerSnapshot.getValue(Staff.class);

                    if (tempStaff != null && tempStaff.getPassword().equals(password)) {
                        tempStaff.setStaffID(customerSnapshot.getKey());
                        saveStaff(tempStaff);
                        staffFound = tempStaff;
                        break;
                    }
                }
                future.complete(staffFound);
            }

            @Override
            public void onCancelled(DatabaseError databaseError) {
                future.complete(null);
            }
        });
        saveStaff(future.get());
        return future.get();
    }

    public List<Staff> getStaffList() {
        CompletableFuture<List<Staff>> future = new CompletableFuture<>();

        FirebaseDatabase firebaseDatabase = FirebaseDatabase.getInstance();
        DatabaseReference staffRef = firebaseDatabase.getReference("Staff");
        List<Staff> staffs = new ArrayList<>();

        staffRef.addListenerForSingleValueEvent(new ValueEventListener() {
            @Override
            public void onDataChange(DataSnapshot snapshot) {
                try {
                    for (DataSnapshot snap : snapshot.getChildren()) {
                        Staff staff1 = snap.getValue(Staff.class);
                        staff1.setStaffID(snap.getKey());
                        staffs.add(staff1);
                    }
                    future.complete(staffs);
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
