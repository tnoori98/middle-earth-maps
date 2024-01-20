import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import axios from "axios";
import "../../../css/App.css";
import { showErrorToast } from "../../../helper/show-toast";
import { ToastContainer } from "react-toastify";

interface PasswordRequestDto {
    password: string;
}

function ResetPassword() {
    const { id } = useParams();
    console.log("id", id);

    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState("");

    const isValidTextField = (input: string) => {
        return true;
    };

    const headers = {
        "Content-Type": "application/json",
        mode: "no-cors"
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (newPassword.length < 8) {
            showErrorToast("Password must be at least 8 characters long");
            return;
        }
        if (isValidTextField(e.target.value)) {
            console.log("Valid input! Submitting form...");
            console.log(id);
            submit();
        } else {
            console.log("Invalid Input! Not submitting form.");
        }
    };

    const handleChangeInput = (event: any) => {
        setNewPassword(event.target.value);
    };

    const submit = () => {
        const passwordRequestDto: PasswordRequestDto = {
            password: newPassword
        };

        axios
            .post(
                "http://localhost:8080/api/authentication/resetPassword/" + id,
                passwordRequestDto,
                {
                    headers: headers
                }
            )
            .then(() => {
                console.log("success");
                navigate("../login");
            })
            .catch((error) => {
                console.log(error);
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
        <div className="main-container">
            <div className={"toast-container"}>
                <ToastContainer />
            </div>
            <div className={"bg-imageLogin"}>
                <div className="form">
                    <h1 className="boldText">Reset Secret Word</h1>
                    <p className="smallText">Enter your precious secret here</p>
                    <TextField
                        name="password"
                        label="Secret word"
                        type={"password"}
                        onChange={(event) => handleChangeInput(event)}
                        style={{ width: "300px", marginBottom: "30px" }}
                        helperText={
                            !isValidTextField(newPassword)
                                ? "Must be a valid password!"
                                : ""
                        }
                        rowsMax={1}
                        className={"middleContent"}
                    />
                    <br />
                    <Link
                        to="../Home"
                        className="btn btn-primary middleContent"
                        style={{ ...elvishLinkStyle, width: "300px" }}
                        onClick={handleSubmit}
                    >
                        Reset secret word
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
