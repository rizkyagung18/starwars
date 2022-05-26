import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import AppContainer from '@navigation';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AppContainer/>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App;