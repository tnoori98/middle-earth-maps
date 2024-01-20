import { Link } from "react-router-dom";
import "../../css/App.css";
import React from "react";
import { useTranslation } from "react-i18next";

function Home() {
    const {t} = useTranslation(["main"]);

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
            <div className="text-center bg-image marginUp">
                <br />
                <h1>{t("main.label")}</h1>
                <p>{t("main.sublabel")}</p>
                <Link to="../map" className="btn btn-primary App" style={{...elvishLinkStyle}}>
                    {t("main.button")}
                </Link>
            </div>
        </div>
    );
}

export default Home;
