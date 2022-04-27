import { HoroscopeResponseInterface } from "./horoscopeResponse.interface";
import {ZodiacSign,horoscopeDay  } from "@ujjwal-rn-monorepo/models";

async function getHoroscopeApiCall(
    zodiacSign:ZodiacSign,
    day:horoscopeDay
    ):Promise<HoroscopeResponseInterface> {
    const response = await fetch(
        `https://aztro.sameerkumar.website/?sign=${zodiacSign}&day=${day}`, 
        {
        method: 'POST',
        }
      );
      if(response.ok){
          return response.json();
      }
      throw response;
}

export const horoscopeService = {getHoroscopeApiCall};