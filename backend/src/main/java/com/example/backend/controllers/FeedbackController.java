package com.example.backend.controllers;

import com.example.backend.dto.request.FeedbackRequestDto;
import com.example.backend.dto.response.FeedbackResponseDto;
import com.example.backend.models.Question;
import com.example.backend.services.FeedbackService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@Validated
@CrossOrigin
@RequestMapping("api/feedback")

public class FeedbackController {
    private final FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    @GetMapping(value="/receiveQuestions")
    public ResponseEntity<List<Question>>receiveQuestions() {
        var response = feedbackService.getQuestions();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/commitFeedback")
    public ResponseEntity<FeedbackResponseDto>commitFeedback(@Valid @RequestBody FeedbackRequestDto feedbackRequestDto){
        double response = feedbackService.commitFeedback(feedbackRequestDto);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }
}
