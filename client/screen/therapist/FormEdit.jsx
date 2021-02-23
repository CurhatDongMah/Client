import React, { useState, useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View, SafeAreaView, useWindowDimensions, Button, Image, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import tailwind from 'tailwind-rn'
import { Datepicker } from '@ui-kitten/components'
import { Radio, RadioGroup} from '@ui-kitten/components'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { editTherapist } from '../../store/actions/therapist'
import { useDispatch, useSelector } from 'react-redux'
import * as ImagePicker from 'expo-image-picker';
import handleUpload from '../../helpers/handleUpload'


export default function EditForm({ navigation }) {
  const widthWindow = useWindowDimensions().width
  const { therapist, loading, error} = useSelector(state => state.therapist)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [birthDate, setBirthDate] = useState(new Date(therapist.birthDate))
  const [error, setError] = useState({})
  const [image, setImage] = useState({});
  const [license, setLicense] = useState({});
  const [value, setValue] = useState({
    fullName: therapist.fullName,
    photoUrl: therapist.photoUrl,
    city: therapist.city,
    birthDate,
    price: therapist.price,
    licenseUrl: therapist.licenseUrl,
    about: therapist.about
  })
  const dispatch = useDispatch()
  const now = new Date()
  
  useEffect(() => {
    if (therapist.gender === 'female') setSelectedIndex(0)
    else setSelectedIndex(1)
    setImage({uri: therapist.photoUrl})
    setLicense({uri: therapist.licenseUrl})
  }, [])
  useEffect(() => {
    setValue({...value, birthDate: birthDate})
  }, [birthDate])
  useEffect(() => {
    selectedIndex === 1 ? setValue({...value, gender: 'male'}) : setValue({...value, gender: 'female'})
  }, [selectedIndex])

  const handleChange = (text, name) => {
    setError({})
    setValue({ ...value, [name]: text})
  }

  const handleSubmit = () => {
    if (!value.fullName) setError({...error, fullName: 'Required'})
    else if (!value.photoUrl) setError({...error, photoUrl: 'Required'})
    else if (!value.birthDate) setError({...error, birthDate: 'Required'})
    else if (!value.city) setError({...error, city: 'Required'})
    else if (!value.licenseUrl) setError({...error, licenseUrl: 'Required'})
    else if (!value.price) setError({...error, price: 'Required'})
    else if (!value.about) setError({...error, about: 'Required'})
    else {
      dispatch(editTherapist(value, therapist.id))
      navigation.navigate('Profile')
    }
    // else console.log(value);
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


  if (error) {
    return (
      <View style={tailwind('flex-1 justify-center items-center bg-white')}>
        <Image 
          style={tailwind('w-full h-80')}
          source={require('../../assets/error.png')}
        />
        <Text style={tailwind('py-2 text-lg text-gray-400 font-bold tracking-wider')}>Oppss, something error...</Text>
      </View>
    )
  } else if (loading) {
    return (
      <View style={tailwind('flex-1 justify-center items-center')}>
        <ActivityIndicator color="34D399" size="large" />
      </View>
    )
  } else {
    return (
      <SafeAreaView style={tailwind('flex-1 items-center justify-center bg-white')}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ width: widthWindow * 8 / 10, marginTop: 40 }}
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
            <Button title="Pick an image from gallery" onPress={pickImage} />
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
          <View style={tailwind('mt-5')}>
            <Text style={tailwind('text-lg text-gray-400 tracking-wider')}>LICENSE URL</Text>
            <Button title="Pick an image from gallery" onPress={pickLicense} />
            {image && <Image source={{ uri: license.uri }} style={{ width: 200, height: 200 }} />}
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
              value={value.price.toString()}
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
              value={value.about}
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
            style={tailwind('mb-5 items-center py-3 mt-8 rounded-full bg-green-400')}>
            <Text 
              style={tailwind('text-xl text-gray-100')}
            >SUBMIT</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

