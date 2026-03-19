import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './pages/Login';
import Timeline from './pages/Timeline';
import New from './pages/New';

const Stack = createNativeStackNavigator();

export default function Routes() {
  const [loading, setLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState('Login');

  useEffect(() => {
    async function checkLogin() {
      const username = await AsyncStorage.getItem('@OmniStack:username');

      if (username) {
        setInitialRoute('Timeline');
      }

      setLoading(false);
    }

    checkLogin();
  }, []);

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Timeline"
          component={Timeline}
        />

        <Stack.Screen
          name="New"
          component={New}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}