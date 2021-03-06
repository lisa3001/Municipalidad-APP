
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TextInput, Pressable
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LongIn  from './Components/logIn.js';
import Registro1  from './Components/registro1.js';
import Registro2  from './Components/registro2.js';
import Registro3  from './Components/registro3.js';
import Inicio  from './Components/inicio.js';
import MiPerfil  from './Components/miperfil.js';
import NuevaContrasenia  from './Components/NuevaContrasenia.js';
import VerInfo1  from './Components/verInfo1.js';
import VerInfo2  from './Components/verInfo2.js';

const Stack = createStackNavigator();

export default function App() {

  return (
    <View style={styles.container}>
      <NavigationContainer >
        <Stack.Navigator  initialRouteName="LogIn" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Registro1" component={Registro1} />
          <Stack.Screen name="Registro2" component={Registro2} />
          <Stack.Screen name="Registro3" component={Registro3} />
          <Stack.Screen name="LogIn" component={LongIn} />
          <Stack.Screen name="Inicio" component={Inicio} />
          <Stack.Screen name="MiPerfil" component={MiPerfil} />
          <Stack.Screen name="NuevaContrasenia" component={NuevaContrasenia} />
          <Stack.Screen name="VerInfo1" component={VerInfo1} />
          <Stack.Screen name="VerInfo2" component={VerInfo2} />
        </Stack.Navigator>
      </NavigationContainer>
    </View> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: "white"
  }
});
