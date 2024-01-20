package com.example.backend.dto.response;

/**
 * This is the data transfer object for the registration response
 * The object is going to be sent to the fronted
 */

public class RegistrationResponseDto {
    private Long id;

    private String username;

    private String email;

    public RegistrationResponseDto(Long id, String username, String email) {
        this.id = id;
        this.username = username;
        this.email = email;
    }

    public RegistrationResponseDto() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
}