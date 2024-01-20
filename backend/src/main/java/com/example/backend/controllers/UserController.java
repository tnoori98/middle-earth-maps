package com.example.backend.controllers;

import com.example.backend.dto.request.UpdateFractionRequestDto;
import com.example.backend.dto.request.UserRequestDto;
import com.example.backend.dto.response.UpdateFractionResponseDto;
import com.example.backend.dto.response.UserResponseDto;
import com.example.backend.helper.JwtHelper;
import com.example.backend.security.JwtService;
import com.example.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

/**
 * The user controller receives all incoming JSON objects from the frontend. We call the services to process the data
 * */

@RestController
@Validated
@CrossOrigin
@RequestMapping("api/user")
public class UserController {
    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService registrationService, JwtService jwtService) {
        this.userService = registrationService;
        this.jwtService = jwtService;
    }

    @PatchMapping(value = "/updateCredentials")
    public ResponseEntity<UserResponseDto> updateCredentials(HttpServletRequest request, @Valid @RequestBody UserRequestDto userRequestDto){
        var jwtToken = JwtHelper.parseJwt(request);
        var usernameOld = jwtService.getUserNameFromJwtToken(jwtToken);

        UserResponseDto user = userService.updateUserCredentials(userRequestDto, usernameOld, jwtToken);

        if(user == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PutMapping(value = "/fraction")
    public ResponseEntity updateFraction(HttpServletRequest request, @Valid @RequestBody UpdateFractionRequestDto updateFractionRequestDto){
        var jwtToken = JwtHelper.parseJwt(request);
        var username = jwtService.getUserNameFromJwtToken(jwtToken);

        UpdateFractionResponseDto updateFractionResponseDto = userService.updateUserFraction(username, updateFractionRequestDto.fraction);

        if(updateFractionResponseDto == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity<>(updateFractionResponseDto, HttpStatus.OK);
    }

    @DeleteMapping(value = "/deleteAccount")
    public ResponseEntity deleteAccount(HttpServletRequest request){
        var jwtToken = JwtHelper.parseJwt(request);
        var username = jwtService.getUserNameFromJwtToken(jwtToken);

        userService.deleteAccount(username, jwtToken);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
