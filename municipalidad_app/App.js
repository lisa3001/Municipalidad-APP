
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TextInput, Pressable
} from 'react-native';

export default function App() {

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
      <ScrollView>
      <View style={styles.logoRow}>
        <Image style={styles.logo} source={require('./assets/logo.png')} />
      </View>
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
        <Text style={styles.textButton}>Iniciar Sesión</Text>
      </Pressable>
      <Pressable style={styles.buttonsStyle}>
        <Text style={styles.textButton}>Registrarme</Text>
      </Pressable>
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
  },
  logoRow:{
    height: hp('50%'),
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
  },
  logo:{
    height: hp('60%'),
    width: wp('60%'),
    resizeMode: 'contain',
    marginBottom: -50,
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
  }

});
