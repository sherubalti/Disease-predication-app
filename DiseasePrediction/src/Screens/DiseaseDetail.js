import {Text, FlatList, StyleSheet, Image, View, Alert, ToastAndroid, BackHandler} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import {HeaderBackButton} from 'react-navigation-stack'
import translate from 'translate-google-api';
import Tts from 'react-native-tts'
import Footer from '../../Components/Footer';
import {GetImage} from '../../Components/GetSpecificImage'
import NetInfo from '@react-native-community/netinfo'

const Data = require('../../Components/SymptomsList.json');

const DiseaseDetail = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [netInfo, setNetInfo] = useState(false);
  const id = route.params.id;

  useEffect(()=>{
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
      netInfoData();
      backHandler.remove();
    }});

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
    Alert.alert("Error", "No internet");
  }
}else{
  ToastAndroid.show("No Internet", ToastAndroid.LONG);
}
};

  const DictionaryData = ({item}) => {
    if (item.id == id){
      return (
        <View>
          <View style={styles.container} key={item.id}>
            <Text style={styles.nameStyle}>{item.name + ':'}</Text>
            <View style={{flexDirection: 'row',}}>
              <Text style={styles.HeadingStyle}>Symptoms:</Text>
              <Icon style={styles.micro} name='microphone' size={30} color='black'
              onPress={()=>{
                SpeechText(item);
              }}/>
            </View>
            <Text style={[styles.symptomStyle, styles.commonStyle]}>
              {item.symptom}
            </Text>
            <Text style={styles.HeadingStyle}>Precuation:</Text>
            <Text style={[styles.precuationStyle, styles.commonStyle]}>
              {item.precuation}
            </Text>
            <Text style={styles.HeadingStyle}>Description:</Text>
            <Text style={[styles.descriptionStyle, styles.commonStyle]}>
              {item.description}
            </Text>
            <Text style={styles.HeadingStyle}>Medicines Name:</Text>
            <Text style={[styles.descriptionStyle, styles.commonStyle]}>
              {item.Medicine_Name}
            </Text>
            <Image style={styles.imgStyle} source={GetImage(item.name)} />
          </View>
          <View>
            <Footer id={item.id} />
          </View>
        </View>
      );
    }
  };

  return (
    <View>
      
      <FlatList
        showsVerticalScrollIndicator={false}
        data={Data}
        initialNumToRender={40}
        keyExtractor={item=> item.id}
        renderItem={DictionaryData}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginTop: 10,
  },
  micro:{
    paddingLeft: 20,
  },
  nameStyle: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  symptomStyle: {
    fontWeight: 'bold',
  },
  HeadingStyle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
  },
  precuationStyle: {
    fontStyle: 'italic',
  },
  descriptionStyle: {
    opacity: 0.9,
  },
  commonStyle: {
    margin: 5,
    marginLeft: 10,
  },
  imgStyle: {
    width: 300,
    height: 250,
    marginTop: 5,
    marginLeft: 20,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20,
  },
});
export default DiseaseDetail;
