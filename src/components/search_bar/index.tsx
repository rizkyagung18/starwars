import React, { forwardRef } from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { Input, Icon } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Ref = TextInput;

export const SearchBar = forwardRef<Ref, TextInputProps>((props, ref) => {
  return (
    <Input
      variant="filled" 
      width="100%" 
      borderRadius='20'
      padding='3'
      borderWidth="0" 
      InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<Ionicons name="ios-search" />} />} 
      {...props}
    />
  )
})