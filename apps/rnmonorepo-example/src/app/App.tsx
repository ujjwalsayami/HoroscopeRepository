/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import {
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { rootStore } from "@ujjwal-rn-monorepo/store";
import { ZodiacSignListApp,HoroscopeCard } from "@ujjwal-rn-monorepo/ui";

const Stack = createStackNavigator();

const App = () => {

  return (
    <Provider store={rootStore}>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Zodiac Sign List"
            component={ZodiacSignListApp}
          />
        <Stack.Screen name="Horoscope Card" component={HoroscopeCard} />
        </Stack.Navigator>
        
      </NavigationContainer>
    </Provider>
  );
};

export default App;
