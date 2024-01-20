import React from "react";
import ReactDOM from "react-dom";
import "./css/index.sss";
import App from "./App";
import { Toaster } from "react-hot-toast";
import "./i18n";

ReactDOM.render(
    <React.StrictMode>
        <App />
        <Toaster />
    </React.StrictMode>,
    document.getElementById("root")
);
