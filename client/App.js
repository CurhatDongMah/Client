// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SigninForm from './screen/SigninForm'
// import SignupForm from './screen/client/SignupForm'
// import Confirm from './screen/Confirm'
// import ClientPage from './screen/client/ClientPage'
// import TherapistPage from './screen/therapist/TherapistPage'

// const Stack = createStackNavigator();

// export default function App() {
//   return (
    // <NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen name="Signin" component={SigninForm} />
    //     <Stack.Screen name="Confirm" component={Confirm} />
    //     <Stack.Screen name="Signup" component={SignupForm} />
    //     <Stack.Screen name="ClientPage" component={ClientPage} />
    //     <Stack.Screen name="TherapistPage" component={TherapistPage} />
    //   </Stack.Navigator>
    // </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React from 'react';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text } from '@ui-kitten/components';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SigninForm from './screen/SigninForm'
import SignupForm from './screen/client/SignupForm'
import Confirm from './screen/Confirm'
import ClientPage from './screen/client/ClientPage'
import TherapistPage from './screen/therapist/TherapistPage'

const Stack = createStackNavigator();

export default () => (
  <ApplicationProvider {...eva} theme={eva.light}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signin" component={SigninForm} />
        <Stack.Screen name="Confirm" component={Confirm} />
        <Stack.Screen name="Signup" component={SignupForm} />
        <Stack.Screen name="ClientPage" component={ClientPage} />
        <Stack.Screen name="TherapistPage" component={TherapistPage} />
      </Stack.Navigator>
    </NavigationContainer>
  </ApplicationProvider>
);