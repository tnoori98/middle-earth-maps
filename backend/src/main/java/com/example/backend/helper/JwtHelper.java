package com.example.backend.helper;

import org.springframework.util.StringUtils;
import javax.servlet.http.HttpServletRequest;

/**
 * Helper class for JWT (JSON Web Token) relevant methods
 */

public class JwtHelper {
    public static String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7, headerAuth.length());
        }

        return null;
    }
}