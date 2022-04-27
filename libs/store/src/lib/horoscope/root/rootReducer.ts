import { combineReducers } from "@reduxjs/toolkit";
import { horoscopeSlice } from "../horoscope.slice";
import { RootState } from "./rootState.interface";

export const rootReducer=combineReducers<RootState>({
    horoscope:horoscopeSlice.reducer
})