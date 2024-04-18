import { View, Text, StyleSheet, Alert, FlatList, Image, ActivityIndicator, ToastAndroid, BackHandler } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import qs from 'qs';
import translate from 'translate-google-api';
import Tts from 'react-native-tts'
import Icon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo'
import { GetImage } from '../../Components/GetSpecificImage';
const Data = require('../../Components/SymptomsList.json');

const Predict = ({}) => {
    const route = useRoute();
    const navigation = useNavigation();
  const [netInfo, setNetInfo] = useState(false);
    const symptom1 = route.params.symtom1;
    const symptom2 = route.params.symtom2;
    const symptom3 = route.params.symtom3;
    const symptom4 = route.params.symtom4;
    const symptom5 = route.params.symtom5;
    const [result, setResult] = useState([]);
    const [flag, setFlag] = useState(false);

  const uploadSymptoms = async ()=>{

  const test = {
    'symptom1': symptom1,
    'symptom2': symptom2,
    'symptom3': symptom3,
    'symptom4': symptom4,
    'symptom5': symptom5,
  };
  try{
    await axios({
      method: 'post',
      url : 'https://diseaseprediction.techsolab.repl.co/predict', //192.168.18.75
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
        },
      data : qs.stringify(test),
      timeout: 9000,
    })
    .then(function(resonse){
      setResult(resonse.data);
      setFlag(true);
     })
    .catch(function(Error){
      Alert.alert("Error", String(Error), [
        {text: "Acha Ok", onPress:()=>{navigation.navigate('Select Symptom')}}
      ]);
    });
  }catch(Error){
    Alert.alert("Error!!!",String(Error));
  }
}

  useEffect(()=>{
      uploadSymptoms();
        const netInfoData = NetInfo.addEventListener(state=>{
          setNetInfo(state.isConnected);
        });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
          Tts.stop();
          return false;
        });

        const goingBack = navigation.addListener('beforeRemove', () => {
          Tts.stop();
        });

        return()=>{
          goingBack;
          netInfoData;
          backHandler.remove();
        };
    }, []);

    Tts.setDefaultLanguage('ur');

    const SpeechText = (item)=>{
      if(netInfo){
    ToastAndroid.show("Translating Please have Patience...", ToastAndroid.LONG);
      try{
        translate("Symptoms "+item.symptom, {to: 'ur'}).then(res => {
          Tts.speak(JSON.stringify(res));
          //Tts.stop();
      });
        translate("Precaution "+item.precuation, {to: 'ur'}).then(res => {
          Tts.speak(JSON.stringify(res));
          //Tts.stop();
      });
      translate("Description "+item.description, {to: 'ur'}).then(res => {
        Tts.speak(JSON.stringify(res));
        //Tts.stop();
      });
    }catch(e){
      Alert.alert("Error", e);
    }
  }else{
    ToastAndroid.show("No Internet", ToastAndroid.LONG);
  
  }
  };
    const DictionaryData = ({item})=>{
      if(item.name === result.disease){
      return(
          <View style={styles.container}
              key={item.id}>
              <View style={{flexDirection: 'row',}}>
                <Text style={styles.HeadingStyle}>
                  Symptoms:
                </Text>
                <Icon style={styles.micro} name='microphone' size={30} color='black'
                onPress={()=>{
                SpeechText(item);
                }}/>
            </View>
              <Text style = {[styles.symptomStyle, styles.commonStyle]}>
                {item.symptom}
              </Text>
              <Text style={styles.HeadingStyle}>
                Precaution:
              </Text>
              <Text style = {[styles.precuationStyle, styles.commonStyle]}>
                {item.precuation}
              </Text>
              <Text style={styles.HeadingStyle}>
                Description:
              </Text>
              <Text style = {[styles.descriptionStyle, styles.commonStyle]}>
                {item.description}
              </Text>
              <Text style={styles.HeadingStyle}>
                Medicines Name:
              </Text>
              <Text style = {[styles.descriptionStyle, styles.commonStyle]}>
                {item.Medicine_Name}
              </Text>
              <Image
              style={styles.imgStyle}
              source={GetImage(result.disease)}
              />
          </View>
      )
    }
 
  }
  return (
    <View style = {styles.container}>
      {!flag ? (< ActivityIndicator size='large' color="green" style = {styles.indicator}/>):(
      <View>
        <Text style = {styles.result}>Disease Name : {result.disease}</Text>
        <Text style = {styles.confidence}>Confidence : {result.accuracy*100} % Accuracy</Text>
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={Data}
          initialNumToRender={40}
          renderItem = {DictionaryData}
          keyExtractor = {item=> item.id}
        />
      </View>)
      }
      
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    marginLeft: 10,
    marginTop:5,  
    marginBottom: 80,
  },
  micro:{
    paddingLeft: 20,
  },
  indicator:{
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  result:{
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  confidence:{
    fontSize: 18,
  },
  symptomStyle:{
    fontWeight: 'bold',
  },
  HeadingStyle:{
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
  },
  precuationStyle:{
    fontStyle: 'italic',
  },
  descriptionStyle:{
    opacity:.9,
  },
  commonStyle:{
    margin: 5,
    marginLeft: 10,
  },
  resultDescription:{
    height: 10000,
  },
  imgStyle:{
    width:300,
    height: 250,
    marginTop: 5,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20,
  }
})
export default Predict