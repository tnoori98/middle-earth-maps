import React from "react";
import { Link, useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import "../../../css/App.css";
import { authenticationApi } from "../../../services/api/AuthenticationApi";
import { showToast, showErrorToast } from "../../../helper/show-toast";
import { SubmitHandler, useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import { Button } from "rebass";

interface Login {
    username: string;
    password: string;
}

type LoginType = {
    username: string;
    password: string;
};

function Login() {
    const defaultUserApi = authenticationApi();
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm<LoginType>();
    const onSubmit: SubmitHandler<LoginType> = (data) => {
        submitHandler(data);
    };

    const submitHandler = async (data: LoginType) => {
        const loginData = data;

        await defaultUserApi
            .authenticate(loginData as Login)
            .then((response) => {
                showToast("Success");
                localStorage.setItem("jwt", response.data.jwt);
                setTimeout(() => window.location.reload(), 100);
                navigate("../map");
            })
            .catch((exception) => {
                showErrorToast("Invalid data");
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
            <div className={"bodyContainer"}>
                <div className={"bg-imageLogin"}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <h1 className={"App"}>Entrance to the Shire</h1>
                            <TextField
                                {...register("username", { required: true })}
                                label="Ring-bearer username"
                                style={{ width: "300px", marginBottom: "30px" }}
                                maxRows={1}
                                className={"middleContent"}
                            />
                            <br />
                            <TextField
                                {...register("password", { required: true })}
                                label="Secret word"
                                type="password"
                                style={{ width: "300px", marginBottom: "15px" }}
                                maxRows={1}
                                className={"middleContent"}
                            />
                            <br />
                            <button style={elvishLinkStyle} type={"submit"}>
                                Enter the Shire
                            </button>
                        </div>
                    </form>
                    <hr />
                    <div>
                        <Link
                            to="../register"
                            style={{ display: "inline-block" }}
                        >
                            <Button
                                style={{ ...elvishLinkStyle, width: "300px" }}
                            >
                                Join the Fellowship now
                            </Button>
                        </Link>
                    </div>
                    <hr />
                    <div>
                        <Link
                            to="../forgotPassword"
                            style={{ display: "inline-block" }}
                        >
                            <Button
                                style={{ ...elvishLinkStyle, width: "300px" }}
                            >
                                Forgotten the Precious?
                            </Button>
                        </Link>
                    </div>
                    <br />
                    <div style={{ marginBottom: "20px" }} />
                </div>
            </div>
        </div>
    );
}

export default Login;
