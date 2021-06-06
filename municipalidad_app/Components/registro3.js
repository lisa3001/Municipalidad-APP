import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TextInput, Pressable,TouchableOpacity, TouchableHighlight, FlatList 
} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';

export default function Registro3({ navigation }) {

    const [userNameErr, setUserNameErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [errorMess, setErrorMess] = useState("Hay un error");
    const [errorMessPass, setErrorMessPass] = useState("Hay un error");
  
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [hidePass, setHidePass] = useState(true);
  
    const validateEntry = (e, id) =>{
      var flag = 0;
      if(id === "user"){
        if(userName === ""){
          setErrorMess("Por favor ingresa un correo");
          flag = 1;
        }
        if(!userName.includes("@") && userName !== ""){
          setErrorMess("Por favor ingresa un correo válido");
          flag = 1;
        }
        if (flag === 0) setUserNameErr(false);
        if (flag === 1) setUserNameErr(true);
      }else{
        if(password === ""){
          setErrorMessPass("Por favor ingresa una contraseña");
          flag = 1
        }
        if (flag === 0) setPassErr(false);
        if (flag === 1) setPassErr(true);
      }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.backButton} title="Go back" onPress={() => navigation.goBack()}>Regresar</Text>
                <Text style={styles.title}>Registro</Text>
            </View>
            <ScrollView>
        <View style={styles.inputsRow}>
            <View style={ userNameErr ? styles.inputViewErr : styles.inputView}>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                autoCompleteType="email"
                keyboardType="email-address"
                onChangeText={setUserName}
                onEndEditing={(e)=>{validateEntry(e, "user")}}
            />
            </View>
            {userNameErr ?
            <Text style={styles.errText} >
            {errorMess}
            </Text>
            :null
            }
            <View style={passErr ? styles.inputViewErr : styles.inputView}>
            <TextInput
                style={styles.passinput}
                placeholder="Contraseña"
                onChangeText={setPassword}
                secureTextEntry={hidePass}
                autoCorrect={false}
                onEndEditing={(e)=>{validateEntry(e, "pass")}}
            />
            <Text style={styles.showText} onPress={()=>{setHidePass(!hidePass)}}>
            Mostrar
            </Text>
            </View>
            {passErr ?
            <Text style={styles.errText} >
            {errorMessPass}
            </Text>
            :null
            }
        </View>
        <View style={styles.buttonsView}>
        <Pressable style={styles.buttonsStyle}>
            <Text style={styles.textButton}>Guardar</Text>
        </Pressable>
        </View>
        </ScrollView>
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
    inputView:{
        flexDirection: "row",
        marginTop: hp('3%'),
        height: hp('7%'),
        width: wp('90%'),
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white",
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowRadius: 5,
        shadowOpacity: 4,
        elevation:6,
      },
      inputViewErr:{
        flexDirection: "row",
        marginTop: hp('2.5%'),
        height: hp('7%'),
        width: wp('90%'),
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:"white",
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowRadius: 5,
        shadowOpacity: 4,
        elevation:6,
        borderColor:"red",
        borderWidth:0.5,
      },
      input: {
        height: 40,
        borderWidth: 0,
        width: wp('80%'),
      },
      inputsRow:{
        flex: 1,
        width: wp('100%'),
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: hp('2%'),
        paddingTop:hp('20%'),
      },
      modal:{
          backgroundColor:"white",
          height: hp('60%'),
          width: wp('90%'),
          borderRadius: 10,
          padding: 10,
          paddingRight: 10,
          alignItems: 'center',
          justifyContent: 'center',
      },
      option:{
          backgroundColor:"white",
          height: hp('10%'),
          width: wp('77%'),
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 2,
          shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 10
        },
        shadowRadius: 5,
        shadowOpacity: 4,
        elevation:6,
      },
      optionText:{
        fontSize: 17,
        fontWeight: 'bold',
        color:"#83b2ff",
      },
      buttonsView:{
        width: wp('100%'),
        paddingBottom: hp('1%'),
        paddingTop: hp('2%'),
        alignItems: 'center',
        justifyContent: 'center',
      },
      buttonsStyle:{
        height: hp('7.5%'),
        borderRadius:4,
        width: wp('80%'),
        backgroundColor:"#83b2ff",
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: hp('1.5%'),
      },
      textButton:{
        color:"white",
        fontWeight: 'bold'
      },
      errText:{
        alignSelf:"flex-start",
        color:"red",
        marginLeft: hp('3.3%'),
        marginTop: hp('0.5%'),
        fontSize: 11,
      },
      showText:{
        width: wp('15%'),
        color:"#83b2ff",
        fontWeight: 'bold'
    
      },
      
  passinput: {
    height: 40,
    borderWidth: 0,
    width: wp('70%'),
  },
  });