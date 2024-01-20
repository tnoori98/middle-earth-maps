import { twitterApi } from "../../services/api/TwitterApi";
import React, { useEffect, useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

interface Tweets {
    id: string;
    text: string;
    createdAt: string;
}

interface Twitter {
    fetchTime: number,
    tweets: Tweets[]
}

function Tweets() {
    const defaultTwitterApi = twitterApi();
    const [twitterResponse, setTwitterResponse] = useState<Tweets[]>();

    useEffect(() => {
        async function fetchTweets() {
            const response = await defaultTwitterApi.tweets();
            const twitter: Twitter = {
                tweets: response.data.response.data,
                fetchTime: new Date().getTime()
            };
            localStorage.setItem("twitter", JSON.stringify(twitter));
            setTwitterResponse(response.data.response.data);
        }

        if(localStorage.getItem("twitter") !== null){
            const twitter = JSON.parse(localStorage.getItem("twitter")!) as Twitter;

            //Wenn Fetchzeit + 10 Minuten kleiner als jetzige Zeit ist, fetch Tweets
            if(twitter.fetchTime + 1000*60*10 < new Date().getTime()){
                fetchTweets();
            }
            else{
                setTwitterResponse(twitter.tweets);
            }
        }
        else{
            fetchTweets();
        }
    }, []);

    return (
        <div className={"main-container"}>
            <div>
                <h1>Tweets</h1>
                {twitterResponse?.map((tweet) => (
                    <>
                        <div
                            style={{
                                margin: "auto",
                                width: "80%",
                                height: "100%"
                            }}
                        >
                            <div
                                style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    display: "flex"
                                }}
                            >
                                <TwitterTweetEmbed tweetId={tweet.id} />
                            </div>
                        </div>
                        <hr />
                    </>
                ))}
            </div>
        </div>
    );
}
export default Tweets;
