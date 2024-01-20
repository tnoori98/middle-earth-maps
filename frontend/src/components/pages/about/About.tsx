import React from "react";
import "./About.css";
import { useTranslation } from "react-i18next";
import {Link, useLocation} from "react-router-dom";

function About() {
    const currentPath = window.location.pathname;
    const { t } = useTranslation(["main"]);
    const currentPage = useLocation();
    return (
        <div className={"main-container"}>
            <div>
                {currentPath === "/about/us" ? (
                    <>
                        <h1>{t("about.header")}</h1>
                        <h4>{t("about.description")}</h4>
                        <div className="text-center columnUL">
                            <li>{t("about.list.item1")}</li>
                            <li>{t("about.list.item2")}</li>
                            <li>{t("about.list.item3")}</li>
                            <li>{t("about.list.item4")}</li>
                            <li>{t("about.list.item5")}</li>
                            <li>
                                <Link
                                    className={"main-container"}
                                    to={"/feedback"}
                                >
                                    Rate us!
                                </Link>
                            </li>
                        </div>
                    </>
                ) : (
                    <></>
                )}
                {currentPath === "/about/elf" ? (
                    <>
                        <h1> About you </h1>
                        <p className={"text-center"}>{t("about.elves")}</p>
                    </>
                ) : (
                    <></>
                )}
                {currentPath === "/about/dwarf" ? (
                    <>
                        <h1> About you </h1>
                        <p className={"text-center"}>{t("about.dwarves")}</p>
                    </>
                ) : (
                    <></>
                )}
                {currentPath === "/about/human" ? (
                    <>
                        <h1> About you </h1>
                        <p className={"text-center"}>{t("about.humans")}</p>
                    </>
                ) : (
                    <></>
                )}
                {currentPath === "/about/orc" ? (
                    <>
                        <h1> About you </h1>
                        <p className={"text-center"}>{t("about.orcs")}</p>
                    </>
                ) : (
                    <></>
                )}
                {currentPath === "/about/wizard" ? (
                    <>
                        <h1> About you </h1>{" "}
                        <p className={"text-center"}>{t("about.wizards")}</p>
                    </>
                ) : (
                    <></>
                )}
                {currentPath === "/about/hobbit" ? (
                    <>
                        <h1> About you </h1>
                        <p className={"text-center"}>
                            {t("about.hobbts")}
                        </p>{" "}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}

export default About;
