import React from 'react';
import { ListItem} from "@rneui/base";
import { FlatList } from 'react-native';
import { useDispatch } from 'react-redux';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {NavigationProp  } from "@react-navigation/native";

import { horoscopeActions,rootStore } from "@ujjwal-rn-monorepo/store";
import { ZodiacSignList,ZodiacSignInterface } from "@ujjwal-rn-monorepo/models";

interface Props{
  navigation:NavigationProp<any,any>;
}

export const ZodiacSignListApp:React.FC<Props>=({navigation})=> {
   type AppDispatch = typeof rootStore.dispatch;
  
  const dispatch = useDispatch<AppDispatch>();

  const keyExtractor = (item: ZodiacSignInterface) => item.zodiacSign;
  return (
    <FlatList
      keyExtractor={keyExtractor}
      data={ZodiacSignList}
      renderItem={({ item }) => (
        <ListItem bottomDivider
          onPress={()=>{
            navigation.navigate('Horoscope Card')
            dispatch(horoscopeActions.setUserZodiacSignItem(item))
            }}>
            <Icon name={item.icon} size={20}/>
            <ListItem.Content>
              <ListItem.Title>{item.zodiacSign}</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        )}
    />
  );
}
export default ZodiacSignListApp;
