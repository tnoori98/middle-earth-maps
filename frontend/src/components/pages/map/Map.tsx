import {
    ImageOverlay,
    MapContainer,
    Pane,
    TileLayer,
    useMapEvent
} from "react-leaflet";
import L from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Checkbox } from "@material-ui/core";
import { weatherApi } from "../../../services/api/WeatherApi";
import "./Map.css";
import { useTranslation } from "react-i18next";
import Timeline from "@mui/lab/Timeline";
import {
    TimelineConnector,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@mui/lab";
import { useGetWeatherQuery } from "../../../config/api";
import { Provider } from "react-redux";

interface Weather {
    weatherData: WeatherData;
    fetchTime: number;
}

interface WeatherData {
    celsius: number;
    fahrenheit: number;
    windspeed: number;
}

function MyComponent() {
    const [showMordor, setShowMordor] = useState(false);

    const map = useMapEvent("zoom", (ev) => {
        setShowMordor(false);
        switch (ev.target.getZoom()) {
            case 1:
                break;
            case 2:
                break;
            case 3:
                setShowMordor(true);
                break;
            default:
                setShowMordor(true);
        }
    });

    return showMordor ? (
        <>
            <ImageOverlay
                bounds={[
                    [-30, 52],
                    [-70, 90]
                ]}
                url={"/map/mordor.svg"}
            />
        </>
    ) : null;
}

function Map() {
    const { t } = useTranslation(["main"]);

    const [hobbitRoute, setHobbitRoute] = useState(false);
    const [dwarfRoute, setDwarfRoute] = useState(false);
    const [sideHobbitRoute, setSideHobbitRoute] = useState(false);

    const weather = weatherApi();

    //ToDo: Refactor to RTK Query
    // const {data, error, isLoading} = useGetWeatherQuery();
    //
    // console.log(data);
    //
    // useEffect(() => {
    //     if (!isLoading && !error) {
    //         //works!
    //     }
    // }, [data, error, isLoading]);

    const [shire, setShire] = useState({
        celsius: 0,
        fahrenheit: 0,
        windspeed: 0
    } as WeatherData);

    useEffect(() => {
        if (
            localStorage.getItem("shire") !== null &&
            localStorage.getItem("gondor") !== null &&
            localStorage.getItem("rohan") !== null &&
            localStorage.getItem("mordor") !== null
        ) {
            const shire = JSON.parse(localStorage.getItem("shire")!) as Weather;

            //Fetchtime > 10 minutes smaller than actual time then fetch weather again
            if (shire.fetchTime + 1000 * 60 * 10 < new Date().getTime()) {
                getWeather();
            } else {
                setShire(shire.weatherData);
            }
        } else {
            getWeather();
        }
    }, []);

    async function getWeather() {
        await weather
            .weather()
            .then((res) => {
                console.log(res.data);
                const weatherData = {
                    celsius: res.data.current.temperature_2m,
                    fahrenheit: res.data.current.temperature_2m * 9/5 + 32,
                    windspeed: res.data.current.wind_speed_10m
                } as WeatherData;
                localStorage.setItem(
                    "shire",
                    JSON.stringify({
                        weatherData,
                        fetchTime: new Date().getTime()
                    } as Weather)
                );
                setShire(weatherData);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function onHobbitRouteClick() {
        setHobbitRoute(!hobbitRoute);
    }

    function onLegolasGimliRouteClick() {
        setDwarfRoute(!dwarfRoute);
    }

    function onLMerryPippinRouteClick() {
        setSideHobbitRoute(!sideHobbitRoute);
    }

    const [timeLineFrodoOne, setTimeLineFrodoOne] = useState(false);
    const [timeLineFrodoTwo, setTimeLineFrodoTwo] = useState(false);
    const [timeLineFrodoThree, setTimeLineFrodoThree] = useState(false);
    const [timeLineGimliOne, setTimeLineGimliOne] = useState(false);
    const [timeLineGimliTwo, setTimeLineGimliTwo] = useState(false);
    const [timeLineGimliThree, setTimeLineGimliThree] = useState(false);

    const mapRef = useRef<L.Map>();

    function loadTimeline() {
        openTimeline();

        setTimeout(() => {
            setTimeLineFrodoOne(true);
            mapRef.current?.flyTo(
                {
                    lat: 60,
                    lng: -70
                },
                3
            );
            setTimeout(() => {
                setTimeLineGimliOne(true);
                mapRef.current?.flyTo(
                    {
                        lat: 30,
                        lng: 30
                    },
                    3
                );
                setTimeout(() => {
                    setTimeLineFrodoTwo(true);
                    mapRef.current?.flyTo(
                        {
                            lat: 40,
                            lng: 40
                        },
                        3
                    );
                }, 2000);
                setTimeout(() => {
                    setTimeLineGimliTwo(true);
                    mapRef.current?.flyTo(
                        {
                            lat: 60,
                            lng: 30
                        },
                        3
                    );
                    setTimeout(() => {
                        setTimeLineFrodoThree(true);
                        mapRef.current?.flyTo(
                            {
                                lat: 20,
                                lng: 20
                            },
                            3
                        );
                        setTimeout(() => {
                            setTimeLineGimliThree(true);
                            mapRef.current?.flyTo(
                                {
                                    lat: -50,
                                    lng: 50
                                },
                                3
                            );
                        }, 2000);
                    }, 2000);
                }, 2000);
            }, 2000);
        }, 100);
    }

    function openTimeline() {
        document.getElementById("sidenav")!.style.width = "250px";
    }

    function closeTimeline() {
        document.getElementById("sidenav")!.style.width = "0px";
        setTimeLineGimliOne(false);
        setTimeLineGimliTwo(false);
        setTimeLineGimliThree(false);
        setTimeLineFrodoOne(false);
        setTimeLineFrodoTwo(false);
        setTimeLineFrodoThree(false);
    }

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
        <div style={{ textAlign: "center" }} className={"main-container"}>
            <p>{t("map.pathsOf")}</p>
            <label>
                <Checkbox onClick={() => onHobbitRouteClick()} />
                Frodo & Sam
            </label>
            <label>
                <Checkbox onClick={() => onLegolasGimliRouteClick()} />
                Legolas & Gimli
            </label>
            <label>
                <Checkbox onClick={() => onLMerryPippinRouteClick()} />
                Merry & Pippin
            </label>
            <div
                style={{
                    margin: "0 auto",
                    width: "800px",
                    height: "500px",
                    textAlign: "center"
                }}
            >
                <MapContainer
                    center={[1, 1]}
                    zoom={1}
                    maxZoom={4}
                    minZoom={1}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%" }}
                    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-ignore
                    ref={mapRef}
                >
                    <MyComponent />
                    {hobbitRoute && (
                        <Pane name={"frodoSam"}>
                            <ImageOverlay
                                bounds={[
                                    [-200, -100],
                                    [100, 100]
                                ]}
                                url={"/map/frodo-sam-path.svg"}
                            />
                            {timeLineFrodoOne && (
                                <ImageOverlay
                                    bounds={[
                                        [-200, -100],
                                        [100, 100]
                                    ]}
                                    url={"/map/frodo-sam-path-timeline-one.svg"}
                                />
                            )}
                            {timeLineFrodoTwo && (
                                <ImageOverlay
                                    bounds={[
                                        [-200, -100],
                                        [100, 100]
                                    ]}
                                    url={"/map/frodo-sam-path-timeline-two.svg"}
                                />
                            )}
                            {timeLineFrodoThree && (
                                <ImageOverlay
                                    bounds={[
                                        [-200, -100],
                                        [100, 100]
                                    ]}
                                    url={
                                        "/map/frodo-sam-path-timeline-three.svg"
                                    }
                                />
                            )}
                        </Pane>
                    )}
                    {sideHobbitRoute && (
                        <ImageOverlay
                            bounds={[
                                [-200, -100],
                                [100, 100]
                            ]}
                            url={"/map/merry-pippin-path.svg"}
                        />
                    )}
                    {dwarfRoute && (
                        <Pane name={"legolasGimli"}>
                            <ImageOverlay
                                bounds={[
                                    [-200, -100],
                                    [100, 100]
                                ]}
                                url={"/map/legolas-gimli-path.svg"}
                            />
                            {timeLineGimliOne && (
                                <ImageOverlay
                                    bounds={[
                                        [-200, -100],
                                        [100, 100]
                                    ]}
                                    url={
                                        "/map/legolas-gimli-path-timeline-one.svg"
                                    }
                                />
                            )}
                            {timeLineGimliTwo && (
                                <ImageOverlay
                                    bounds={[
                                        [-200, -100],
                                        [100, 100]
                                    ]}
                                    url={
                                        "/map/legolas-gimli-path-timeline-two.svg"
                                    }
                                />
                            )}
                            {timeLineGimliThree && (
                                <ImageOverlay
                                    bounds={[
                                        [-200, -100],
                                        [100, 100]
                                    ]}
                                    url={
                                        "/map/legolas-gimli-path-timeline-three.svg"
                                    }
                                />
                            )}
                        </Pane>
                    )}
                    <TileLayer noWrap={true} url="/tiles/{z}/{x}/{y}.jpg" />
                </MapContainer>
                <hr />
                <div>
                    <input
                        style={{ ...elvishLinkStyle }}
                        type={"submit"}
                        value={t("map.visualizeTimeline").toString()}
                        onClick={loadTimeline}
                    />
                </div>
                <hr />
                <div className={"weatherDiv"}>
                    <label>
                        <a style={{ color: "white" }}>
                            {t("map.shire")} {shire.celsius}°C |{" "}
                            {shire.fahrenheit}°F | {shire.windspeed} km/h
                        </a>
                    </label>
                </div>
                <div id={"sidenav"} className={"sidenav"}>
                    <a
                        href="javascript:void(0)"
                        className="closebtn"
                        onClick={closeTimeline}
                    >
                        &times;
                    </a>
                    <div style={{ marginBottom: "20px" }} />

                    <Timeline position="alternate">
                        {timeLineFrodoOne && (
                            <TimelineItem>
                                <TimelineOppositeContent sx={{ m: "auto 0" }}>
                                    {t("timeline.samFrodoOne")}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                            </TimelineItem>
                        )}
                        {timeLineGimliOne && (
                            <TimelineItem>
                                <TimelineOppositeContent sx={{ m: "auto 0" }}>
                                    {t("timeline.legolasGimliOne")}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                            </TimelineItem>
                        )}
                        {timeLineFrodoTwo && (
                            <TimelineItem>
                                <TimelineOppositeContent sx={{ m: "auto 0" }}>
                                    {t("timeline.samFrodoTwo")}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                            </TimelineItem>
                        )}
                        {timeLineGimliTwo && (
                            <TimelineItem>
                                <TimelineOppositeContent sx={{ m: "auto 0" }}>
                                    {t("timeline.legolasGimliTwo")}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                            </TimelineItem>
                        )}
                        {timeLineFrodoThree && (
                            <TimelineItem>
                                <TimelineOppositeContent sx={{ m: "auto 0" }}>
                                    {t("timeline.samFrodoThree")}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                            </TimelineItem>
                        )}
                        {timeLineGimliThree && (
                            <TimelineItem>
                                <TimelineOppositeContent sx={{ m: "auto 0" }}>
                                    {t("timeline.legolasGimliThree")}
                                </TimelineOppositeContent>
                                <TimelineSeparator>
                                    <TimelineConnector />
                                    <TimelineDot />
                                    <TimelineConnector />
                                </TimelineSeparator>
                            </TimelineItem>
                        )}
                    </Timeline>
                </div>
            </div>
        </div>
    );
}

export default Map;
