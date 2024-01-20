package com.example.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "answers")
public class Answer {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "assessment_id")
    private Assessment assessment;

    public Assessment getAssessment() {
        return assessment;
    }

    @ManyToOne
    @JoinColumn(name="question_id")
    private Question question;

    public Question getQuestion(){
        return question;
    }

    @Column(nullable = false)
    private Integer rating;

    public Answer(Long id, Assessment assessment, Question question, Integer rating) {
        this.id = id;
        this.assessment = assessment;
        this.question = question;
        this.rating = rating;
    }

    public Answer() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAssessment(Assessment assessment) {
        this.assessment = assessment;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }
}
