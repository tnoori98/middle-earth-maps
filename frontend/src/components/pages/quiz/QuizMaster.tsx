import React, { useState } from "react";
import { quizInput } from "./QuizInput";
import Quiz from "./Quiz";
import QuizResult from "./QuizResult";

function QuizMaster() {
    const [pageIndex, setPageIndex] = useState(0);

    const goToNextPage = () => {
        setPageIndex(pageIndex + 1);
    };

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

    return (
        <div>
            <div style={{ margin: "auto", width: "80%", height: "30%" }}>
                <hr />
                <h2 className="mb-1" style={{ color: "black" }}>
                    Quiz
                </h2>
                <div className="control" style={{ color: "black" }}>
                    {quizInput?.map((data) => (
                        <>
                            {pageIndex === data.id ? (
                                <Quiz
                                    question={data.question}
                                    choices={data.choices}
                                    correctAnswer={data.correctAnswer}
                                    id={pageIndex}
                                    userAnswer={data.userAnswer}
                                />
                            ) : (
                                <></>
                            )}
                        </>
                    ))}
                </div>
                {pageIndex < quizInput.length ? (
                    <input
                        style={{...elvishLinkStyle, width: "300px"}}
                        type={"button"}
                        value={"Next Question"}
                        onClick={() => goToNextPage()}
                    />
                ) : (
                    quizInput?.map((data) => (
                        <>
                            <QuizResult
                                correctAnswer={data.correctAnswer}
                                id={data.id}
                                userAnswer={data.userAnswer}
                                question={data.question}
                                choices={data.choices}
                            />
                        </>
                    ))
                )}
            </div>
        </div>
    );
}

export default QuizMaster;
