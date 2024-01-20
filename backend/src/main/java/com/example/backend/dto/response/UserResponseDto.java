package com.example.backend.dto.response;

/**
 * This is the data transfer object for the user credentials response
 */

public class UserResponseDto {
    private String jwt;

    public UserResponseDto() {
    }

    public UserResponseDto(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
