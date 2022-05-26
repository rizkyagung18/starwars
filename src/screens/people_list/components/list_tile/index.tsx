import React from 'react';
import { Pressable } from 'react-native';
import { Box, HStack, VStack, Text } from 'native-base';
import { LogoWhite } from '@assets';
import { People } from '@types';
import { RootStackScreenProps } from '@navigation';

type Props = {
  people: People;
  navigation: RootStackScreenProps<'PeopleList'>['navigation'];
}

export const ListTile: React.FC<Props> = ({ people, navigation }) => {
  return (
    <Pressable onPress={() => navigation.navigate('PeopleDetail', { people })}>
      <Box width='100%' borderRadius='8' p='2' bgColor='white'>
        <HStack alignItems='center'>
          <Box px='1' py='2' mr='3' borderRadius='8' overflow='hidden' bgColor='black'>
            <LogoWhite width={40} height={35} />
          </Box>
          <VStack>
            <Text>{people.name}</Text>
            <Text color='gray.400'><Text textTransform='capitalize'>{people.gender}</Text>, {people.height} cm</Text>
          </VStack>
        </HStack>
      </Box>
    </Pressable>
  )
}