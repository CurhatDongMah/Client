import React from 'react';
import { useSelector } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SigninForm from './screen/SigninForm'
import SignupFormClient from './screen/client/SignupForm'
import SignupFormTherapist from './screen/therapist/SignupForm'
import Confirm from './screen/Confirm'
import ClientPage from './screen/client/ClientPage'
import TherapistPage from './screen/therapist/TherapistPage'

const Stack = createStackNavigator();

export default function App2() {
  const { isClientSignin } = useSelector(state => state.client)
  const { isTherapistSignin } = useSelector(state => state.therapist)
  return (
    <NavigationContainer>
      {
        isClientSignin ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="ClientPage" component={ClientPage} />
          </Stack.Navigator>
        ) : isTherapistSignin ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TherapistPage" component={TherapistPage} />
          </Stack.Navigator>
        ):(
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Signin" component={SigninForm} />
            <Stack.Screen name="Confirm" component={Confirm} />
            <Stack.Screen name="SignupClient" component={SignupFormClient} />
            <Stack.Screen name="SignupTherapist" component={SignupFormTherapist} />
          </Stack.Navigator>
        )
      }
    </NavigationContainer>    
  );
}