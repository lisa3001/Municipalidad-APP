
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TextInput, Pressable
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LongIn  from './Components/logIn.js';

const Stack = createStackNavigator();

export default function App() {

  return (
    <View style={styles.container}>
      <NavigationContainer >
        <Stack.Navigator  initialRouteName="LogIn" screenOptions={{headerShown: false}}>
          <Stack.Screen name="LogIn" component={LongIn} />
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
