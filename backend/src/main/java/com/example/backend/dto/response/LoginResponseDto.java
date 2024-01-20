package com.example.backend.dto.response;

/**
 * This is the data transfer object for the login response
 * The object is going to be sent to the fronted (there the jwt is going to be saved in the local storage)
 */

public class LoginResponseDto {
    private String jwt;

    public LoginResponseDto() {
    }

    public LoginResponseDto(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
