import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WeatherResponseDto} from "../../interfaces/weather/response/weather-response.dto";
export interface WeatherState {
    weatherState: WeatherResponseDto[];
}

const weatherStateInitialState: WeatherState = {
    weatherState: []
};

export const weatherSlice = createSlice({
    name: "weather",
    initialState: weatherStateInitialState,
    reducers: {
        getWeather: (state: WeatherState, action: PayloadAction<WeatherResponseDto[]>) => {
            state.weatherState = action.payload;
        }
    }
});

export const {getWeather} = weatherSlice.actions;
export const weatherReducer = weatherSlice.reducer;
