import { horoscopeInterface } from "@ujjwal-rn-monorepo/models";

export interface HoroscopeResponseInterface{
    date_range:string;
    current_date:string;
    description:string;
    compatibility:string;
    mood:string;
    color:string;
    lucky_number:string;
    lucky_time:string;
}

export function transformHoroscopeResponseToHoroscope(
    response:HoroscopeResponseInterface
):horoscopeInterface {
    return {
    currentDate:response.current_date,
    description:response.description,
    compatability:response.compatibility,
    mood:response.mood,
    color:response.color,
    luckyNumber:parseInt(response.lucky_number),
    luckyTime:response.lucky_time,
};
}