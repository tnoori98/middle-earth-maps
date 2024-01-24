import React from "react";
import "./About.css";
import { useTranslation } from "react-i18next";
import {Link, useLocation} from "react-router-dom";
import {Box} from "rebass";

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
                        <p className={"text-center"}>{t("about.elves")}</p>
                    </>
                ) : (
                    <></>
                )}
                {currentPath === "/about/dwarf" ? (
                    <>
                        <p className={"text-center"}>{t("about.dwarves")}</p>
                    </>
                ) : (
                    <></>
                )}
                {currentPath === "/about/human" ? (
                    <>
                        <p className={"text-center"}>{t("about.humans")}</p>
                    </>
                ) : (
                    <></>
                )}
                {currentPath === "/about/orc" ? (
                    <>
                        <p className={"text-center"}>{t("about.orcs")}</p>
                    </>
                ) : (
                    <></>
                )}
                {currentPath === "/about/wizard" ? (
                    <>
                        <p className={"text-center"}>{t("about.wizards")}</p>
                    </>
                ) : (
                    <></>
                )}
                {currentPath === "/about/hobbit" ? (
                    <>
                        <p className={"text-center"}>
                            {t("about.hobbits")}
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
