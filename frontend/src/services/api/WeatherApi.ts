import axios, { AxiosResponse } from "axios";

const { REACT_APP_BASE_URL } = process.env;
const userTheOneApi = `${REACT_APP_BASE_URL}/api/weather`;

const headers = {
    headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        AccessControlAllowOrigin: "*",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
};

export const weatherApi = () => {
    const weather = (): Promise<AxiosResponse> => {
        return axios.get(`${userTheOneApi}/temperature`, headers);
    };
    return { weather };
};
