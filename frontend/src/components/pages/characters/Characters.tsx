import "./Characters.css";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import HTMLFlipBook from "react-pageflip";
import {theOneApi} from "../../../services/api/TheOneApi";

interface Character {
    character: any,
    fetchTime: number
}

function Characters() {
    const defaultTheOneApi = theOneApi();
    const [characterResponse, setCharacterResponse] = useState<Character[]>();

    useEffect(() => {
        async function fetchCharacters() {
            const response = await defaultTheOneApi.characters();
            const character: Character = {
                character: response.data.docs,
                fetchTime: new Date().getTime()
            };
            localStorage.setItem("characters", JSON.stringify(character));
            setCharacterResponse(character.character);
        }

        if (localStorage.getItem("character") !== null) {
            const character = JSON.parse(localStorage.getItem("character")!) as Character;

            //Wenn Fetchzeit + 10 Minuten kleiner als jetzige Zeit ist, fetch Characters
            if (character.fetchTime + 1000 * 60 * 10 < new Date().getTime()) {
                fetchCharacters();
            } else {
                setCharacterResponse(character.character);
            }
        } else {
            fetchCharacters();
        }
    }, []);

    const {t, i18n} = useTranslation(["main"]);

    return (
            <div>
                <HTMLFlipBook width={600} height={800} autoSize className={"book-container"} clickEventForward={false}
                              disableFlipByClick drawShadow={true} flippingTime={1} maxHeight={10}
                              maxShadowOpacity={1} maxWidth={10} minHeight={2} minWidth={10} mobileScrollSupport
                              showCover={false} showPageCorners size={"fixed"} startPage={0} startZIndex={1} style={{justifyContent: "center"}}
                              swipeDistance={10} useMouseEvents usePortrait={false}>
                    {characterResponse?.map((character: any, index: number) => (
                        <div key={index} className={"main-container"}>
                        <div key={index} className="book-current-page">
                            <div className="book-separator"/>
                            {character.name} <br/>
                            <img
                                src={require("../../../img/characters/" + character.name.toLowerCase() + ".svg")}
                                className="icon"
                                style={{ width: "100px" }}
                                alt={"The character " + character.name}
                            />
                            <br/>
                            Date of birth: {character.birth} <br/>
                            Status: {character.death} <br/>
                            Fraction: {character.race} <br/>
                            Hair color: {character.hair} <br/>
                            Gender: {character.gender}
                        </div></div>))
                    }
                </HTMLFlipBook>
        </div>
    );
}

export default Characters;
