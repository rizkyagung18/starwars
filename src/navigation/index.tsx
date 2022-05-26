import React from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Home, PeopleDetail, PeopleList } from '@screens';
import { Film, People } from '@types';

export type RootStackParamList = {
  Home: undefined;
  PeopleList: { film: Film };
  PeopleDetail: { people: People };
}

export type RootStackScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>

const MainStack = createNativeStackNavigator<RootStackParamList>();

const AppContainer = () => {
  return (
    <MainStack.Navigator screenOptions={{ headerBackTitleVisible: false }}>
      <MainStack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <MainStack.Screen name='PeopleList' component={PeopleList} />
      <MainStack.Screen name='PeopleDetail' component={PeopleDetail} />
    </MainStack.Navigator>
  )
}

export default AppContainer;