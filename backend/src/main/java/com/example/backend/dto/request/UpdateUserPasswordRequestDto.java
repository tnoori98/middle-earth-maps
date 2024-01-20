package com.example.backend.dto.request;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

/**
 * This is the data transfer object for the update of the new password
 * It contains the model validation and the data from the frontend
 */

public class UpdateUserPasswordRequestDto {
    @NotBlank(message = "Password must not be blank.")
    @NotNull(message = "Password must not be null.")
    @NotEmpty(message = "Password must not be empty.")
    @Length(min = 8, max = 50)
    private String password;

    public UpdateUserPasswordRequestDto(String password) {
        this.password = password;
    }

    public UpdateUserPasswordRequestDto() {
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
