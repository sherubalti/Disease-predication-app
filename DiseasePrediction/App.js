import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView,  } from '@react-navigation/drawer';
import React, { useEffect } from 'react';
import PickerValue from './src/Screens/SelectSymtom';
import {HeaderBackButton} from 'react-navigation-stack'
import Home from './src/Screens/Home';
import Predict from './src/Screens/Predict';
import SplashScreen from 'react-native-splash-screen'
import Dictionary from './src/Screens/Dictionary';
import DiseaseDetail from './src/Screens/DiseaseDetail';
import CustomDrawer from './Components/CustomDrawer';
import Save_Report from './src/Screens/Save_Report';
import About from './src/Screens/About';
import ShowReport from './src/Screens/ShowReport';
import Login from './src/Screens/Login';
import Tts from 'react-native-tts';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const App = () => {
  useEffect(()=>{
    SplashScreen.hide();
  },[]);

const DrawerNavigate = ()=>{
  return(
  <Drawer.Navigator initialRouteName='Disease Prediction'
   drawerContent={(props)=><CustomDrawer/>}>
    <Stack.Screen name='Disease Prediction' component={Home}/>
  </Drawer.Navigator>
  )
}
  return (
<NavigationContainer>
  <Stack.Navigator initialRouteName='Disease Prediction'>
    <Stack.Screen name='Home' component={DrawerNavigate}
     options={{headerShown: false}}/>
    <Stack.Screen name='Select Symptom' component={PickerValue}/>
    <Stack.Screen name='Predict' component={Predict}/>
    <Stack.Screen name='Dictionary' component={Dictionary}/>
    <Stack.Screen name='Disease Detail' component={DiseaseDetail} />
    <Stack.Screen name='show' component={ShowReport}/>
    <Stack.Screen name='about' component={About}/>
    <Stack.Screen name='login' component={Login}/>
    <Stack.Screen name='save report' component={Save_Report}/>
  </Stack.Navigator>
</NavigationContainer>
  )
}
export default App