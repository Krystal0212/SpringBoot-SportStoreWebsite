package com.ESDC.FinalTerm.objects;

import lombok.*;

@Data
@NoArgsConstructor
public class User {

    public User(String email, String gender, String name, String password, String phone_number, String state, String username){
        this.email = email;
        this.gender = gender;
        this.name = name;
        this.password = password;
        this.phone_number = phone_number;
        this.state = state;
        this.username = username;
    }

    public void setUser(User user){
        this.userID = user.getUserID();
        this.username = user.getUsername();
        this.state = user.getState();
        this.gender = user.getGender();
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.name = user.getName();
        this.phone_number = user.getPhone_number();
    }

    @Getter @Setter
    private String userID;

    @Getter @Setter
    public String username;

    @Getter @Setter
    private String password;

    @Getter @Setter
    private String email;

    @Getter @Setter
    private String gender;

    @Getter @Setter
    private String phone_number;

    @Getter @Setter
    private String name;

    @Getter @Setter
    private String state;

    @Getter @Setter
    private boolean isGoogleUser = false;
}
