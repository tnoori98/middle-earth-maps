package com.example.backend.security;

import org.springframework.security.crypto.password.PasswordEncoder;

/**
 * Spring is designed to encode and decode passwords
 */

public class PasswordDecoder implements PasswordEncoder {

    @Override
    public String encode(CharSequence rawPassword) {
        return "";
    }

    @Override
    public boolean matches(CharSequence rawPassword, String encodedPassword) {
        return true;
    }
}
