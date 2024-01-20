package com.example.backend.dto.request;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * This is the data transfer object for the registration
 * It contains the model validation and the data from the frontend
 */

public class RegistrationRequestDto {
    @NotBlank(message = "Username must not be blank.")
    @NotNull(message = "Username must not be null.")
    @NotEmpty(message = "Username must not be empty.")
    @Length(min = 6, max = 50)
    private String username;

    @NotBlank(message = "Email must not be blank.")
    @NotNull(message = "Email must not be null.")
    @NotEmpty(message = "Email must not be empty.")
    @Email(message = "The email is not valid.")
    @Length(min = 10, max = 50)
    private String email;

    @NotBlank(message = "Password must not be blank.")
    @NotNull(message = "Password must not be null.")
    @NotEmpty(message = "Password must not be empty.")
    @Length(min = 8, max = 200)
    private String password;

    public RegistrationRequestDto(String username, String email, String password) {
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

