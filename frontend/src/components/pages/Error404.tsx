import React from "react";

function Error404() {
    return (
        <div>
            <h1>Gandalf has no memory of this place - seems like 404!</h1>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <iframe
                    src="https://giphy.com/embed/FPjbHO0jJxGsE"
                    width="480"
                    height="270"
                    frameBorder="0"
                    className="giphy-embed"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

export default Error404;
