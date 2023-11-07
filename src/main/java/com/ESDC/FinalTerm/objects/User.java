package com.ESDC.FinalTerm.objects;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Getter @Setter
    private String userId;

    @Getter @Setter
    private String userName;

    @Getter @Setter
    private String userPassword;

    @Getter @Setter
    private String email;

    @Getter @Setter
    private String gender;

    @Getter @Setter
    private String phoneNumber;

    @Getter @Setter
    private String fullName;

}
