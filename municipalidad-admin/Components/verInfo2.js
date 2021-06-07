import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, StatusBar, ScrollView, TextInput, Pressable,TouchableOpacity, TouchableHighlight, FlatList, Alert 
} from 'react-native';
import Modal from 'react-native-modal';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VerInfo2({ navigation }) {

    const [paisNacimiento, setPaisNacimiento] = useState("");
    const [provincia, setProvincia] = useState([]);
    const [canton, setCanton] = useState([]);
    const [distrito, setDistrito] = useState([]);
    const [telefono, setTelefono] = useState("");
    const [telefonoS, setTelefonoS] = useState("");

    const [pNacimientoErr, setPNacimientoErr] = useState(false);
    const [provinciaErr, setProvinciaErr] = useState(false);
    const [cantonErr, setCantonErr] = useState(false);
    const [distritoErr, setDistritoErr] = useState(false);
    const [telefonoErr, setTelefonoErr] = useState(false);
    const [telefonoSErr, setTelefonoSErr] = useState(false);

    const [listaPaises, setListaPaises] = useState();
    const [listaProvincias, setListaProvincias] = useState();
    const [listaCantones, setListaCantones] = useState();
    const [listaDistritos, setListaDistritos] = useState();
    const [listaActual, setListaActual] = useState([]);
    const [tipo, setTipo] = useState("");

    
    const [errorMess, setErrorMes] = useState("Debes elegir una opción primero");
    const [errorMess1, setErrorMes1] = useState("No se permiten espacios en blanco");

    const [showMS, setShowMS] = useState(false);
    const [showMD, setShowMD] = useState(false);
    const [modalOpt, setModalOpt] = useState("");


    const mostrarAlerta = () =>
    Alert.alert(
        "Información Modificada",
        "Tu información ha sido modificada",
        [
        { text: "OK"}
        ],
    { cancelable: false }
  );

    const putData = async (value) => {
        try {
            const jsonValue = await AsyncStorage.getItem('@tempUpdate')
            var res = jsonValue != null ? JSON.parse(jsonValue) : null;
            if(res !== null) {
             setPaisNacimiento(res.paisNacimiento);
             setProvincia([res.direccion[0]]);
             setCanton([res.direccion[1]]);
             setDistrito([res.direccion[2]]);
             setTelefono(res.telefono);
             setTelefonoS(res.telefonoSecundario);
            }
          } catch(e) {
            console.log(e);
          }
    }
    
    useEffect(() => {
        (async () => {
            await axios
                .get("https://restcountries.eu/rest/v2/region/americas?fields=name")
                .then((response) => {
                    setListaPaises(response.data);
                })
                .catch((error) => {
                console.error("There was an error!", error);
                });
            await axios
                .get("https://ubicaciones.paginasweb.cr/provincias.json")
                .then((response) => {
                    var lista = [];
                    for(var key in response.data){
                        lista.push({"id": key, "name": response.data[key]});
                    }
                    setListaProvincias(lista);
                })
                .catch((error) => {
                console.error("There was an error!", error);
            });
            putData();
        })();  
      },[]);

    const loadCantones = (id) =>{
        (async () => {
            await axios
                .get("https://ubicaciones.paginasweb.cr/provincia/" + id + "/cantones.json")
                .then((response) => {
                    var lista = [];
                    for(var key in response.data){
                        lista.push({"id": key, "name": response.data[key]});
                    }
                    setListaActual(lista);
                    setListaCantones(lista);
                })
                .catch((error) => {
                console.error("There was an error!", error);
                });
        })(); 
    }

    const loadDistritos = (id, id2) =>{
        (async () => {
            await axios
                .get("https://ubicaciones.paginasweb.cr/provincia/" + id + "/canton/" + id2 + "/distritos.json")
                .then((response) => {
                    var lista = [];
                    for(var key in response.data){
                        lista.push({"id": key, "name": response.data[key]});
                    }
                    setListaActual(lista);
                    setListaDistritos(lista);
                })
                .catch((error) => {
                console.error("There was an error!", error);
                });
        })(); 
    }

    const setCountry = (country) =>{
        setPaisNacimiento(country);
        setShowMS(false);
        setPNacimientoErr(false);
    }

    const setDir = (idD, nameD) =>{
        if(tipo === "1"){
            setProvincia([{"id": idD, "name": nameD}]);
            setCanton([]);
            setDistrito([]);
            setProvinciaErr(false);
        }
        else if(tipo === "2"){
            setCanton([{"id": idD, "name": nameD}]);
            setDistrito([]);
            setCantonErr(false);
        }
        else if(tipo === "3"){
            setDistrito([{"id": idD, "name": nameD}]);
            setDistritoErr(false);
        }
        setShowMD(false);
    } 

    const validarDatos = () =>{
        var flag = 0;
        if(paisNacimiento === ""){
            setPNacimientoErr(true);
            flag = 1;
        }
        if(provincia.length === 0){
            setProvinciaErr(true);
            flag = 1;
        }
        if(canton.length === 0){
            setCantonErr(true);
            flag = 1;
        }
        if(distrito.length === 0){
            setDistritoErr(true);
            flag = 1;
        }
        if(telefono === ""){
            setTelefonoErr(true);
            flag = 1;
        }
        if(telefonoS === ""){
            setTelefonoSErr(true);
            flag = 1;
        }
        else{
            if(flag === 0)updateData();
        }
    }
    const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@session', jsonValue)
          mostrarAlerta();
        } catch (e) {
          console.log(e);
        }
      }

      const uploadData = (user, id) =>{
        (async () => {
            await axios
                .patch("http://192.168.0.18:8080/usuarios/" + id, user)
                .then((response) => {
                    storeData(response.data);
                })
                .catch((error) => {
                console.error("There was an error!", error);
                });
        })(); 
    }

    const updateData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@tempUpdate')
            var res = jsonValue != null ? JSON.parse(jsonValue) : null;
            if(res !== null) {
              res.paisNacimiento = paisNacimiento;
              res.direccion = [provincia[0], canton[0], distrito[0]];
              res.telefono = telefono;
              res.telefonoSecundario = telefonoS;
              uploadData(res, res._id);
            }
          } catch(e) {
            console.log(e);
          }
      }

    const showList = (tipo) =>{
        setTipo(tipo);
        if(tipo === "0"){
            setShowMS(true);
            setListaActual(listaPaises);
        }
        else if(tipo === "1"){
            setShowMD(true);
            setListaActual(listaProvincias);
        }
        else if(tipo === "2"){
            if (provincia.length === 0){
                setProvinciaErr(true);
            }else{
                loadCantones(provincia[0].id);
                setShowMD(true);
            }
        }
        else if(tipo === "3"){
            if (canton.length === 0){
                setCantonErr(true);
            }else{
                loadDistritos(provincia[0].id, canton[0].id);
                setShowMD(true);
            }
        }
    }

    const ItemD = ({ id, name }) => (
        <TouchableHighlight onPress={() => setDir(id, name)} style={{marginTop:5, marginLeft:5, marginRight:5, marginBottom:5}}>
            <View style={styles.option}>
                <Text style={styles.optionText}>{name}</Text>
            </View>
        </TouchableHighlight>   
    );

    const renderItemD = ({ item }) => (
        <ItemD id={item.id} name={item.name} />
    );

    const Item = ({ name }) => (
        <TouchableHighlight onPress={() => setCountry(name)} style={{marginTop:5, marginLeft:5, marginRight:5, marginBottom:5}}>
            <View style={styles.option}>
                <Text style={styles.optionText}>{name}</Text>
            </View>
        </TouchableHighlight>   
    );

    const renderItem = ({ item }) => (
        <Item name={item.name} />
    );

    return (
        <View style={styles.container}>
            <Modal isVisible={showMS} onBackdropPress={() => setShowMS(false)} animationIn="zoomInUp" animationOut="zoomOut" animationOutTiming={900} animationInTiming={1400}>
                <View style={styles.modal}>
                <FlatList
                    data={listaActual}
                    renderItem={renderItem}
                    keyExtractor={item => item.name}
                />
                </View>
            </Modal>
            <Modal isVisible={showMD} onBackdropPress={() => setShowMD(false)} animationIn="zoomInUp" animationOut="zoomOut" animationOutTiming={900} animationInTiming={1400}>
                <View style={styles.modal}>
                <FlatList
                    data={listaActual}
                    renderItem={renderItemD}
                    keyExtractor={item => item.name}
                />
                </View>
            </Modal>
            <View style={styles.header}>
                <Text style={styles.backButton} title="Go back" onPress={() => navigation.goBack()}>Regresar</Text>
                <Text style={styles.title}>Registro</Text>
            </View>
            <ScrollView>
            <View style={styles.inputsRow}>
                <TouchableOpacity>
                    <Pressable  style={pNacimientoErr ? styles.inputViewErr : styles.inputView} onPress={() => {showList("0");}}>
                    <TextInput
                        style={styles.input}
                        placeholder="País de Nacimiento"
                        autoCapitalize="words"
                        value={paisNacimiento}
                        editable={false}
                    /> 
                    </Pressable >
                </TouchableOpacity>
                {pNacimientoErr &&
                    (<Text style={styles.errText} >
                    {errorMess}
                    </Text>)
                }
                <TouchableOpacity>
                    <Pressable  style={provinciaErr ? styles.inputViewErr : styles.inputView} onPress={() => {showList("1");}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Provincia"
                        autoCapitalize="words"
                        value={provincia.length === 0 ? "" : provincia[0].name}
                        editable={false}
                    /> 
                    </Pressable >
                </TouchableOpacity>
                {provinciaErr &&
                    (<Text style={styles.errText} >
                    {errorMess}
                    </Text>)
                }
                <TouchableOpacity>
                    <Pressable  style={cantonErr ? styles.inputViewErr : styles.inputView} onPress={() => {showList("2");}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Cantón"
                        autoCapitalize="words"
                        value={canton.length === 0 ? "" : canton[0].name}
                        editable={false}
                    /> 
                    </Pressable >
                </TouchableOpacity>
                {cantonErr &&
                    (<Text style={styles.errText} >
                    {errorMess}
                    </Text>)
                }
                <TouchableOpacity>
                    <Pressable  style={distritoErr ? styles.inputViewErr : styles.inputView} onPress={() => {showList("3");}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Distrito"
                        autoCapitalize="words"
                        value={distrito.length === 0 ? "" : distrito[0].name}
                        editable={false}
                    /> 
                    </Pressable >
                </TouchableOpacity>
                {distritoErr &&
                    (<Text style={styles.errText} >
                    {errorMess}
                    </Text>)
                }
                <View style={telefonoErr ? styles.inputViewErr : styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Número de Teléfono"
                        autoCompleteType="tel"
                        keyboardType="numeric"
                        value={telefono}
                        onChangeText={(text) =>{setTelefono(text); setTelefonoErr(false)}}
                        onEndEditing={()=>{if(telefono === "") setTelefonoErr(true)}}
                    />
                </View>
                {telefonoErr &&
                    (<Text style={styles.errText} >
                    {errorMess1}
                    </Text>)
                }
                <View style={telefonoSErr ? styles.inputViewErr : styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Número de Teléfono Secundario"
                        autoCompleteType="tel"
                        keyboardType="numeric"
                        value={telefonoS}
                        onChangeText={(text) =>{setTelefonoS(text); setTelefonoSErr(false)}}
                        onEndEditing={()=>{if(telefonoS === "") setTelefonoSErr(true)}}
                    />
                </View>
                {telefonoSErr &&
                    (<Text style={styles.errText} >
                    {errorMess1}
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
        paddingTop:hp('0%'),
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
      }
      
  });