import React, { useState } from "react";
import { QuizModel } from "./QuizModel";
import { quizInput } from "./QuizInput";

const Quiz: React.FC<QuizModel> = ({
    question,
    choices,
    id
}) => {
    const [selectedUserAnswer, setSelectedUserAnswer] = useState<string>("");
    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedUserAnswer(event.target.value);
    };
    quizInput[id].userAnswer = selectedUserAnswer;
    return (
        <div className="topMargin">
            <h2 style={{ color: "black" }}>{question}</h2>

            {choices.map((data) => (
                <>
                    <label style={{ marginRight: "10px" }}>
                        <input
                            type={"radio"}
                            value={data}
                            name={"quiz"}
                            onChange={inputHandler}
                        />
                        {data}
                    </label>
                </>
            ))}
        </div>
    );
};

export default Quiz;
