package com.example.backend.dto.request;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * This is the data transfer object for the password reset
 * It contains the model validation and the data from the frontend
 */

public class ResetPasswordRequestDto {
    @NotBlank(message = "Email must not be blank.")
    @NotNull(message = "Email must not be null.")
    @NotEmpty(message = "Email must not be empty.")
    @Email(message = "Email is not valid.")
    @Length(min = 6, max = 50)
    private String email;

    public ResetPasswordRequestDto(String email) {
        this.email = email;
    }

    public ResetPasswordRequestDto() {
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
