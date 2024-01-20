package com.example.backend.models;

import javax.persistence.*;

/**
 * In this entity we save the user credentials
 * We do not save the password in plain text, instead we create a unique salt value for each user
 * With the salt value and the plain text password, we hash the password and save it
 */

@Entity
@Table(name = "users")
public class User {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50)
    private String username;

    @Column(nullable = false, length = 50)
    private String email;

    @Column(nullable = false, length = 50)
    @Enumerated(EnumType.STRING)
    private FractionEnum fraction;

    @Column(nullable = false)
    private String salt;

    @Column(nullable = false)
    private String hash;

    public User(String username, String email, FractionEnum fraction, String hash, String salt) {
        this.username = username;
        this.email = email;
        this.fraction = fraction;
        this.hash = hash;
        this.salt = salt;
    }

    public User() {}

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }


    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getId() {
        return id;
    }

    public String getSalt() {
        return salt;
    }

    public void setSalt(String salt) {
        this.salt = salt;
    }

    public String getHash() {
        return hash;
    }

    public void setHash(String hash) {
        this.hash = hash;
    }

    public FractionEnum getFraction() {
        return fraction;
    }

    public void setFraction(FractionEnum fraction) {
        this.fraction = fraction;
    }
}
