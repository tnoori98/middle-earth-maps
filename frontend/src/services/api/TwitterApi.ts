import axios, { AxiosResponse } from "axios";

const { REACT_APP_BASE_URL } = process.env;
const userTwitterApi = `${REACT_APP_BASE_URL}/api/twitter`;
const headers = {
    headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        AccessControlAllowOrigin: "*",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
};

export const twitterApi = () => {
    const tweets = (): Promise<AxiosResponse> => {
        return axios.get(`${userTwitterApi}/tweets`, headers);
    };
    return { tweets };
};
