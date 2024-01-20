package com.example.backend.dto.request;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * This is the data transfer object for the login
 * It contains the model validation and the data from the frontend
 */

public class LoginRequestDto {
    @NotBlank(message = "Username must not be blank.")
    @NotNull(message = "Username must not be null.")
    @NotEmpty(message = "Username must not be empty.")
    @Length(min = 6, max = 50)
    private String username;

    @NotBlank(message = "Password must not be blank.")
    @NotNull(message = "Password must not be null.")
    @NotEmpty(message = "Password must not be empty.")
    @Length(min = 8, max = 200)
    private String password;

    public LoginRequestDto(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public LoginRequestDto() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
