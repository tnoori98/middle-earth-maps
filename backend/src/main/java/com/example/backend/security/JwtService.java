package com.example.backend.security;

import com.example.backend.models.FractionEnum;
import com.example.backend.models.JwtBlackList;
import com.example.backend.models.User;
import com.example.backend.repositories.JwtBlackListRepository;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.HashMap;

@Service
public class JwtService {
    private final JwtBlackListRepository jwtBlackListRepository;
    private final Logger logger = LoggerFactory.getLogger(JwtService.class);
    private int jwtExpiration = 5 * 60 * 60;
    private int passwordResetExpiration = 24 * 60 * 60;

    @Value("${jwt.secret}")
    private String jwtSecret;

    public JwtService(JwtBlackListRepository jwtBlackListRepository) {
        this.jwtBlackListRepository = jwtBlackListRepository;
    }

    public String generateJwtToken(Authentication authentication, FractionEnum fraction) {
        SpringUserDetails userPrincipal = (SpringUserDetails) authentication.getPrincipal();

        var role = userPrincipal.getAuthorities();

        String token = Jwts.builder()
                .setSubject((userPrincipal.getUsername()))
                .setIssuedAt(new Date())
                .addClaims(new HashMap<String, Object>() {{
                    put("user_id", userPrincipal.getId());
                    put("role", fraction.toString());
                    put("username", userPrincipal.getUsername());
                    put("email", userPrincipal.getEmail());
                }})
                .setExpiration(new Date((new Date()).getTime() + jwtExpiration * 1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        return token;
    }

    public String generateNewJwtToken(User user) {
        String token = Jwts.builder()
                .setSubject((user.getUsername()))
                .setIssuedAt(new Date())
                .addClaims(new HashMap<String, Object>() {{
                    put("user_id", user.getId());
                    put("role", user.getFraction());
                    put("username", user.getUsername());
                    put("email", user.getEmail());
                }})
                .setExpiration(new Date((new Date()).getTime() + jwtExpiration * 1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        return token;
    }

    public String generatePasswordResetJwtToken(String email){
        String token = Jwts.builder()
                .setSubject("Reset password")
                .setIssuedAt(new Date())
                .addClaims(new HashMap<String, Object>() {{
                    put("email", email);
                }})
                .setExpiration(new Date((new Date()).getTime() + passwordResetExpiration * 1000))
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

        return token;
    }

    public String getUserNameFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().getSubject();
    }

    public String getEmailFromJwtToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(token).getBody().get("email", String.class);
    }

    public void blacklistJwt(String jwtToken){
        jwtBlackListRepository.save(new JwtBlackList(jwtToken));
    }

    public boolean validateJwtToken(String authToken) {
        try {
            //We set the jwt-signing key and with that we extract the claims from the jwt (String authToken)
            Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(authToken);
            boolean doesTokenExist = jwtBlackListRepository.existsByJwtToken(authToken);

            if(doesTokenExist) {
                return false;
            }

            return true;
        }catch (SignatureException e) {
            logger.error("Invalid JWT signature: {}", e.getMessage());
        }
        catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }

        return false;
    }
}
