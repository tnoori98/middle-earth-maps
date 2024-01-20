package com.example.backend.repositories;

import com.example.backend.models.Assessment;
import org.springframework.data.repository.CrudRepository;

public interface FeedbackAssessmentRepository extends CrudRepository<Assessment, Long> {
    Assessment findAllById(long id);
}
