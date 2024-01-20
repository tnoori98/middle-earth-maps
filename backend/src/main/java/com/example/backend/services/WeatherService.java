package com.example.backend.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class WeatherService {
    public String getTemperature() {
        RestTemplate restTemplate = new RestTemplate();

        String apiUrl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m";
        HttpHeaders headers = new HttpHeaders();
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        RequestEntity<Void> requestEntity = RequestEntity.get(apiUrl).headers(headers).build();

        return restTemplate.exchange(requestEntity, String.class).getBody();
    }
}
