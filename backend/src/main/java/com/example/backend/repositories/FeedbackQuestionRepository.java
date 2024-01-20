package com.example.backend.repositories;

import com.example.backend.models.Question;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackQuestionRepository extends CrudRepository<Question, Long> {
    List<Question> findAllByCollection_Id(long id);
    Question findAllById(long id);
}
