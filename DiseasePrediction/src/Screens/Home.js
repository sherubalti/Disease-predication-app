import { View, Text, StyleSheet, TouchableOpacity, Image, ToastAndroid, Alert } from 'react-native'

const Home = ({navigation}) => {

  return (
    <View style = {styles.container}>
      <Text style={styles.welcomeTextStyle}>
        Disease Predictor
      </Text>
      <Image source={require('../../Assets/Images/original.png')}
      style={styles.imgStyle}/>
      <TouchableOpacity 
      style={styles.buttonStyle}
        onPress={() => navigation.navigate("Select Symptom")}>
          <Text style= {styles.buttonTextStyle}>Let's Go</Text>
        </TouchableOpacity>
       <TouchableOpacity 
       style = {styles.buttonStyle}
        onPress={() => navigation.navigate("Dictionary")}>
          <Text style= {styles.buttonTextStyle}>Dictionary </Text>
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems: 'center',
        marginTop:10,
    },
    welcomeTextStyle:{
      fontSize: 28,
      fontWeight: 'bold',
      color: 'green',
      marginVertical: 10,
      tintColor:'#006600',
      marginBottom: 20,
    },
    buttonStyle: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical:10,
      width:'35%',
      height: 40,
      backgroundColor: 'green',
      borderRadius: 10,
    },
    buttonTextStyle:{
      fontSize: 20,
      fontStyle: 'italic',
    },
    imgStyle:{
      width:300,
      height:350,
      borderWidth:1,
      borderRadius: 10,
      borderColor: 'green',
      marginBottom:50,
      borderColor:'green',
    },
})
export default Home