package com.example.backend.repositories;

import com.example.backend.models.Answer;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FeedbackAnswerRepository extends CrudRepository<Answer, Long> {
    List<Answer> findAllByAssessmentId (long id);
}
