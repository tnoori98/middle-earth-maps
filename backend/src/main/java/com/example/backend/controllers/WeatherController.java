package com.example.backend.controllers;

import com.example.backend.services.TheOneService;
import com.example.backend.services.WeatherService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.Array;

/**
 * WeatherController
 */

@RestController
@Validated
@CrossOrigin
@RequestMapping("api/weather")
public class WeatherController {
    private final WeatherService weatherService;

    public WeatherController(WeatherService weatherService){
        this.weatherService = weatherService;
    }
    @GetMapping(value="/temperature")
    public ResponseEntity<Array> receiveWeatherData() {
        var response = weatherService.getTemperature();
        return new ResponseEntity(response, HttpStatus.OK);
    }
}
