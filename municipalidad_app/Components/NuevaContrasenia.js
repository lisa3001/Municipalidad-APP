import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TextInput, Pressable, Alert
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NuevaContrasenia({ navigation }) {


  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPass2, setNewPass2] = useState("");

  const[actual, setActual] = useState("");
  const[userData, setUserData] = useState(null);

  const [oldPassErr, setOldPassErr] = useState("");
  const [newPassErr, setNewPassErr] = useState("");
  const [newPass2Err, setNewPass2Err] = useState("");

  const [errorMess1, setErrorMess1] = useState("Debes llenar todos los espacios");
  const [errorMess2, setErrorMess2] = useState("Debes llenar todos los espacios");
  const [errorMess3, setErrorMess3] = useState("Debes llenar todos los espacios");

  const [hidePass, setHidePass] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const [hidePass3, setHidePass3] = useState(true);


  useEffect(() => {
    LoadActualPass();  
  },[]);

  const mostrarAlerta = () =>
    Alert.alert(
        "Contraseña Modificada",
        "Tu contraseña ha sido modificada",
        [
        { text: "OK"}
        ],
    { cancelable: false }
  );

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@session', jsonValue);
      setOldPass("");
      setNewPass("");
      setNewPass2("");
      mostrarAlerta();
      
    } catch (e) {
      console.log(e);
    }
  }

  const validateEntry = (e, id) =>{
    var flag = 0;
    if(id === "pass1"){
      if(oldPass === ""){
        setErrorMess1("Por favor ingresa una contraseña");
        flag = 1;
      }
      if (flag === 0) setOldPassErr(false);
      if (flag === 1) setOldPassErr(true);
    }
    else if(id === "pass2"){
        if(newPass === ""){
          setErrorMess2("Por favor ingresa una contraseña");
          flag = 1;
        }
        if (flag === 0) setNewPassErr(false);
        if (flag === 1) setNewPassErr(true);
      }
    else if(id === "pass3"){
        if(newPass2 === ""){
            setErrorMess3("Por favor ingresa una contraseña");
            flag = 1;
        }
        if (flag === 0) setNewPass2Err(false);
        if (flag === 1) setNewPass2Err(true);
      }
  }

  const LoadActualPass = async () =>{
    try {
      const jsonValue = await AsyncStorage.getItem('@session')
      var res = jsonValue != null ? JSON.parse(jsonValue) : null;
      if(res !== null) {
        setUserData(res);
        setActual(res.contrasenia);
      }
    } catch(e) {
      console.log(e);
    }
  }

  const updateData = (id) =>{
    (async () => {
        await axios
            .patch("http://192.168.0.18:8080/usuarios/" + id, userData)
            .then((response) => {
                storeData(response.data);
            })
            .catch((error) => {
            console.error("There was an error!", error);
            });
    })(); 
}

  const validatePass = (pass) =>{
    const regex = /\d/;
    const hasNumber = regex.test(pass);
    const hasLower = pass.toUpperCase() !== pass;
    const hasUpper = pass.toLowerCase() !== pass;
    if(hasNumber && hasLower && hasUpper && pass.length >= 8){
        return true;
    }
    else{
      return false;
    }
  }

  const validarDatos = () =>{
    if(!oldPassErr && !newPassErr && !newPass2Err){
        if(oldPass === actual){
            if(validatePass(newPass)){
                if(newPass === newPass2){
                    userData.contrasenia = newPass;
                    updateData(userData._id);
                }else{
                    setNewPass2Err(true);
                    setErrorMess3("Las contraseñas no coinciden");
                }
            }else{
                setNewPassErr(true);
                setErrorMess2("La contraseña debe tener mínimo 8 caracteres con números, mayúsculas y minúsculas");
            }
        }else{
            setOldPassErr(true);
            setErrorMess1("La contraseña ingresada no es correcta");
        }
    }
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
                <Text style={styles.backButton} title="Go back" onPress={() => navigation.goBack()}>Regresar</Text>
                <Text style={styles.title}>Nueva Contraseña</Text>
        </View>
      <ScrollView>
      <View style={styles.inputsRow}>
        <View style={oldPassErr ? styles.inputViewErr : styles.inputView}>
          <TextInput
            style={styles.passinput}
            placeholder="Contraseña actual"
            onChangeText={setOldPass}
            secureTextEntry={hidePass}
            value={oldPass}
            autoCorrect={false}
            onEndEditing={(e)=>{validateEntry(e, "pass1")}}
          />
          <Text style={styles.showText} onPress={()=>{setHidePass(!hidePass)}}>
           Mostrar
          </Text>
        </View>
        {oldPassErr ?
          <Text style={styles.errText} >
           {errorMess1}
          </Text>
          :null
        }
        <View style={newPassErr ? styles.inputViewErr : styles.inputView}>
          <TextInput
            style={styles.passinput}
            placeholder="Contraseña nueva"
            onChangeText={setNewPass}
            secureTextEntry={hidePass2}
            autoCorrect={false}
            value={newPass}
            onEndEditing={(e)=>{validateEntry(e, "pass2")}}
          />
          <Text style={styles.showText} onPress={()=>{setHidePass2(!hidePass2)}}>
           Mostrar
          </Text>
        </View>
        {newPassErr ?
          <Text style={styles.errText} >
           {errorMess2}
          </Text>
          :null
        }
        <View style={newPass2Err ? styles.inputViewErr : styles.inputView}>
          <TextInput
            style={styles.passinput}
            placeholder="Contraseña nueva confirmación"
            onChangeText={setNewPass2}
            secureTextEntry={hidePass3}
            autoCorrect={false}
            value={newPass2}
            onEndEditing={(e)=>{validateEntry(e, "pass3")}}
          />
          <Text style={styles.showText} onPress={()=>{setHidePass3(!hidePass3)}}>
           Mostrar
          </Text>
        </View>
        {newPass2Err ?
          <Text style={styles.errText} >
           {errorMess3}
          </Text>
          :null
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor:"white"
  },
  logoRow:{
    height: hp('45%'),
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputsRow:{
    flex: 1,
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hp('2%'),
    marginTop: hp('4%'),
  },
  logo:{
    height: hp('60%'),
    width: wp('60%'),
    resizeMode: 'contain',
    marginBottom: -30,
  },
  inputView:{
    flexDirection: "row",
    marginTop: hp('1.5%'),
    height: hp('7%'),
    width: wp('80%'),
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
    marginTop: hp('1.5%'),
    height: hp('7%'),
    width: wp('80%'),
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
  errText:{
    alignSelf:"flex-start",
    color:"red",
    marginLeft: hp('6%'),
    marginTop: hp('0.3%'),
    fontSize: 11,
  },
  showText:{
    width: wp('15%'),
    color:"#83b2ff",
    fontWeight: 'bold'

  },
  input: {
    height: 40,
    borderWidth: 0,
    width: wp('75%'),
  },
  passinput: {
    height: 40,
    borderWidth: 0,
    width: wp('60%'),
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