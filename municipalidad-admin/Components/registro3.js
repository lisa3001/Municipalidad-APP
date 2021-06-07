import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TextInput, Pressable,TouchableOpacity, TouchableHighlight, FlatList 
} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Registro3({ navigation }) {

    const [userNameErr, setUserNameErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [errorMess, setErrorMess] = useState("Hay un error");
    const [errorMess2, setErrorMess2] = useState("Debes elegir un tipo de caso");
    const [errorMessPass, setErrorMessPass] = useState("Hay un error");
  
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [tipoCaso, setTipoCaso] = useState("");
    const [hidePass, setHidePass] = useState(true);
    const [casoErr, setCasoErr] = useState(false);

    const[showMS, setShowMS] = useState(false);


    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@session', jsonValue)
        navigation.navigate('Inicio');
      } catch (e) {
        console.log(e);
      }
    }

    const uploadData = (user) =>{
      (async () => {
          await axios
              .post("http://192.168.0.18:8080/usuarios/", user[0])
              .then((response) => {
                  storeData(response.data);
              })
              .catch((error) => {
              console.error("There was an error!", error);
              });
      })(); 
  }


    const loadData = async () =>{
      try {
        const jsonValue = await AsyncStorage.getItem('@register')
        var res = jsonValue != null ? JSON.parse(jsonValue) : null;
        if(res !== null) {
          res[0].correo = userName;
          res[0].contrasenia = password;
          res[0].tipoCasos = tipoCaso;
          uploadData(res);
        }
      } catch(e) {
        console.log(e);
      }
    }

    const validateCredentials = (user) => {
      if(user.length === 0){
        loadData();
      }else{
        setUserNameErr(true);
        setErrorMess("El correo ingresado ya se encuentra registrado");
      }
    }

    const getCredentials = (email) =>{
      (async () => {
        var user = await axios
            .get("http://192.168.0.18:8080/usuarios/credenciales/" + email)
            .then((response) => {
                validateCredentials(response.data);
            })
            .catch((error) => {
            console.error("There was an error!", error);
            validateCredentials([]);
            });
    })(); 
    }
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

    const validatePass = () =>{
      const regex = /\d/;
      const hasNumber = regex.test(password);
      const hasLower = password.toUpperCase() !== password;
      const hasUpper = password.toLowerCase() !== password;
      if(hasNumber && hasLower && hasUpper && password.length >= 8){
          return true;
      }
      else{
        return false;
      }
    }

    const elegirIdentificacion = (tipo) =>{
      //setTipoIErr(false);
      setTipoCaso(tipo);
      setShowMS(false);
  }

    const validarDatos = () => {
      var flag = 0;
      if( userName === "" || !userName.includes("@")){
          setUserNameErr(true);
          setErrorMess("Debes ingresar un correo");
          flag = 1
      }
      if(password === ""){
          setPassErr(true);
          setErrorMessPass("Debes ingresar una contraseña");
          flag=1;
      }
      if(tipoCaso === ""){
        setCasoErr(true);
        flag=1;
    }
      if(flag === 0){
        if(validatePass()){
          getCredentials(userName);
        }else{
          setPassErr(true);
          setErrorMessPass("La contraseña debe tener mínimo 8 caracteres con números, mayúsculas y minúsculas");
        }
      }
    }

    return (
        <View style={styles.container}>
          <Modal isVisible={showMS} onBackdropPress={() => setShowMS(false)} animationIn="zoomInUp" animationOut="zoomOut" animationOutTiming={900} animationInTiming={1400}>
          <View style={styles.modal}>
                <TouchableHighlight onPress={() => elegirIdentificacion("Limpieza")} style={{marginTop:4}}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Limpieza</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => elegirIdentificacion("Infraestructura")} style={{marginTop: hp('1%'),}}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Infraestructura</Text>
                    </View>
                </TouchableHighlight> 
                <TouchableHighlight onPress={() => elegirIdentificacion("Seguridad")} style={{marginTop: hp('1%'),}}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Seguridad</Text>
                    </View>
                </TouchableHighlight>  
                </View>
            </Modal>
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
          <TouchableOpacity>
                <Pressable  style={casoErr ? styles.inputViewErr : styles.inputView} onPress={() => {setShowMS(true);}}>
                <TextInput
                    style={styles.input}
                    placeholder="Tipo de casos a revisar"
                    autoCapitalize="words"
                    value={tipoCaso}
                    editable={false}
                /> 
                </Pressable >
            </TouchableOpacity>
            {casoErr &&
                (<Text style={styles.errText} >
                {errorMess2}
                </Text>)
            }
        </View>
        <View style={styles.buttonsView}>
        <Pressable style={styles.buttonsStyle} onPress={validarDatos}>
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