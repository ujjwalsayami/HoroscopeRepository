import React,{useEffect} from 'react';
import { Card,Text } from "@rneui/themed";
import { ScrollView, ActivityIndicator, } from "react-native";
import { useDispatch,useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { horoscopeActions ,rootStore, getUserHoroscope, getHororscopeLoadingStatus, getUserZodiacItem } from "@ujjwal-rn-monorepo/store";

/* eslint-disable-next-line */
export interface HoroscopeCardProps {}

export type AppDispatch = typeof rootStore.dispatch;
export const HoroscopeCard: React.FC<HoroscopeCardProps> = () => {
  const dispatch=useDispatch<AppDispatch>();
  const zodiacSign= useSelector(getUserZodiacItem);
  const horoscope = useSelector(getUserHoroscope);
  const loadingStatus = useSelector(getHororscopeLoadingStatus);


  useEffect(() => {
   // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   dispatch(horoscopeActions.fetchHoroscope({zodiacSign: zodiacSign?.zodiacSign, day:'today'}));
  }, [dispatch, zodiacSign])
  return (
    <ScrollView>
      <Card.Title>
        <Icon name={`${zodiacSign?.icon}`} size={40} />
      </Card.Title>
      <Card.Title>{zodiacSign?.zodiacSign}</Card.Title>
      <Card.Divider />
      <Text h4 style={{ width: '100%', textAlign: 'center' }}>
        Your Horoscope for Today
      </Text>
      {loadingStatus === 'loaded' ? (
            <>
              <Text style={{ marginTop: 10 }}>{horoscope?.description}</Text>
              <Text style={{ marginTop: 10 }}>Mood: {horoscope?.mood}</Text>
              <Text style={{ marginTop: 10 }}>Color: {horoscope?.color}</Text>
              <Text style={{ marginTop: 10 }}>
                Compatibility: {horoscope?.compatability}
              </Text>
              <Text style={{ marginTop: 10 }}>
                Lucky Number: {horoscope?.luckyNumber}
              </Text>
              <Text style={{ marginTop: 10 }}>
                Lucky Time: {horoscope?.luckyTime}
              </Text>
            </>
          ) : loadingStatus === 'error' ? (
            <Text h2>Oops! Something went wrong. Please try agian.</Text>
          ) : (
            <ActivityIndicator />
          )}
    </ScrollView>
  );
}
export default HoroscopeCard;
