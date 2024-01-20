import axios, { AxiosResponse } from "axios";
import Profile from "../../components/pages/profile/Profile";
import { FractionEnum } from "../../components/pages/fraction/FractionEnum";

const { REACT_APP_BASE_URL } = process.env;
const userBaseApi = `${REACT_APP_BASE_URL}/api/user`;
const fractionApiUrl = `${REACT_APP_BASE_URL}/api/user/fraction`;

const headers = {
    headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
        AccessControlAllowOrigin: "*",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
};

export const credentialsApi = () => {
    const updateCredentials = (profile: Profile): Promise<AxiosResponse> => {
        return axios.patch(
            `${userBaseApi}/updateCredentials`,
            profile,
            headers
        );
    };
    return { updateCredentials };
};

export const updateFraction = () => {
    const updateFraction = (fraction: FractionEnum): Promise<AxiosResponse> => {
        return axios.put(
            fractionApiUrl,
            {
                fraction: FractionEnum[fraction]
            },
            headers
        );
    };
    return { updateFraction };
};

export const deleteUserAccount = () => {
    const deleteUserAccount = (): Promise<AxiosResponse> => {
        return axios.delete(`${userBaseApi}/deleteAccount`, headers);
    };
    return { deleteUserAccount };
};
