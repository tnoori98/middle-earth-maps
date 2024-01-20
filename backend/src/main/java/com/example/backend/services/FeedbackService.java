package com.example.backend.services;

import com.example.backend.dto.request.FeedbackRequestDto;
import com.example.backend.models.Answer;
import com.example.backend.models.Assessment;
import com.example.backend.models.Question;
import com.example.backend.repositories.FeedbackAnswerRepository;
import com.example.backend.repositories.FeedbackAssessmentRepository;
import com.example.backend.repositories.FeedbackQuestionRepository;
import com.github.dozermapper.core.Mapper;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;
import java.util.OptionalDouble;

@Service
@EnableScheduling
public class FeedbackService {
    private final FeedbackQuestionRepository feedbackQuestionRepository;
    private final FeedbackAnswerRepository feedbackAnswerRepository;
    private final FeedbackAssessmentRepository feedbackAssessmentRepository;
    private final Mapper mapper;

    public FeedbackService(FeedbackQuestionRepository feedbackQuestionRepository, FeedbackAnswerRepository feedbackAnswerRepository,
                           FeedbackAssessmentRepository feedbackAssessmentRepository,
                           Mapper mapper) {
        this.feedbackQuestionRepository = feedbackQuestionRepository;
        this.feedbackAnswerRepository = feedbackAnswerRepository;
        this.feedbackAssessmentRepository = feedbackAssessmentRepository;
        this.mapper = mapper;
    }

    public List getQuestions() {
        return feedbackQuestionRepository.findAllByCollection_Id(1);
    }

    public double commitFeedback(FeedbackRequestDto feedbackRequestDto) {
        Answer answer = new Answer();
        mapper.map(feedbackRequestDto, answer);

        answer.setRating(feedbackRequestDto.getRating());
        Question question = feedbackQuestionRepository.findAllById(feedbackRequestDto.getQuestionId());
        Assessment assessment = feedbackAssessmentRepository.findAllById(feedbackRequestDto.getAssessmentId());
        answer.setAssessment(assessment);
        answer.setQuestion(question);

        feedbackAnswerRepository.save(answer);

        List<Answer> answers = feedbackAnswerRepository.findAllByAssessmentId(assessment.getId());
        OptionalDouble averageRating = answers.stream().mapToDouble(Answer::getRating).average();

        if (averageRating.isPresent()) {
            return averageRating.getAsDouble();
        }

        return feedbackRequestDto.getRating();
    }

    @Scheduled(cron = "0 0 9 25 * ?") //25th of each month
    public void writeToCsv() {
        try {
            ClassLoader classLoader = getClass().getClassLoader();
            File file = new File(classLoader.getResource(".").getFile() + "/averageRating.txt");
            if (!file.exists()) {
                if (!file.createNewFile()) {
                    throw new IOException("File Creation not successful");
                }
            }

            Assessment assessment = feedbackAssessmentRepository.findAllById(1);
            List<Answer> answers = feedbackAnswerRepository.findAllByAssessmentId(assessment.getId());
            OptionalDouble averageRating = answers.stream().mapToDouble(Answer::getRating).average();

            FileWriter fileWriter = new FileWriter(file, true);

            if (averageRating.isPresent()) {
                fileWriter.write("The average rating is " + averageRating.getAsDouble() + "\n");
            } else {
                fileWriter.write("The average rating is not available\n");
            }

            fileWriter.close();

            MailService.sendFeedback("thomas.noori@gmail.com", "Periodical Evaluation of Feedback", averageRating);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
