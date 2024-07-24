/*import React, { useEffect, useState } from 'react';
import { Button, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import messaging from '@react-native-firebase/messaging';
import { registerRootComponent } from 'expo';
registerRootComponent(App);


async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default function App() {
  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <Button
      title="Press to send notification"
      onPress={async () => {
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: 'ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]',
            sound: 'default',
            title: 'Original Title',
            body: 'And here is the body!',
            data: { someData: 'goes here' },
          }),
        });
      }}
    />
  );
}


//--------------------------------------------------------------------------------------

*/import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Login from './pages/Login';
import Home from './pages/Home';
import MarcarPonto from './pages/MarcarPonto';
import QrCode from './pages/QRCode';
import { Image, View } from 'react-native';
import FichaPessoal from './pages/FichaPessoal';
import Atividades from './pages/Atividades';
import Atividade from './pages/Atividade';
import CampeonatoQuadra from './pages/CampeonatoQuadra';
import CampeonatoPatio from './pages/CampeonatoPatio';
import Oficinas from './pages/Oficinas';
import Ranking from './pages/Ranking';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabNavigator() {
  const [show, setShow] = React.useState(false);

  const handleGetAjudantes = async () => {
    const attcodigo = await AsyncStorage.getItem("atividadeCodigo");
    const campcodigo = await AsyncStorage.getItem("campeonatoCodigo");

    setShow(attcodigo || campcodigo);
  };

  React.useEffect(() => {
    handleGetAjudantes();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName='Home'      
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            return <Image source={require('./assets/home.png')}  />;
          } else if (route.name === 'QrCode') {
            return <Image source={require('./assets/qrCode.png')} />;
          } else if (route.name === 'FichaPessoal2') {
            return <Image source={require('./assets/ficha.png')} />;
          }
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#fff' }, // Estilo do tab bar
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <Tab.Screen name="QrCode" component={QrCode} options={{ headerShown: false }} />

      <Tab.Screen name="FichaPessoal2" component={FichaPessoal} options={{ headerShown: false }} />

    </Tab.Navigator>
  );
}

function App() {
  return (    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Logado" component={MainTabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="FichaPessoal" component={FichaPessoal} options={{ headerShown: false }} />
        <Stack.Screen name="Atividades" component={Atividades} options={{ headerShown: false }} />
        <Stack.Screen name="Atividade" component={Atividade} options={{ headerShown: false }} />
        <Stack.Screen name="CampeonatoQuadra" component={CampeonatoQuadra} options={{ headerShown: false }} />
        <Stack.Screen name="CampeonatoPatio" component={CampeonatoPatio} options={{ headerShown: false }} />
        <Stack.Screen name="Oficinas" component={Oficinas} options={{ headerShown: false }} />
        <Stack.Screen name="Ranking" component={Ranking} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>    
  );
}

export default App;
