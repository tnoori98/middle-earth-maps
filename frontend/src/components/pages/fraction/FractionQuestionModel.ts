import { FractionEnum } from "./FractionEnum";

export interface FractionPointModel {
    fraction: FractionEnum;
    point: number;
}

export interface AnswerModel {
    id: number;
    answer: string;
    points: FractionPointModel[];
}

export interface FractionQuestionModel {
    id: number;
    question: string;
    answers: AnswerModel[];
}
