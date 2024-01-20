package com.example.backend.dto.request;

public class FeedbackRequestDto {
    private int rating;

    private long assessmentId;

    private long questionId;

    public FeedbackRequestDto(int rating, long assessmentId, long questionId) {
        this.rating = rating;
        this.assessmentId = assessmentId;
        this.questionId = questionId;
    }

    public FeedbackRequestDto() {
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public long getAssessmentId() {
        return assessmentId;
    }

    public void setAssessmentId(long assessmentId) {
        this.assessmentId = assessmentId;
    }

    public long getQuestionId() {
        return questionId;
    }

    public void setQuestionId(long questionId) {
        this.questionId = questionId;
    }
}
