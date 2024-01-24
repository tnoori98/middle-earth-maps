import React, { useState, useEffect } from "react";
import { feedbackApi } from "../../../services/api/FeedbackApi";
import { Slider, TextField } from "@material-ui/core";
import "../../../App";
import { useTranslation } from "react-i18next";
import "./Mordor.css";
import ScaledBar from "./BarChart";
import {showToast} from "../../../helper/show-toast";
import {ToastContainer} from "react-toastify";

export interface FeedbackModel {
    rating: number;
    questionId: number;
    assessmentId: number;
}

interface QuestionModel {
    id: number;
    question: string;
    collection: {
        id: number;
        name: string;
    };
}

function Feedback() {
    const defaultFeedbackApi = feedbackApi();
    const [feedbackResponse, setFeedbackResponse] = useState<QuestionModel[]>(
        []
    );
    const { t, i18n } = useTranslation(["main"]);
    const [feedbackSent, setFeedbackSent] = useState(false);

    useEffect(() => {
        getQuestions();
    }, []);

    const [rating, setRating] = useState<Record<string, number>>({});
    const [averageRating, setAverageRating] = useState<number>(0.0);

    const handleChangeSlider = (event: any, id: number) => {
        setRating((prevState) => ({
            ...prevState,
            [id]: event
        }));
    };

    const submitHandler = () => {
        const sliderValues = Object.values(rating);
        const feedbackModel: FeedbackModel = {
            rating: 0,
            questionId: 0,
            assessmentId: 0
        };

        sliderValues.map(async (rating, index) => {
            index = index + 1;
            const newFeedbackModel = {
                ...feedbackModel,
                rating: rating,
                questionId: index,
                assessmentId: 1
            };

            await defaultFeedbackApi
                .commitFeedback(newFeedbackModel)
                .then((response) => {
                    console.log(response);
                    setAverageRating(response.data);
                    setFeedbackSent(true);
                })
                .catch((exception) => {
                    console.log(exception);
                });
        });
    };

    async function getQuestions() {
        const response = await defaultFeedbackApi.getQuestions();
        setFeedbackResponse([...response.data]);
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

    return (
        <div className={"main-container"}>
            <div>
                <>
                    <h1>{t("feedback.main")}</h1>
                    {feedbackResponse &&
                        feedbackResponse?.map((feedback: QuestionModel) => (
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                key={feedback.id}
                            >
                                <TextField
                                    value={feedback.question}
                                    style={{
                                        width: "300px",
                                        marginLeft: "20px"
                                    }}
                                />
                                <Slider
                                    aria-label="Small steps"
                                    valueLabelDisplay="auto"
                                    onChange={(event, value) =>
                                        handleChangeSlider(value, feedback.id)
                                    }
                                    step={5}
                                    style={{
                                        width: "200px",
                                        marginLeft: "20px"
                                    }}
                                />
                            </div>
                        ))}
                    <br />
                    <input
                        style={{...elvishLinkStyle, width: "300px"}}
                        type={"submit"}
                        value={t("feedback.button").toString()}
                        onClick={submitHandler}
                    />
                    <hr />
                    {feedbackSent && (
                        <h1>{t("feedback.success").toString() + averageRating.toFixed(2)}</h1>
                    )}
                </>
            </div>
        </div>
    );
}

export default Feedback;
