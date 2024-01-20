import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box } from "rebass";
import TextField from "@material-ui/core/TextField";
import "../../../css/App.css";
import { showErrorToast, showToast } from "../../../helper/show-toast";
import { authenticationApi } from "../../../services/api/AuthenticationApi";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";

interface Registration {
    username: string;
    email: string;
    password: string;
}

type RegistrationType = {
    username: string;
    email: string;
    password: string;
};

function Registration() {
    const defaultUserApi = authenticationApi();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<RegistrationType>();
    const onSubmit: SubmitHandler<RegistrationType> = (data) => {
        if (data.password.length < 8) {
            showErrorToast("Password must be at least 8 characters long");
            return;
        }
        if (data.username.length < 6) {
            showErrorToast("Username must be at least 6 characters long");
            return;
        }
        if (data.email.length < 10) {
            showErrorToast("Email must be at least 10 characters long");
            return;
        }
        submitHandler(data);
    };

    const submitHandler = async (data: RegistrationType) => {
        const registrationData = data;

        await defaultUserApi
            .registration(registrationData as Registration)
            .then((response) => {
                showToast("Success");
                setTimeout(() => navigate("../login"), 1500);
            })
            .catch((exception) => {
                showErrorToast("Error");
                console.log(exception);
            });
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
        <div className={"main-container"}>
            <div className={"toast-container"}>
                <ToastContainer />
            </div>
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
                        <div className={"bg-imageLogin"}>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form">
                                    <h1 className="boldText">
                                        Join the fellowship
                                    </h1>
                                    <TextField
                                        {...register("username", {
                                            required: true
                                        })}
                                        label="Ring-bearer username"
                                        style={{
                                            width: "300px",
                                            marginBottom: "30px"
                                        }}
                                        maxRows={1}
                                        className={"middleContent"}
                                        required
                                    />
                                    <br />
                                    <TextField
                                        {...register("email", {
                                            required: true
                                        })}
                                        label="Ring-bearer email"
                                        type="email"
                                        style={{
                                            width: "300px",
                                            marginBottom: "30px"
                                        }}
                                        maxRows={1}
                                        className={"middleContent"}
                                        required
                                    />
                                    <br />
                                    <TextField
                                        {...register("password", {
                                            required: true
                                        })}
                                        label="Secret word"
                                        type="password"
                                        style={{
                                            width: "300px",
                                            marginBottom: "15px"
                                        }}
                                        maxRows={1}
                                        className={"middleContent"}
                                        required
                                    />
                                    <br />
                                    <br />
                                    <input
                                        style={{
                                            ...elvishLinkStyle,
                                            width: "300px"
                                        }}
                                        type={"submit"}
                                        value={"Join the fellowship"}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </Box>
                <Box
                    sx={{
                        p: 0
                    }}
                />
            </Box>
        </div>
    );
}

export default Registration;
