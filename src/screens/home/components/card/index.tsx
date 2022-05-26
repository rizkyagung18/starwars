import React from 'react';
import { Pressable } from 'react-native';
import { Box, Center, Text } from 'native-base';
import { LogoYellow } from '@assets';
import { Film } from '@types';
import { RootStackScreenProps } from '@navigation';

type Props = {
  film: Film;
  navigation: RootStackScreenProps<'Home'>['navigation'];
}

export const Card: React.FC<Props> = ({ film, navigation }) => {
  return (
    <Pressable onPress={() => navigation.navigate('PeopleList', { film })}>
      <Box alignItems='center'>
        <Box width='100%' rounded='lg' overflow='hidden'>
          <Box bgColor='gray.800' padding='12'>
            <Center>
              <LogoYellow />
            </Center>
          </Box>
          <Box p='3' bgColor='white'>
            <Text>Star Wars: {film.title}</Text>
          </Box>
        </Box>
      </Box>
    </Pressable>
  )
}