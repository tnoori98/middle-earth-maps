package com.example.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class TheOneService {

    @Value("${theOneBearerToken}")
    private String bearerToken;

    public String getCharacters() {
        RestTemplate restTemplate = new RestTemplate();
        String[] characterNames = {"Gandalf", "Gollum", "Frodo Baggins", "Legolas", "Galadriel"};
        String apiUrl = "https://the-one-api.dev/v2/character?name=" + String.join(",", characterNames);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(bearerToken);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        RequestEntity<Void> requestEntity = RequestEntity.get(apiUrl).headers(headers).build();

        return restTemplate.exchange(requestEntity, String.class).getBody();
    }
}
