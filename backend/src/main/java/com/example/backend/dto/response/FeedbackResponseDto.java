package com.example.backend.dto.response;

public class FeedbackResponseDto {
   private double averageRating;

    public FeedbackResponseDto(double averageRating) {
        this.averageRating = averageRating;
    }

    public FeedbackResponseDto() {
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }
}
