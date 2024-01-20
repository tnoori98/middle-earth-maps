import axios, { AxiosResponse } from "axios";

const { REACT_APP_BASE_URL } = process.env;
const userTheOneApi = `${REACT_APP_BASE_URL}/api/theoneapi`;
const headers = {
    headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        AccessControlAllowOrigin: "*",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
};

export const theOneApi = () => {
    const characters = (): Promise<AxiosResponse> => {
        return axios.get(`${userTheOneApi}/characters`, headers);
    };
    return { characters };
};
