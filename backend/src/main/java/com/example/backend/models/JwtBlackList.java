package com.example.backend.models;

import javax.persistence.*;

/**
 * In this entity we save the already used JWTs (JSON Web Tokens)
 * Once you logout your token will be blacklisted and cannot be used anymore
 * In frontend the current jwt will be deleted from the local storage
 */

@Entity
@Table(name="jwtBlackListedTokens")
public class JwtBlackList {
    @Id
    @GeneratedValue
    private int id;

    @Column(name="jwtToken", length = 500)
    private String jwtToken;

    public JwtBlackList(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public JwtBlackList() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }
}
