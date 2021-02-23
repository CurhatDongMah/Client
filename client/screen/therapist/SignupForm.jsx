import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import tailwind from 'tailwind-rn'
import { Datepicker } from '@ui-kitten/components'
import { Radio, RadioGroup} from '@ui-kitten/components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { validate } from 'validate.js';
import constraints from '../../helpers/constraints';
import { therapistRegister } from '../../store/actions/therapist'
import { Button, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import handleUpload from '../../helpers/handleUpload'
import { resetRegisterTherapist } from '../../store/actions/therapist'

export default function SignupForm({ navigation }) {
  const { successRegisterTherapist } = useSelector(state => state.therapist)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [birthDate, setBirthDate] = useState(new Date())
  const [value, setValue] = useState({})
  const [error, setError] = useState({})
  const [image, setImage] = useState(null);
  const [license, setLicense] = useState(null);

  const widthWindow = useWindowDimensions().width
  const dispatch = useDispatch()
  const now = new Date()
  useEffect(() => {
    setValue({...value, birthDate: birthDate})
  }, [birthDate])
  useEffect(() => {
    selectedIndex === 1 ? setValue({...value, gender: 'male'}) : setValue({...value, gender: 'female'})
  }, [selectedIndex])
  useEffect(() => {
    if (successRegisterTherapist) {
      navigation.navigate('Signin')
      dispatch(resetRegisterTherapist())
    }
  }, [successRegisterTherapist])
  const handleChange = (text, name) => {
    setError({})
    setValue({ ...value, [name]: text})
  }
  const handleSubmit = () => {
    console.log(value.photoUrl)
    console.log(value.licenseUrl)
    const validateEmail = validate({ emailAddress: value.email }, constraints)
    if (!value.fullName) setError({...error, fullName: 'Required'})
    else if (!value.email) setError({...error, email: 'Required'})
    else if (validateEmail) setError({...error, email: validateEmail.emailAddress[0]})
    else if (!value.password) setError({...error, password: 'Required'})
    else if (!value.photoUrl) setError({...error, photoUrl: 'Required'})
    else if (!value.birthDate) setError({...error, birthDate: 'Required'})
    else if (!value.city) setError({...error, city: 'Required'})
    else if (!value.licenseUrl) setError({...error, licenseUrl: 'Required'})
    else if (!value.price) setError({...error, price: 'Required'})
    else if (!value.about) setError({...error, about: 'Required'})
    else {
      dispatch(therapistRegister(value))
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
  const pickLicense = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5
    });

    // console.log(result);

    if (!result.cancelled) {
      setLicense(result)
      setValue({ ...value, licenseUrl: ''})
      const newUrl = await handleUpload(result)
      console.log(newUrl, "url dari axios")
      setValue({ ...value, licenseUrl: newUrl})
      console.log(value.licenseUrl, 'ini value new url')
    }
  };
  return (
    <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={{ width: widthWindow * 8 / 10, marginTop: 40 }}
      >
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>FULL NAME</Text>
          <TextInput
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
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>EMAIL</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, 'email')}
            style={tailwind('px-3 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
          {
            error.email ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.email}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>PASSWORD</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, 'password')}
            style={tailwind('px-3 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
            secureTextEntry={true}
          ></TextInput>
          {
            error.password ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.password}</Text> 
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
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>LICENSE</Text>
          <TouchableOpacity
            onPress={pickLicense}
            style={tailwind('items-center my-3 py-2 px-10 rounded-lg border border-green-400')}>
            <Text 
              style={tailwind('text-base text-green-400')}
            >Pick an image from gallery</Text>
          </TouchableOpacity>
          {/* <Button title="Pick an image from gallery" onPress={pickLicense} /> */}
          {license && <Image source={{ uri: license.uri }} style={{ width: 200, height: 200 }} />}
          {
            error.licenseUrl ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.licenseUrl}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>PRICE</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, 'price')}
            style={tailwind('px-3 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
          {
            error.price ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.price}</Text> 
              </View>
            ): <Text></Text>
          }
        </View>
        <View style={tailwind('mt-5')}>
          <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>ABOUT</Text>
          <TextInput
            onChangeText={(text) => handleChange(text, 'about')}
            style={tailwind('px-3 py-2 bg-white text-xl text-gray-500 border-b border-green-400 rounded-xl')}
          ></TextInput>
          {
            error.about ? (
              <View style={tailwind('flex flex-row items-center')}>
                <Ionicons style={tailwind('mx-1 text-red-400 text-lg')} name='warning-outline'/>
                <Text style={tailwind('text-sm text-red-400')}>{error.about}</Text> 
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
          style={tailwind('items-center py-3 mt-8 rounded-full bg-green-400')}>
          <Text 
            style={tailwind('text-xl text-gray-100')}
          >SIGN UP</Text>
        </TouchableOpacity>
        <View style={tailwind('flex flex-row my-5 justify-center items-center')}>
          <Text style={tailwind('text-gray-400 text-lg')}>Already have an account?, </Text>
          <Text 
            onPress={() => navigation.navigate('Signin')}
            style={tailwind('text-green-400 text-lg')}
          >Sign in</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

