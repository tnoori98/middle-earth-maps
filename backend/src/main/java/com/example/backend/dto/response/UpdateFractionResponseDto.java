package com.example.backend.dto.response;

/**
 * This is the data transfer object for the update fraction response
 * */

public class UpdateFractionResponseDto {
    private String jwt;

    public UpdateFractionResponseDto() {
    }

    public UpdateFractionResponseDto(String jwt) {
        this.jwt = jwt;
    }

    public String getJwt() {
        return jwt;
    }

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
}
