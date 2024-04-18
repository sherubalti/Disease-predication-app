import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import Symtoms from '../../Components/Symtoms'
import NetInfo from '@react-native-community/netinfo'
const SelectSymtom = ({navigation}) => {
  const [netInfo, setNetInfo] = useState(false);
  let symtom1, symtom2, symtom3, symtom4, symtom5;

useEffect(()=>{
  const netInfoData = NetInfo.addEventListener(state=>{
    setNetInfo(state.isConnected);
  });

  return()=>{
    netInfoData;
  }
});

  const setSymptom1 = (sym1)=>{
    symtom1 = sym1;
  }
  const setSymptom2 = (sym1)=>{
    symtom2 = sym1;
  }
  const setSymptom3 = (sym1)=>{
    symtom3 = sym1;
  }
  const setSymptom4 = (sym1)=>{
    symtom4 = sym1;
  }
  const setSymptom5 = (sym1)=>{
    symtom5 = sym1;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.notificationTextStyle}>Please Select 5 Symptoms </Text>
      <Symtoms getSymtom={setSymptom1}/>
      <Symtoms getSymtom={setSymptom2}/>
      <Symtoms getSymtom={setSymptom3}/>
      <Symtoms getSymtom={setSymptom4}/>
      <Symtoms getSymtom={setSymptom5}/>
      <Text style={styles.noteTextStyle}>Note:</Text>
      <Text style={styles.noteMessageStyle}>Please try to select Symptoms intelligently. Predicted result is 100% based on your selected Symptoms</Text>
    <TouchableOpacity
    style = {styles.buttonStyle}
      onPress={()=>{
        if(symtom1 !== undefined && symtom2 !== undefined && symtom3 !== undefined && symtom4 !== undefined && symtom5 !== undefined ){
          if(netInfo){
            navigation.navigate('Predict', {symtom1: `${symtom1}`, symtom2: `${symtom2}`, symtom3: `${symtom3}`, symtom4: `${symtom4}`, symtom5: `${symtom5}`});
          }
          else{
            Alert.alert("No Internet Connection!!", "Internet Connection is required to Predict Disease...");
          }
        }
        else{
          Alert.alert("Select All","Please Select All Symptoms...");
        }
      }}
    >
      <Text style = {styles.buttonTextStyle}>Check</Text>
      </TouchableOpacity>
      <Image 
      source={require('../../Assets/Images/symptom.png')}
      style={styles.imgStyle}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginLeft: 20,
    marginTop: 8,
  },
  notificationTextStyle:{
    marginLeft:20,
    opacity:0.5,
  },
  buttonStyle:{
    backgroundColor :'green',
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 110,
    marginTop: 5,
    marginBottom: 15,
  },
  buttonTextStyle:{
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
  },
  noteTextStyle:{
    marginTop: 5,
    fontWeight:'bold',
    fontSize: 16,
  },
  noteMessageStyle:{
    justifyContent: 'center',
    width: '90%',
    opacity:0.7,
  },
  imgStyle:{
    width: '95%', 
    height: 200, 
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20
  },
})
export default SelectSymtom