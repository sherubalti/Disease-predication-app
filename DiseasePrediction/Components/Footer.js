import {View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Footer = props => {
  const navigation = useNavigation();
  let ID = props.id;
  const incrementId = () => {
    if (ID + 1 == 41) {
      ID = 1;
    } else {
      ID++;
    }
  };
  const decrementId = () => {
    if (ID - 1 == 0) {
      ID = 40;
    } else {
      ID--;
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          decrementId();
          navigation.navigate('Disease Detail', {id: ID});
        }}>
        <Icon name="long-arrow-left" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Disease Prediction')}>
        <Icon name="home" size={30} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          incrementId();
          navigation.navigate('Disease Detail', {id: ID});
        }}>
        <Icon name="long-arrow-right" size={30} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {},
});
export default Footer;
