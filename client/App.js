import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SigninForm from './screen/SigninForm'
import SignupFormClient from './screen/client/SignupForm'
import SignupFormTherapist from './screen/therapist/SignupForm'
import Confirm from './screen/Confirm'
import ClientPage from './screen/client/ClientPage'
import TherapistPage from './screen/therapist/TherapistPage'
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { Provider } from 'react-redux'
import store from './store'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator 
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Signin" component={SigninForm} />
            <Stack.Screen name="Confirm" component={Confirm} />
            <Stack.Screen name="SignupClient" component={SignupFormClient} />
            <Stack.Screen name="SignupTherapist" component={SignupFormTherapist} />
            <Stack.Screen name="ClientPage" component={ClientPage} />
            <Stack.Screen name="TherapistPage" component={TherapistPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </Provider>
  );
}


// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SigninForm from './screen/SigninForm'
// import SignupFormClient from './screen/client/SignupForm'
// import SignupFormTherapist from './screen/therapist/SignupForm'
// import Confirm from './screen/Confirm'
// import ClientPage from './screen/client/ClientPage'
// import TherapistPage from './screen/therapist/TherapistPage'
// import * as eva from '@eva-design/eva';
// import { ApplicationProvider } from '@ui-kitten/components';
// import { Provider } from 'react-redux'
// import store from './store'
// import * as SecureStore from 'expo-secure-store'

// const Stack = createStackNavigator();

// export default function App() {
//   const [token, setToken] = useState('')
//   useEffect(() => {
//     const getToken = async () => {
//       try {
//         let cekToken = await SecureStore.getItemAsync('access_token')
//         setToken(cekToken)
//       } catch (err) {
//         console.log(err);
//       }
//     };
//     getToken();
//   }, []);


//   return (
//     <Provider store={store}>
//       <ApplicationProvider {...eva} theme={eva.light}>
//         <NavigationContainer>
//           <Stack.Navigator screenOptions={{ headerShown: false }}>
//           {
//             token 
//             ? (
//               <>
//                 <Stack.Screen name="ClientPage" component={ClientPage} />
//                 <Stack.Screen name="TherapistPage" component={TherapistPage} />
//               </>
//               ) : (
//               <>
//                 <Stack.Screen name="Signin" component={SigninForm} />
//                 <Stack.Screen name="Confirm" component={Confirm} />
//                 <Stack.Screen name="SignupClient" component={SignupFormClient} />
//                 <Stack.Screen name="SignupTherapist" component={SignupFormTherapist} />
//               </> 
//             )
//           }
//           </Stack.Navigator>
//         </NavigationContainer>
//       </ApplicationProvider>
//     </Provider>
//   );
// }




