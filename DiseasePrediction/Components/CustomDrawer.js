import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Linking, Alert, BackHandler } from 'react-native'
import {DrawerContentScrollView} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo'

const CustomDrawer = () => {
  const navigation = useNavigation();
  const [netInfo, setNetInfo] = useState(false);
  useEffect(()=>{
    const netInfoData = NetInfo.addEventListener(state=>{
      setNetInfo(state.isConnected);
    });
  
    return()=>{
      netInfoData;
    }
  });

  return (
    <DrawerContentScrollView style={styles.container}>
        <View>
            <Image source={require('../Assets/Images/original.png')}
            style={styles.img}/>
        </View>
        <Text style = {styles.Support}>For Users</Text>
        <TouchableOpacity onPress={()=>navigation.navigate('Home')}>
            <Text style = {styles.drawerItem}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Select Symptom')}>
            <Text style = {styles.drawerItem}>Predictor</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Dictionary')}>
            <Text style = {styles.drawerItem}>Dictionary</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{
            if(netInfo){
            navigation.navigate('login');
            }
            else{
            Alert.alert("No Internet Connection!!", "Internet Connection is required...");
            }
            }}>
            <Text style = {styles.drawerItem}>Save Report</Text>
        </TouchableOpacity>
        <Text style = {styles.Support}>Support Us</Text>
        <TouchableOpacity onPress={()=>Linking.openURL('mailto:techsolab.tech@gmail.com?subject=Feedback')}>
            <Text style = {styles.drawerItem}>Feedback</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('about')}>
            <Text style = {styles.drawerItem}>About </Text>
        </TouchableOpacity>    
        <TouchableOpacity onPress={()=>Alert.alert("Not Uploaded Yet", "Waiting to upload on Play Store...")}>
            <Text style = {styles.drawerItem}>Rate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>BackHandler.exitApp()}>
            <Text style = {styles.drawerItem}>Exit</Text>
        </TouchableOpacity>
    </DrawerContentScrollView>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        height: '100%',
    },
    img:{
        marginLeft: 30,
        width:100, 
        height:100, 
        borderRadius: 100,
    },
    drawerItem:{
        fontSize: 18,
        fontWeight:'bold',
        marginVertical: 1,
        paddingLeft: 20,
        paddingVertical: 10,
        borderBottomWidth: 0.2,
        width:'95%',
        alignSelf:'center',
    },
    Support:{
        marginTop: 20,
        fontSize: 20,
        fontWeight:'bold',
        paddingLeft: 5,
        paddingBottom: 0,
    },
})