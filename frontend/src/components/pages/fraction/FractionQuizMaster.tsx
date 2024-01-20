import React, { useState } from "react";
import { FractionQuestions } from "./FractionQuestion";
import FractionQuiz from "./FractionQuiz";
import { FractionPointModel } from "./FractionQuestionModel";
import { FractionEnum } from "./FractionEnum";
import {AxiosResponse} from "axios";
import FadeIn from "react-fade-in";
import { showErrorToast } from "../../../helper/show-toast";
import { updateFraction } from "../../../services/api/CredentialsApi";

function FractionQuizMaster() {
    const [pageIndex, setPageIndex] = useState(1);
    const [pointMatrix, setPointMatrix] = useState(new Map<number, number>());
    const [quizFinished, setQuizFinished] = useState<boolean>(false);
    const [resultFraction, setResultFraction] = useState<string>();

    const goToNextPage = () => {
        setPageIndex(pageIndex + 1);
    };

    async function updatePointMatrix(points: FractionPointModel[]) {
        for (const point of points) {
            if (!pointMatrix.has(point.fraction)) {
                pointMatrix.set(point.fraction, point.point);
            } else {
                pointMatrix.set(
                    point.fraction,
                    pointMatrix.get(point.fraction)! + point.point
                );
            }
        }

        if (pageIndex === FractionQuestions.length) {
            setQuizFinished(true);

            let highestPointsFraction: FractionEnum = FractionEnum.HUMAN;
            let highestPoints = 0;

            for (const [fraction, point] of pointMatrix) {
                if (highestPoints === 0) {
                    highestPoints = pointMatrix.get(fraction)!;
                    highestPointsFraction = fraction;
                } else if (point > highestPoints) {
                    highestPoints = point;
                    highestPointsFraction = fraction;
                }
            }

            console.log(
                `You got ${highestPoints} points for ${FractionEnum[highestPointsFraction]}`,
                pointMatrix
            );

            setResultFraction(FractionEnum[highestPointsFraction]);

            const updateFractionApi = updateFraction();
            await updateFractionApi
                .updateFraction(highestPointsFraction)
                .then((res: AxiosResponse) => {
                    console.log(res);
                    localStorage.removeItem("jwt");
                    localStorage.setItem("jwt", res.data.jwt);
                })
                .catch((exception: AxiosResponse) => {
                    showErrorToast("error");
                    console.log(exception);
                });
        }
    }

    return (
        <>
            <div>
                <div
                    style={{
                        margin: "auto",
                        width: "80%",
                        height: "30%"
                    }}
                >
                    <hr />
                    <h1 className="main-container" style={{ color: "black" }}>
                        Which fraction are you?
                    </h1>
                    {!quizFinished && (
                        <div className="control" style={{ color: "black" }}>
                            {FractionQuestions?.map((data) => (
                                <>
                                    {pageIndex === data.id ? (
                                        <FractionQuiz
                                            question={data.question}
                                            id={data.id}
                                            answers={data.answers}
                                            updatePointMatrix={(points) =>
                                                updatePointMatrix(points)
                                            }
                                            nextPage={goToNextPage}
                                        />
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ))}
                        </div>
                    )}
                    {quizFinished && (
                        <>
                            <FadeIn delay={200} transitionDuration={3000}>
                                <div
                                    style={{
                                        display: "flex"
                                    }}
                                >
                                    <img
                                        src={
                                            "../fractions/" +
                                            resultFraction?.toLocaleLowerCase() +
                                            ".jpg"
                                        }
                                        style={{
                                            width:"25%",
                                            height:"25%",
                                            margin: "auto"
                                        }}
                                    />
                                </div>
                                <div
                                    style={{
                                        color: "black",
                                        display: "flex"
                                    }}
                                >
                                </div>
                                <h2 className={"main-container"}>
                                        You fraction: {" "}
                                        {resultFraction?.toLocaleLowerCase()}!
                                </h2>
                            </FadeIn>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

export default FractionQuizMaster;
