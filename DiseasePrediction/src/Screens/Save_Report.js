import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import CircularProgress from 'react-native-circular-progress-indicator';
import {StackActions, useNavigation, useRoute} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo'

const Save_Report = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const username = route.params.name;
  const [progressValue, setProgressValue] = useState(0);
  const [myurl, setMyrl] = useState([]);
  const [rerender, setRerender] = useState(0);
  const res = [...new Set(myurl)];
  const [netInfo, setNetInfo] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setRerender(1);
    }, 2000);
    clearInterval();
    const getImages = () => {
      storage()
        .ref(`${username}/`)
        .listAll()
        .then(function (result) {
          result.items.forEach(function (imageRef) {
            imageRef
              .getDownloadURL()
              .then(function (url) {
                myurl.push(url);
                setMyrl(myurl);
              })
              .catch(function (error) {
                Alert.alert('Error', error);
              });
          });
        })
        .catch(e => console.warn('Errors while downloading => ', e));
    };
    getImages();
    const netInfoData = NetInfo.addEventListener(state=>{
      setNetInfo(state.isConnected);
  });

  return()=>{
    netInfoData;
    //setMyrl([]);
  }
  }, [rerender]);

  const uploadImage = async () => {
    try {
      ToastAndroid.show("Processing...", ToastAndroid.LONG);
      launchImageLibrary({quality: 0.8}, fileobj => {
        try {
          const img = fileobj.assets[0];
          const uploadTask = storage()
            .ref()
            .child(`${username}/${Date.now()}`)
            .putFile(img.uri);

          uploadTask.on(
            'state_changed',
            snapshot => {
              setProgressValue(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
              );
            },
            error => {
              Alert.alert('Error', error);
            },
            () => {
              Alert.alert(
                'Success',
                'Your Report has been successfully uploaded...',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.dispatch(
                        StackActions.replace('save report', {name:username})
                      );
                      setProgressValue(0);
                    },
                  },
                ],
              );
            },
          );
        } catch (ERRoR) {}
      });
    } catch (err) {
      console.warn(err);
    }
  };

  const DelImage = img_url => {
    storage()
      .refFromURL(img_url)
      .delete()
      .then(() => {
        Alert.alert('Deleted!', 'Your Image has been successfully Deleted', [
          {
            text: 'Done',
            onPress: () => {
              ToastAndroid.show("Deleting...", ToastAndroid.LONG);
              navigation.dispatch(
                StackActions.replace('save report', {name:username})
              );
            },
          },
        ]);
      })
      .catch(err => {
        Alert.alert('Failed!', 'Failed to delete image');
      });
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
        if(netInfo){
          uploadImage();
        }else{
          ToastAndroid.show("No Internet, Check Your Internet Connection!!!", ToastAndroid.LONG);
        }
        }}>
        <Text style={styles.btnText}>Upload Image</Text>
      </TouchableOpacity>
      {progressValue > 0 ? (
        <View style={styles.ProgBar}>
          <CircularProgress
            value={100}
            duration={3000}
            inActiveStrokeColor={'#1f6b01'}
            inActiveStrokeOpacity={0.2}
            progressValueColor={'#1f6b01'}
            valueSuffix={'%'}
          />
        </View>
      ) : (
        ''
      )}
      <ScrollView
        style={{marginBottom: 90}}
        showsVerticalScrollIndicator={false}>
        {res
          .slice(0)
          .reverse()
          .map(i => (
            <TouchableOpacity
              key={i}
              onPress={() => {
                navigation.navigate('show', {img_url: i});
              }}
              onLongPress={() => {
              if(netInfo){
                Alert.alert('Delete', 'Are you Sure!!!', [
                  {text: 'Oh No No!'},
                  {
                    text: 'Yes I am Sure',
                    onPress: () => {
                      DelImage(i);
                    },
                  },
                ]);
             }else{
              ToastAndroid.show("No Internet, Check Your Internet Connection!!!", ToastAndroid.LONG);
              }
            }
          }>
          <Image
            style={{
              height: 400,
              width: 310,
              margin: 20,
              padding: 2,
              borderRadius: 5,
              borderWidth: 1,
              borderColor: 'green',
            }}
            source={{uri: i}}
            key={i}
          />
        </TouchableOpacity>
      ))}
      </ScrollView>
    </View>
  );
};

export default Save_Report;

const styles = StyleSheet.create({
  btn: {
    margin: 10,
    backgroundColor: '#2fa201',
    alignSelf: 'center',
    borderRadius: 8,
  },
  btnText: {
    fontSize: 20,
    padding: 10,
  },
  ProgBar: {
    alignSelf: 'center',
    margin: 10,
  },
  reportScreen: {
    alignSelf: 'center',
    width: '98%',
    backgroundColor: 'green',
    borderRadius: 10,
  },
});
