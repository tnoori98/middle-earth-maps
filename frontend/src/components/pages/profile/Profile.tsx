import React, { useEffect, useState } from "react";
import { Box } from "rebass";
import "../../../css/App.css";
import jwt from "jwt-decode";
import jwtDecode from "jwt-decode";
import TextField from "@material-ui/core/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { showErrorToast, showToast } from "../../../helper/show-toast";
import {
    credentialsApi,
    deleteUserAccount
} from "../../../services/api/CredentialsApi";
import QuizMaster from "../quiz/QuizMaster";
import "./Profile.css";
import { authenticationApi } from "../../../services/api/AuthenticationApi";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ToastContainer } from "react-toastify";

interface jwtToken {
    name: string;
}

interface Profile {
    username: string;
    email: string;
    password: string;
}

type UserCredentials = {
    username: string;
    email: string;
    password: string;
};

function Profile() {
    let username: any = {};
    const defaultUserApi = credentialsApi();
    const defaultDeleteUserApi = deleteUserAccount();
    const [isMounted, setIsMounted] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("jwt");
    if (typeof token === "string") {
        username = jwtDecode<jwtToken>(token);
    }

    const { register, handleSubmit } = useForm<UserCredentials>();
    const onSubmit: SubmitHandler<UserCredentials> = (data) => {
        const validationErrors = [];
        if (data.password && data.password.length < 8) {
            validationErrors.push("Password must be at least 8 characters long");
        }
        if (data.username && data.username.length < 6) {
            validationErrors.push("Username must be at least 6 characters long");
        }
        if (data.email && data.email.length < 10) {
            validationErrors.push("Email must be at least 10 characters long");
        }
        if (validationErrors.length !== 0) {
            showErrorToast(validationErrors.join("\n"));
            return;
        }
        submitHandler(data);
    };

    const submitHandler = async (data: UserCredentials) => {
        const userData = data;
        await defaultUserApi
            .updateCredentials(userData as Profile)
            .then((response) => {
                showToast("Success");
                localStorage.removeItem("jwt");
                localStorage.setItem("jwt", response.data.jwt);
                window.location.reload();
            })
            .catch((exception) => {
                showErrorToast("error");
                console.log(exception);
            });
    };

    async function deleteAccount() {
        await defaultDeleteUserApi.deleteUserAccount();
        await authenticationApi()
            .logout()
            .then(() => {
                localStorage.removeItem("jwt");
                navigate("/");
            })
            .catch((exception) => console.log(exception));
    }

    function openProfileSettings() {
        document.getElementById("sidenav")!.style.width = "250px";
    }

    function closeProfileSettings() {
        document.getElementById("sidenav")!.style.width = "0px";
    }

    const inputXml = () => {
        localStorage.setItem("contentNegotiation", "xml");
    };

    const inputJson = () => {
        localStorage.setItem("contentNegotiation", "json");
    };

    const role = username.role.toLocaleLowerCase();

    const aboutUrl = "/about";

    const { t, i18n } = useTranslation(["main"]);

    const changeLanguages = (event: any) => {
        const language = event.target.value;
        console.log(language);
        i18n.changeLanguage(language);
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh"
                }}
            >
                <Box
                    sx={{
                        p: 0
                    }}
                />
                <Box
                    sx={{
                        flex: "1 1 auto",
                        p: 0
                    }}
                >
                    <div className="main-container">
                        <div className={"toast-container-profile"}>
                            <ToastContainer />
                        </div>
                        <h2 className="">{username.username}</h2>
                        <input
                            style={{ ...elvishLinkStyle, width: "300px" }}
                            type={"button"}
                            value={t("profile.buttonSettings").toString()}
                            onClick={() => {
                                openProfileSettings();
                            }}
                        />
                        <hr />
                        {role !== "default" ? (
                            <>
                                {" "}
                                <h3 className={""}>Race {role}</h3>
                                <img
                                    src={"../fractions/" + role + ".jpg"}
                                    style={{
                                        width: "80%",
                                        maxWidth: "550px",
                                        margin: "inherit",
                                        position: "relative"
                                    }}
                                />
                                <br />
                                <label>
                                    Find out more about your race&nbsp;
                                </label>
                                <u>
                                    <a
                                        style={{
                                            color: "black",
                                            fontSize: "16px",
                                            fontStyle: "bold",
                                            textDecoration: "underline"
                                        }}
                                        href={aboutUrl + "/" + role}
                                    >
                                        here
                                    </a>
                                </u>
                            </>
                        ) : (
                            <></>
                        )}
                        <div id={"sidenav"} className={"sidenav"}>
                            <p>{t("profile.settingsHeader")}</p>
                            <a
                                href="javascript:void(0)"
                                className="closebtn"
                                onClick={closeProfileSettings}
                            >
                                &times;
                            </a>
                            <div style={{ marginBottom: "20px" }} />
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form">
                                    <TextField
                                        {...register("username")}
                                        label={t("profile.usernameLabel")}
                                        style={{
                                            width: "300px",
                                            marginBottom: "30px"
                                        }}
                                        maxRows={1}
                                        className={"middleContent"}
                                        placeholder={username.username}
                                    />
                                    <br />
                                    <TextField
                                        {...register("email")}
                                        label={t("profile.emailLabel")}
                                        style={{
                                            width: "300px",
                                            marginBottom: "30px"
                                        }}
                                        maxRows={1}
                                        className={"middleContent"}
                                        placeholder={username.email}
                                    />
                                    <br />
                                    <TextField
                                        {...register("password")}
                                        label={t("profile.passwordLabel")}
                                        style={{
                                            width: "300px",
                                            marginBottom: "30px"
                                        }}
                                        maxRows={1}
                                        className={"middleContent"}
                                        type={"password"}
                                    />
                                    <br />
                                    <hr />
                                    <input
                                        style={{
                                            ...elvishLinkStyle,
                                            width: "200px"
                                        }}
                                        type={"submit"}
                                        value={t(
                                            "profile.buttonChangeData"
                                        ).toString()}
                                    />
                                </div>
                            </form>
                            <hr />
                            <select
                                defaultValue={i18n.language}
                                onChange={changeLanguages}
                            >
                                <option value={"de"}>Deutsch</option>
                                <option value={"ev"}>Edhelen</option>
                                <option value={"en"}>Englisch</option>
                            </select>
                            <hr />
                            <input
                                style={{ ...elvishLinkStyle, width: "200px" }}
                                type={"button"}
                                value={t(
                                    "profile.buttonDeleteAccount"
                                ).toString()}
                                onClick={() => {
                                    deleteAccount();
                                }}
                            />
                        </div>
                        <hr />
                        <h3>{t("profile.quizHeader")}</h3>
                        {!isMounted ? (
                            <input
                                style={{ ...elvishLinkStyle, width: "300px" }}
                                type={"button"}
                                value={t("profile.buttonQuiz").toString()}
                                onClick={() => setIsMounted(true)}
                            />
                        ) : null}
                        {isMounted && <QuizMaster />}
                    </div>
                </Box>
                <Box
                    sx={{
                        p: 0
                    }}
                />
            </Box>
            <>
                <br />
            </>
        </div>
    );
}

export default Profile;
