import axios, { AxiosResponse } from "axios";
import Login from "../../components/pages/authentication/Login";
import Registration from "../../components/pages/authentication/Registration";

const { REACT_APP_BASE_URL } = process.env;
const userBaseApi = `${REACT_APP_BASE_URL}/api/authentication`;
const headers = {
    headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        AccessControlAllowOrigin: "*"
    }
};
const headersJWT = {
    headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        AccessControlAllowOrigin: "*",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
};

export const authenticationApi = () => {
    const authenticate = (user: Login): Promise<AxiosResponse> => {
        return axios.post(`${userBaseApi}/login`, user, headers);
    };

    const registration = (
        registration: Registration
    ): Promise<AxiosResponse> => {
        return axios.post(`${userBaseApi}/register`, registration, headers);
    };

    const logout = (): Promise<AxiosResponse> => {
        return axios.post(`${userBaseApi}/logout`, null, headersJWT);
    };

    return { authenticate, registration, logout };
};
