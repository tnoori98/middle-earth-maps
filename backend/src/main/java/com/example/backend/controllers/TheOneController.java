package com.example.backend.controllers;

import com.example.backend.services.TheOneService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;

/**
 * TheOneController
 */

@RestController
@Validated
@CrossOrigin
@RequestMapping("api/theoneapi")
public class TheOneController {
    private final TheOneService theOneService;

    public TheOneController(TheOneService theOneService){
        this.theOneService = theOneService;
    }
    @GetMapping(value="/characters")
    public ResponseEntity<Array> receiveCharacters() {
        var response = theOneService.getCharacters();
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
