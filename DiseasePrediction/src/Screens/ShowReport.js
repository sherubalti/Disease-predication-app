import { StyleSheet, Image, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const ShowReport = () => {
    const route = useRoute();
    const img = route.params.img_url;
  return (
    <View style={{flex: 1}}>
      <Image style={{flex: 1, borderRadius: 10, resizeMode: 'stretch'}}
       source={{uri: img}}/>
    </View>
  )
}

export default ShowReport

const styles = StyleSheet.create({})