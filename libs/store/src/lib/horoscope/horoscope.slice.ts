import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';

import {horoscopeService,transformHoroscopeResponseToHoroscope} from '@ujjwal-rn-monorepo/services';
import { horoscopeDay, horoscopeInterface, ZodiacSign, ZodiacSignInterface } from "@ujjwal-rn-monorepo/models";
import {RootState  } from "./root/rootState.interface";

export const HOROSCOPE_FEATURE_KEY = 'horoscope';

/*
 * Update these interfaces according to your requirements.
 */
export type LoadingStatus=  'not loaded' | 'loading' | 'loaded' | 'error';


export interface HoroscopeState {
  loadingStatus: LoadingStatus;
  error?: string;
  zodiacSignItem?: ZodiacSignInterface; //is the user's selected zodiac sign
  day?:horoscopeDay;
  horoscope?:horoscopeInterface; //transformed response from horoscopeService
}

/**
 * Export an effect using createAsyncThunk from
 * the Redux Toolkit: https://redux-toolkit.js.org/api/createAsyncThunk
 *
 * e.g.
 * ```
 * import React, { useEffect } from 'react';
 * import { useDispatch } from 'react-redux';
 *
 * // ...
 *
 * const dispatch = useDispatch();
 * useEffect(() => {
 *   dispatch(fetchHoroscope())
 * }, [dispatch]);
 * ```
 */
export const fetchHoroscope = createAsyncThunk<
horoscopeInterface,
{zodiacSign:ZodiacSign, day:horoscopeDay }
>('horoscope/fetchStatus',
  async ({zodiacSign,day},{rejectWithValue}) => {
    try {
      const horoscopeResponse = await horoscopeService.getHoroscopeApiCall(zodiacSign,day);
      return transformHoroscopeResponseToHoroscope(horoscopeResponse);
    } catch (error) {
      console.log({error},"RejectWithValue")
      return rejectWithValue({error})
    }
  }
);

export const initialHoroscopeState: HoroscopeState ={
    loadingStatus: 'not loaded',
  };

export const horoscopeSlice = createSlice({
  name: HOROSCOPE_FEATURE_KEY,
  initialState: initialHoroscopeState,
  reducers: {
    setUserZodiacSignItem(
      state:HoroscopeState,
      action:PayloadAction<ZodiacSignInterface>
    ){
      state.zodiacSignItem= action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHoroscope.pending, (state: HoroscopeState) => {
        state.loadingStatus = 'loading';
      })
      .addCase(
        fetchHoroscope.fulfilled,
        (state: HoroscopeState, action: PayloadAction<horoscopeInterface>) => {
          state.horoscope=action.payload;
          state.loadingStatus = 'loaded';
        }
      )
      .addCase(fetchHoroscope.rejected, (state: HoroscopeState, action) => {
        state.loadingStatus = 'error';
        console.log("on rejected",action)
        state.error = action.error.message;
      });
  },
});

/*
 * Export reducer for store configuration.
 */
export const horoscopeReducer = horoscopeSlice.reducer;

export const horoscopeActions = {fetchHoroscope, ...horoscopeSlice.actions};

export const getHoroscopeState = (rootState: RootState): HoroscopeState =>
  rootState[HOROSCOPE_FEATURE_KEY];

export const getUserZodiacItem=(rootState:RootState):ZodiacSignInterface | undefined=> getHoroscopeState(rootState).zodiacSignItem;
export const getUserZodiac=(rootState:RootState):ZodiacSign | undefined=>getUserZodiacItem(rootState)?.zodiacSign;

export const getUserHoroscope = (rootState:RootState):horoscopeInterface | undefined =>getHoroscopeState(rootState).horoscope;
export const getHororscopeLoadingStatus=(rootState:RootState):LoadingStatus=>getHoroscopeState(rootState).loadingStatus;

export const horoscopeSelectors = {getUserZodiac,getUserZodiacItem,getUserHoroscope,getHororscopeLoadingStatus};
