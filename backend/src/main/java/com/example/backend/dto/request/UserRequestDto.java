package com.example.backend.dto.request;

import javax.validation.constraints.Email;

/**
 * This is the data transfer object for updating the user credentials
 * It contains the model validation and the data from the frontend
 */

public class UserRequestDto {

    private String username;

    @Email
    private String email;

    private String password;

    public UserRequestDto(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}