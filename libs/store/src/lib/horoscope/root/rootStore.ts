import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { initialRootState } from "./rootState.initial";


const isDevelopment= process.env.NODE_ENV === 'development';

export const rootStore=configureStore({
    reducer:rootReducer,
    devTools:isDevelopment,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware(),
    preloadedState:initialRootState
})