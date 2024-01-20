import React from "react";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import "../../../css/App.css";

import { useState } from "react";
import axios from "axios";

interface EmailRequestDto {
    email: string;
}

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const isValidEmail = (input: string) => {
        return (
            input !== "" &&
            input.includes("@") &&
            !input.includes(" ") &&
            input.length > 4 &&
            input.includes(".")
        );
    };

    const headers = {
        "Content-Type": "application/json",
        mode: "no-cors"
    };

    const submit = () => {
        const emailRequestDto: EmailRequestDto = {
            email: email
        };

        axios
            .post(
                "http://localhost:8080/api/authentication/requestPasswordReset",
                emailRequestDto,
                {
                    headers: headers
                }
            )
            .then((result) => {
                console.log(result);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (isValidEmail(email)) {
            submit();
        } else {
            console.error("Invalid Input! Please try again.");
        }
    };

    const handleChangeInput = (event: any) => {
        setEmail(event.target.value);
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
            <form onSubmit={handleSubmit}>
                <div className={"bodyContainer"}>
                    <div className={"bg-imageLogin"}>
                        <div className="form">
                            <h1 className="boldText">Forgot the Precious?</h1>
                            <p className="smallText">
                                Enter your one email so Gandalf can reset <br />{" "}
                                your secret entrance word using magic.
                            </p>
                            <TextField
                                name="email"
                                label="Ring-bearer email"
                                onChange={(event) => handleChangeInput(event)}
                                style={{ width: "300px", marginBottom: "30px" }}
                                helperText={
                                    !isValidEmail(email)
                                        ? "Must be a valid ring-bearer email!"
                                        : ""
                                }
                                maxRows={1}
                                className={"middleContent"}
                            />

                            <br />

                            <Link
                                to="../Home"
                                className="btn btn-primary middleContent"
                                style={{ ...elvishLinkStyle, width: "300px" }}
                                onClick={handleSubmit}
                            >
                                Reset
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
