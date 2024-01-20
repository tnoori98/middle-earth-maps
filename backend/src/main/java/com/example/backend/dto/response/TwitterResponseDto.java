package com.example.backend.dto.response;

import com.twitter.clientlib.model.MultiTweetLookupResponse;

/**
 * This is the data transfer object for the twitter response
 * */

public class TwitterResponseDto {
    MultiTweetLookupResponse response;

    public TwitterResponseDto(MultiTweetLookupResponse response) {
        this.response = response;
    }

    public MultiTweetLookupResponse getResponse() {
        return response;
    }

    public void setResponse(MultiTweetLookupResponse response) {
        this.response = response;
    }

    public TwitterResponseDto() {
    }
}
