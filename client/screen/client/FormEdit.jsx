import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
  useWindowDimensions,
  ActivityIndicator,
  Button,
  Image,
  Platform
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import tailwind from 'tailwind-rn'
import { Radio, RadioGroup, Datepicker} from '@ui-kitten/components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { editClient } from '../../store/actions/client'
import handleUpload from '../../helpers/handleUpload'
import * as ImagePicker from 'expo-image-picker';

export default function EditForm({ navigation }) {
  const { temporaryClient, loading: loadingClient, error: errorClient } = useSelector(state => state.client)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [birthDate, setBirthDate] = useState(new Date(temporaryClient.birthDate))
  const [value, setValue] = useState({
    fullName: temporaryClient.fullName,
    photoUrl: temporaryClient.photoUrl,
    city: temporaryClient.city,
    birthDate
  })
  const [image, setImage] = useState({});
  const [error, setError] = useState({})
  const dispatch = useDispatch()
  const widthWindow = useWindowDimensions().width
  const now = new Date()
  useEffect(() => {
    if (temporaryClient.gender === 'female') setSelectedIndex(0)
    else setSelectedIndex(1)
    setImage({uri: temporaryClient.photoUrl})
  }, [])
  useEffect(() => {
    setValue({...value, birthDate: birthDate})
  }, [birthDate])
  useEffect(() => {
    selectedIndex === 1 ? setValue({...value, gender: 'male'}) : setValue({...value, gender: 'female'})
  }, [selectedIndex])
  useEffect(() => {
    if (errorClient) {
      setError({...error, fullName: errorClient})
      setError({...error, photoUrl: errorClient})
      setError({...error, birthDate: errorClient})
      setError({...error, city: errorClient})
    }
  }, [errorClient])

  const handleChange = (text, name) => {
    setError({})
    setValue({ ...value, [name]: text})
  }
  const handleSubmit = () => {
    if (!value.fullName) setError({...error, fullName: 'Required'})
    else if (!value.photoUrl) setError({...error, photoUrl: 'Required'})
    else if (!value.birthDate) setError({...error, birthDate: 'Required'})
    else if (!value.city) setError({...error, city: 'Required'})
    else {
      dispatch(editClient(value, temporaryClient.id))
      navigation.navigate('Profile')
    }
  }

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result)
      setValue({ ...value, photoUrl: ''})
      const newUrl = await handleUpload(result)
      console.log(newUrl, "url dari axios")
      setValue({ ...value, photoUrl: newUrl})
      console.log(value.photoUrl, 'ini value new url')
    }
  };

  const openCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5
    });

    // console.log(result);

    if (!result.cancelled) {
      setImage(result)
      setValue({ ...value, photoUrl: ''})
      const newUrl = await handleUpload(result)
      console.log(newUrl, "url dari axios")
      setValue({ ...value, photoUrl: newUrl})
      console.log(value.photoUrl, 'ini value new url')
    }
  };
    
  if (loadingClient) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color="34D399" size="large" />
      </View>
    )
  }
  if (errorClient) {
    return (
      <View style={tailwind('flex-1 justify-center items-center bg-white')}>
        <Image 
          style={tailwind('w-full h-80')}
          source={require('../../assets/error.png')}
        />
        <Text style={tailwind('py-2 text-lg text-gray-400 font-bold tracking-wider')}>Oppss, something error...</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ width: widthWindow * 8 / 10, marginTop: 40}}
      >
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>FULL NAME</Text>
          <TextInput
            value={value.fullName}
            onChangeText={(text) => handleChange(text, 'fullName')}
            style={tailwind('px-3 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
          {
            error.fullName ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.fullName}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>PHOTO URL</Text>
          <TouchableOpacity
            onPress={pickImage}
            style={tailwind('items-center my-3 py-2 px-10 rounded-lg border border-green-400')}>
            <Text 
              style={tailwind('text-base text-green-400')}
            >Pick an image from gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={openCamera}
            style={tailwind('items-center my-3 py-2 px-10 rounded-lg border border-green-400')}>
            <Text 
              style={tailwind('text-base text-green-400')}
            >Take a picture</Text>
          </TouchableOpacity>
          {/* <Button title="Pick an image from gallery" onPress={pickImage} /> */}
          {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
          {
            error.photoUrl ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.photoUrl}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>BIRTH DATE</Text>
          <Datepicker
            min={new Date(now.getFullYear(), now.getMonth(), now.getDate() - 36000)}
            max={now}
            date={birthDate}
            onSelect={nextDate => setBirthDate(nextDate)}
          />
          {
            error.birthDate ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.birthDate}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>CITY</Text>
          <TextInput
            value={value.city}
            onChangeText={(text) => handleChange(text, 'city')}
            style={tailwind('px-3 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
          {
            error.city ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.city}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={index => setSelectedIndex(index)}>
          <Radio status='success'>Female</Radio>
          <Radio status='success'>Male</Radio>
        </RadioGroup>
        <TouchableOpacity
          onPress={() => handleSubmit()} 
          style={tailwind('items-center py-3 my-8 rounded-full bg-green-400')}>
          <Text 
            style={tailwind('text-xl text-gray-100')}
          >EDIT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}
