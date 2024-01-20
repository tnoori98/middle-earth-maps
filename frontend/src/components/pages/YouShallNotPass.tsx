import React from "react";

function YouShallNotPass() {
    return (
        <div className={"App"}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <iframe
                    allow="fullscreen"
                    frameBorder="0"
                    height="270"
                    src="https://giphy.com/embed/njYrp176NQsHS"
                    width="480"
                />
            </div>
        </div>
    );
}
export default YouShallNotPass;
