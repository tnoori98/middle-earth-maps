import axios, { AxiosResponse } from "axios";
import {FeedbackModel} from "../../components/pages/feedback/Feedback";

const { REACT_APP_BASE_URL } = process.env;

const userBaseApi = `${REACT_APP_BASE_URL}/api/feedback`;
const headers = {
    headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        AccessControlAllowOrigin: "*"
    }
};

export const feedbackApi = () => {
    const commitFeedback = (feedbackModel: FeedbackModel): Promise<AxiosResponse> => {
        return axios.post(
            `${userBaseApi}/commitFeedback`,
            feedbackModel,
            headers
        );
    };

    const getQuestions = (): Promise<AxiosResponse> => {
        return axios.get(`${userBaseApi}/receiveQuestions`, headers);
    };
    return { commitFeedback, getQuestions };
};
