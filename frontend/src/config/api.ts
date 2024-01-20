import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {WeatherResponseDto} from "../interfaces/weather/response/weather-response.dto";

const { REACT_APP_BASE_URL } = process.env;
export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({baseUrl: `${REACT_APP_BASE_URL}/api/weather`}),
    tagTypes: ["Weather"],
    endpoints: (builder) => ({
        getWeather: builder.query<WeatherResponseDto[], void>({
            query: () => "weather",
            providesTags: ["Weather"]
        }),
    })
});

export const {useGetWeatherQuery} = api;
