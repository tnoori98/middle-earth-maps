import {configureStore} from "@reduxjs/toolkit";
import {weatherReducer, weatherSlice} from "./slices/weather-slicer";
import {api} from "./api";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        weather: weatherReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
