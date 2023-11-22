package com.ESDC.FinalTerm.controllers.Staff;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@NoArgsConstructor
public class Staff {
    public Staff(String name, String password, String role, String username){
        this.name = name;
        this.password = password;
        this.username = username;
        this.role = role;
    }
    @Setter @Getter
    private String staffID;

    @Setter @Getter
    public String username;

    @Setter @Getter
    private String password;

    @Setter @Getter
    private String name;

    @Setter @Getter
    private String role;
}
