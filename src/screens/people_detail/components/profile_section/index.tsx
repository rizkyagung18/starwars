import React from "react";
import { Box, Center, Heading, HStack, Text, VStack } from 'native-base';
import { People } from "@types";
import { LogoWhite } from "@assets";

type Props = {
  people: People
}

export const ProfileSection: React.FC<Props> = ({ people }) => {
  return (
    <VStack space='3'>
      <Heading fontWeight='normal'>Profile</Heading>
      <Box bgColor='gray.800' rounded='lg' padding='10' width='100%' >
        <Center>
          <LogoWhite />
        </Center>
      </Box>
      <HStack justifyContent='space-between'>
        <Text color='gray.400'>Name</Text>
        <Text>{people.name}</Text>
      </HStack>
      <HStack justifyContent='space-between'>
        <Text color='gray.400'>Height</Text>
        <Text>{people.height} cm</Text>
      </HStack>
      <HStack justifyContent='space-between'>
        <Text color='gray.400'>Birth Year</Text>
        <Text>{people.birth_year}</Text>
      </HStack>
      <HStack justifyContent='space-between'>
        <Text color='gray.400'>Gender</Text>
        <Text textTransform='capitalize'>{people.gender}</Text>
      </HStack>
    </VStack>
  )
}