import { FlatList, Text, StyleSheet, TouchableOpacity, View, TextInput,} from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon  from 'react-native-vector-icons/FontAwesome'
const Data = require('../../Components/SymptomsList.json')

const Dictionary = ({navigation}) => {
    const [search, setSearch] = useState('');
    const [iconName, setIconName] = useState('');
const DictionaryData = ({item})=>{
    if(search == ''){
    return(
        <TouchableOpacity
            key={item.id}
            onPress={()=>{
                navigation.navigate('Disease Detail', {id:item.id});
             }}>
            <Text 
            style={styles.diseaseNameStyle}>
            {item.name}
            </Text>
        </TouchableOpacity>
    )
    }
    else{
        if(search.toLowerCase() == item.name.slice(0, search.length).toLowerCase())
        return(
            <TouchableOpacity
                key={item.id}
                onPress={()=>{
                    navigation.navigate('Disease Detail', {id: item.id});
                     }}>
                <Text 
                style={styles.diseaseNameStyle}>
                {item.name}
                </Text>
            </TouchableOpacity>
        )
    }
}
    
  return (
    <View>
        <View style={styles.searchBarStyle}>
            <TouchableOpacity
            onPress={()=>{
                DictionaryData;
            }}
            >
                <Icon name='search' size={20} style={styles.searchBarItemsStyle}/>
            </TouchableOpacity>
            <TextInput 
            value={search}
                style={styles.InputStyle}
                placeholder='Search Disease'
                onChangeText={(newValue)=>{
                    setSearch(newValue);
                    DictionaryData;
                }}
                onFocus={()=>setIconName('close')}
                onBlur={()=>{setIconName('')}}/>
            <TouchableOpacity
            onPress={()=>setSearch('')}
            >
                <Icon name='close' size={iconName == '' ? 0 : 20} style={styles.searchBarItemsStyle}/>
            </TouchableOpacity>
        </View>
        <FlatList style={{marginBottom: 50,}}
        showsVerticalScrollIndicator={false}
        data={Data}
        renderItem = {DictionaryData}
        keyExtractor = {item=> item.id}
        />
    </View>
  )
}
const styles = StyleSheet.create({
    diseaseNameStyle:{
        fontSize: 20,
        margin: 2,
        paddingVertical:10, 
        paddingLeft: 20,
        width:'100%', 
        backgroundColor:'#fcfcfc'
    },
    searchBarStyle:{
        flexDirection: 'row',
        width:'90%',
        height: 30,
        borderWidth: 1,
        borderRadius: 15,
        marginVertical: 5,
        alignSelf: 'center',
        justifyContent:'space-around'
    },
    searchBarItemsStyle:{
        marginVertical: 3,
    },
    InputStyle:{
        borderRadius: 5,
        width: '80%',
        height: 35,
        opacity: 0.8,
    },
})
export default Dictionary