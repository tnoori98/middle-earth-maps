export interface QuizModel {
    id: number;
    question: string;
    choices: string[];
    correctAnswer: string;
    userAnswer: string;
}
