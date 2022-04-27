import { RootState  } from "./rootState.interface";
import { initialHoroscopeState } from "../horoscope.slice";

export const initialRootState: RootState={
    horoscope:initialHoroscopeState
}