import React from "react";
import { AnswerModel, FractionPointModel } from "./FractionQuestionModel";
import * as _ from "lodash";
import { parseInt } from "lodash";
import toast, { Toaster } from "react-hot-toast";

interface QuizParameters {
    question: string;
    id: number;
    answers: AnswerModel[];
    updatePointMatrix: (pointMatrix: FractionPointModel[]) => void;
    nextPage: () => void;
}

const FractionQuiz: React.FC<QuizParameters> = ({
    question,
    id,
    answers,
    updatePointMatrix,
    nextPage
}) => {
    let answerResult = 0;
    const shuffeledAnswers = _.shuffle(answers);

    function evaluatePoints() {
        if (answerResult !== 0) {
            const answerPoints = answers.find(
                (answer) => answer.id === answerResult
            );

            updatePointMatrix(answerPoints!.points);
            nextPage();
        } else {
            toast.error("Please select an answer", {
                position: "top-center",
                duration: 3000
            });
        }
    }

    function inputChange(event: React.ChangeEvent<HTMLInputElement>) {
        answerResult = parseInt(event.target.value);
    }

    const elvishLinkStyle = {
        textDecoration: "none",
        padding: "10px 20px",
        borderRadius: "5px",
        backgroundColor: "#ad4f0c",
        color: "#F5DEB3",
        fontSize: "16px",
        margin: "0 10px",
        transition: "background-color 0.3s",
        cursor: "pointer",
        border: "none",
        outline: "none",
        width: "300px"
    };

    {
        return (
            <div className="main-container">
                <h2 className="textCenter" style={{ color: "black" }}>{question}</h2>
                {shuffeledAnswers.map((data) => (
                    <>
                        <label style={{ marginRight: "10px", textAlign: "center"}}>
                            <input
                                type={"radio"}
                                value={data.id}
                                name={"fraction"}
                                onChange={inputChange}
                            />
                            {data.answer}
                        </label>
                        <br />
                    </>
                ))}
                <button style={{...elvishLinkStyle, width: "300px"}} onClick={evaluatePoints}>
                    Continue
                </button>
            </div>
        );
    }
};

export default FractionQuiz;
