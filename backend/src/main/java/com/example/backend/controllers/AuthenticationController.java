package com.example.backend.controllers;

import com.example.backend.dto.request.LoginRequestDto;
import com.example.backend.dto.request.ResetPasswordRequestDto;
import com.example.backend.dto.request.UpdateUserPasswordRequestDto;
import com.example.backend.dto.response.LoginResponseDto;
import com.example.backend.helper.JwtHelper;
import com.example.backend.security.JwtService;
import com.example.backend.services.UserService;
import com.example.backend.dto.request.RegistrationRequestDto;
import com.example.backend.dto.response.RegistrationResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * The authentication controller receives all incoming JSON objects from the frontend. We call the services to process the data
 * Every request is sent to a different route
 * This controller manages: user activation, login, registration, password reset & logout
 */

@RestController
@Validated
@CrossOrigin
@RequestMapping("api/authentication")
public class AuthenticationController {
    private final UserService userService;
    private final JwtService jwtService;

    public AuthenticationController(UserService registrationService, JwtService jwtService) {
        this.userService = registrationService;
        this.jwtService = jwtService;
    }

    @PostMapping(value = "/register")
    public ResponseEntity<RegistrationResponseDto> registerUser(@Valid @RequestBody RegistrationRequestDto registrationRequestDto){
        RegistrationResponseDto createdUser = userService.registerUser(registrationRequestDto);

        if(createdUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<LoginResponseDto> authenticateUser(@Valid @RequestBody LoginRequestDto loginRequestDto){
        LoginResponseDto authenticatedUser = userService.authenticateUser(loginRequestDto);

        if (authenticatedUser == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(authenticatedUser, HttpStatus.OK);
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<HttpStatus> logoutUser(HttpServletRequest request) {
        var token = JwtHelper.parseJwt(request);

        if(token == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        jwtService.blacklistJwt(token);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value = "/requestPasswordReset")
    public ResponseEntity<HttpStatus> requestPasswordActivationLink(@Valid @RequestBody ResetPasswordRequestDto resetPasswordRequestDto){
        userService.requestPasswordActivationLink(resetPasswordRequestDto.getEmail());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(value="/resetPassword/{jwtToken}")
    public ResponseEntity<HttpStatus> activatePassword(@Valid @RequestBody UpdateUserPasswordRequestDto updateUserPasswordRequestDto, @PathVariable(value = "jwtToken") String jwtToken) {
        if(!jwtService.validateJwtToken(jwtToken)) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        String email = jwtService.getEmailFromJwtToken(jwtToken);
        userService.updateUserPassword(email, updateUserPasswordRequestDto.getPassword());
        jwtService.blacklistJwt(jwtToken);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
