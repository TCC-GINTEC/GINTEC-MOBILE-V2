import React from 'react';
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
          } else if (route.name === 'MarcarPonto') {
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

      <Tab.Screen name="MarcarPonto" component={MarcarPonto} />

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
      </Stack.Navigator>
    </NavigationContainer>    
  );
}

export default App;
