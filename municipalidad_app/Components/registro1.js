import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TextInput, Pressable,TouchableOpacity, TouchableHighlight 
} from 'react-native';
import Modal from 'react-native-modal';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function Registro1({ navigation }) {

    const [name, setName] = useState("");
    const [apellido, setApellido] = useState("");
    const [apellido2, setApellido2] = useState("");
    const [sexo, setSexo] = useState("");
    const [dateS, setDateS] = useState("");
    const [tipoIdent, setTipoIdent] = useState("");
    const [numeroIdent, setNumeroIdent] = useState("");


    const [nameErr, setNameErr] = useState(false);
    const [ap1Err, setAp1Err] = useState(false);
    const [ap2Err, setAp2Err] = useState(false);
    const [sexoErr, setSexoErr] = useState(false);
    const [dateErr, setDateErr] = useState(false);
    const [tipoIErr, setTipoIErr] = useState(false);
    const [numIErr, setNumIErr] = useState(false);
    const [errorMess, setErrorMes] = useState("No se permiten espacios en blanco");
    const [errorNum, setErrorNum] = useState("No se permiten espacios en blanco");

    const [showMS, setShowMS] = useState(false);
    const [modalOpt, setModalOpt] = useState("");
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2010, 5, 30));
    

    const elegirSexo = (tipo) =>{
        setSexo(tipo);
        setShowMS(false);
    }

    const elegirIdentificacion = (tipo) =>{
        setTipoIdent(tipo);
        setShowMS(false);
        var flag = 0;
        if(tipoIdent === "Cédula Nacional" && (numeroIdent.length !== 9)){
            flag = 1;
            setErrorNum("Formato incorrecto, recuerda usar 0 en vez de guiones");
        }
        else if(tipoIdent === "Dimex" && (numeroIdent.length !== 12)){
            flag = 1;
            setErrorNum("Formato incorrecto, recuerda que Dimex tiene 12 dígitos");
        }
        if (flag === 0) setNumIErr(false);
        if (flag === 1) setNumIErr(true);
    }

    const validateEntry = (e, id) =>{
        var flag = 0;
        if(id === "name"){
          if(name === "")flag = 1;
          if (flag === 0) setNameErr(false);
          if (flag === 1) setNameErr(true);
        }
        else if(id === "ap1"){
            if(apellido === "")flag = 1;
            if (flag === 0) setAp1Err(false);
            if (flag === 1) setAp1Err(true);
        }
        else if(id === "ap2"){
            if(apellido2 === "")flag = 1;
            if (flag === 0) setAp2Err(false);
            if (flag === 1) setAp2Err(true);
        }
        else if(id === "ident"){
            if(numeroIdent === ""){
                flag = 1;
                setErrorNum("No se permiten espacios en blanco");
            }
            else if(tipoIdent === "Cédula Nacional" && (numeroIdent.length !== 9)){
                flag = 1;
                setErrorNum("Formato incorrecto, recuerda usar 0 en vez de guiones");
            }
            else if(tipoIdent === "Dimex" && (numeroIdent.length !== 12)){
                console.log("enrrr");
                flag = 1;
                setErrorNum("Formato incorrecto, recuerda que Dimex tiene 12 dígitos");
            }
            if (flag === 0) setNumIErr(false);
            if (flag === 1) setNumIErr(true);
        }
    }

    function ShowModalOptions(props){
        if(props.tipo === "sexo" ){
            return (
                <View style={styles.modal}>
                <TouchableHighlight onPress={() => elegirSexo("Mujer")} style={{marginTop:4}}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Mujer</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => elegirSexo("Hombre")} style={{marginTop: hp('1%'),}}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Hombre</Text>
                    </View>
                </TouchableHighlight>    
                </View>
            );
        }else{
            return (
                <View style={styles.modal}>
                <TouchableHighlight onPress={() => elegirIdentificacion("Cédula Nacional")} style={{marginTop:4}}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Cédula Nacional</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={() => elegirIdentificacion("Dimex")} style={{marginTop: hp('1%'),}}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Dimex</Text>
                    </View>
                </TouchableHighlight> 
                <TouchableHighlight onPress={() => elegirIdentificacion("Pasaporte")} style={{marginTop: hp('1%'),}}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Pasaporte</Text>
                    </View>
                </TouchableHighlight> 
                <TouchableHighlight onPress={() => elegirIdentificacion("Otro")} style={{marginTop: hp('1%'),}}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Otro</Text>
                    </View>
                </TouchableHighlight>    
                </View>
            );
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        setDateS(currentDate.getDate() + "/" + (currentDate.getMonth() + 1) + "/" + currentDate.getFullYear());
    };

    return (
        <View style={styles.container}>
            {show && (
                <DateTimePicker
                testID="dateTimePicker"
                maximumDate={new Date(2010, 5, 30)}
                minimumDate={new Date(1900, 5, 30)}
                value={date}
                mode='date'
                is24Hour={true}
                display="default"
                onChange={onChange}
                />
            )}
            <Modal isVisible={showMS} onBackdropPress={() => setShowMS(false)} animationIn="zoomInUp" animationOut="zoomOut" animationOutTiming={900} animationInTiming={1400}>
                <ShowModalOptions tipo={modalOpt}></ShowModalOptions>
            </Modal>
            <View style={styles.header}>
                <Text style={styles.backButton} title="Go back" onPress={() => navigation.goBack()}>Regresar</Text>
                <Text style={styles.title}>Registro</Text>
            </View>
            <ScrollView>
            <View style={styles.inputsRow}>
                <View style={nameErr ? styles.inputViewErr : styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre"
                        autoCompleteType="name"
                        autoCapitalize="words"
                        onChangeText={setName}
                        onEndEditing={(e)=>{validateEntry(e, "name")}}
                    />
                </View>
                {nameErr &&
                    (<Text style={styles.errText} >
                    {errorMess}
                    </Text>)
                }
                <View style={ap1Err ? styles.inputViewErr : styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Primer apellido"
                        autoCompleteType="name"
                        autoCapitalize="words"
                        onChangeText={setApellido}
                        onEndEditing={(e)=>{validateEntry(e, "ap1")}}
                    />
                </View>
                {ap1Err &&
                    (<Text style={styles.errText} >
                    {errorMess}
                    </Text>)
                }
                <View style={ap2Err ? styles.inputViewErr : styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Segundo apellido"
                        autoCompleteType="name"
                        autoCapitalize="words"
                        onChangeText={setApellido2}
                        onEndEditing={(e)=>{validateEntry(e, "ap2")}}
                    />
                </View>
                {ap2Err &&
                    (<Text style={styles.errText} >
                    {errorMess}
                    </Text>)
                }
                <TouchableOpacity>
                    <Pressable  style={sexoErr ? styles.inputViewErr : styles.inputView} onPress={() => {setShowMS(true); setModalOpt("sexo");}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Sexo"
                        autoCompleteType="name"
                        autoCapitalize="words"
                        value={sexo}
                        editable={false}
                    /> 
                    </Pressable >
                </TouchableOpacity>
                {sexoErr &&
                    (<Text style={styles.errText} >
                    {errorMess}
                    </Text>)
                }
                <TouchableOpacity>
                    <Pressable  style={dateErr ? styles.inputViewErr : styles.inputView} onPress={() => {setShow(true)}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Fecha Nacimiento"
                        autoCompleteType="cc-exp"
                        autoCapitalize="words"
                        value={dateS}
                        editable={false}
                    /> 
                    </Pressable >
                </TouchableOpacity>
                {dateErr &&
                    (<Text style={styles.errText} >
                    {errorMess}
                    </Text>)
                }
                <TouchableOpacity>
                <Pressable  style={tipoIErr ? styles.inputViewErr : styles.inputView} onPress={() => {setShowMS(true); setModalOpt("identificacion");}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Tipo de Identificación"
                        autoCompleteType="name"
                        autoCapitalize="words"
                        value={tipoIdent}
                        editable={false}
                    /> 
                </Pressable >
                </TouchableOpacity>
                {tipoIErr &&
                    (<Text style={styles.errText} >
                    {errorMess}
                    </Text>)
                }
                <View style={numIErr ? styles.inputViewErr : styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Número de identificación"
                        onChangeText={setNumeroIdent}
                        onEndEditing={(e)=>{validateEntry(e, "ident")}}
                    />
                </View>
                {numIErr &&
                    (<Text style={styles.errText} >
                    
                    {errorNum}
                    </Text>)
                }
                <View style={styles.buttonsView}>
                    <Pressable style={styles.buttonsStyle} onPress={() => navigation.navigate('Registro2')}>
                        <Text style={styles.textButton}>Siguiente</Text>
                    </Pressable>
                </View>
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
        paddingTop:hp('0%'),
      },
      modal:{
          backgroundColor:"white",
          width: wp('90%'),
          borderRadius: 10,
          padding: 10,
          paddingRight: 10,
      },
      option:{
          backgroundColor:"white",
          height: hp('10%'),
          width: wp('84.5%'),
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
      }
      
  });