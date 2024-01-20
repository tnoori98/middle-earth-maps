package com.example.backend.models;

import javax.persistence.*;

@Entity
@Table(name = "questions")
public class Question {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;

    @Column(nullable = false)
    public String question;

    @ManyToOne
    @JoinColumn(name="collection_id", nullable = false)
    public Collection collection;

    public Question(String question, Collection collection) {
        this.question = question;
        this.collection = collection;
    }

    public Question(){

    }
}
