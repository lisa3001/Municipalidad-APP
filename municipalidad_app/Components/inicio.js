import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Inicio({ navigation }) {

    const logOut = async () => {
        try {
          await AsyncStorage.removeItem('@session');
          navigation.goBack();
        } catch (e) {
          console.log(e);
        }
      }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.backButton} title="Go back" onPress={logOut}>Regresar</Text>
                <Text style={styles.title}>Inicio</Text>
            </View>
        </View> 
      );
}

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: "white"
    },
    header:{
        height: hp('15%'),
        width: wp('100%'),
        backgroundColor:"#83b2ff",
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        paddingTop: 10,
        paddingLeft: 10,
        paddingBottom: 8,
    },
    backButton:{
        color:"white",
        fontSize: 15,
        fontWeight: 'bold'
    },
    title:{
        color:"white",
        fontWeight: 'bold',
        fontSize: 30,
        alignSelf:"center",
        marginTop: 13,
    },
  });