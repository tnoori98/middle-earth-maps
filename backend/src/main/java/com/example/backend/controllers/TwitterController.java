package com.example.backend.controllers;

import com.example.backend.dto.response.TwitterResponseDto;
import com.example.backend.services.TwitterService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * TwitterController
 */

@RestController
@Validated
@CrossOrigin
@RequestMapping("api/twitter")
public class TwitterController {
    private final TwitterService twitterService;

    public TwitterController(TwitterService twitterService){
        this.twitterService = twitterService;
    }
    @GetMapping(value="/tweets")
    public ResponseEntity<TwitterResponseDto> receiveTweets() {
        var response = twitterService.getTweets();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
