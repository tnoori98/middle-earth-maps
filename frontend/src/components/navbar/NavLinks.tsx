import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { authenticationApi } from "../../services/api/AuthenticationApi";
import { useTranslation } from "react-i18next";

function NavLinks() {
    const navigate = useNavigate();
    const currentPage = useLocation();
    const logout = async () => {
        await authenticationApi()
            .logout()
            .then(() => {
                localStorage.removeItem("jwt");
                navigate("/");
            })
            .catch((exception) => console.log(exception));
    };

    const { t } = useTranslation(["main"]);

    return (
        <ul className="center">
            <li>
                <Link className="navbar-brand boldText" to="/">
                    {t("nav.home")}
                </Link>
            </li>
            <li>
                <Link
                    className={
                        currentPage.pathname.includes("/map")
                            ? "navbar-brand boldText currentPageHighlight"
                            : "navbar-brand boldText"
                    }
                    to="/map"
                >
                    {t("nav.map")}
                </Link>
            </li>
            <li>
                <Link
                    className={
                        currentPage.pathname.includes("/about")
                            ? "navbar-brand boldText currentPageHighlight"
                            : "navbar-brand boldText"
                    }
                    to="/about/us"
                >
                    {t("nav.about")}
                </Link>
            </li>
            {localStorage.getItem("jwt") != null ? (
                <li>
                    <Link
                        className={
                            currentPage.pathname.includes("/characters")
                                ? "navbar-brand boldText currentPageHighlight"
                                : "navbar-brand boldText"
                        }
                        to="/characters"
                    >
                        {t("nav.characters")}
                    </Link>
                </li>
            ) : null}
            {localStorage.getItem("jwt") != null ? (
                <li>
                    <Link
                        className={
                            currentPage.pathname.includes("/profile")
                                ? "navbar-brand boldText currentPageHighlight"
                                : "navbar-brand boldText"
                        }
                        to="/profile"
                    >
                        {t("nav.profile")}
                    </Link>
                </li>
            ) : null}
            {localStorage.getItem("jwt") != null ? (
                <li>
                    <Link
                        className={
                            currentPage.pathname.includes("/fraction")
                                ? "navbar-brand boldText currentPageHighlight"
                                : "navbar-brand boldText"
                        }
                        to="/fraction"
                    >
                        {t("nav.fraction")}
                    </Link>
                </li>
            ) : null}
            {localStorage.getItem("jwt") != null ? (
                <li>
                    <Link
                        className={
                            currentPage.pathname.includes("/tweets")
                                ? "navbar-brand boldText currentPageHighlight"
                                : "navbar-brand boldText"
                        }
                        to="/tweets"
                    >
                        {t("nav.tweets")}
                    </Link>
                </li>
            ) : null}
            {localStorage.getItem("jwt") != null ? (
                <li>
                    <Link
                        className="navbar-brand boldText"
                        to="/"
                        onClick={() => {
                            logout();
                        }}
                    >
                        {t("nav.logout")}
                    </Link>
                </li>
            ) : (
                <li>
                    <Link
                        className={
                            currentPage.pathname.includes("/login")
                                ? "navbar-brand boldText currentPageHighlight"
                                : "navbar-brand boldText"
                        }
                        to="/login"
                    >
                        Login
                    </Link>
                </li>
            )}
        </ul>
    );
}

export default NavLinks;
