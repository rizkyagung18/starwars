import React, { useState, useEffect } from 'react';
import { Box, Heading, HStack, Skeleton, Text, useToast, VStack } from 'native-base';
import axios, { AxiosError } from 'axios';
import { People, Starship, ErrorResponse } from "@types";
import { LogoWhite } from "@assets";

type Props = {
  people: People
}

export const StarshipSection: React.FC<Props> = ({ people }) => {
  const [starships, setStarships] = useState<Starship[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    const fetchStarships = async () => {
      setIsLoading(true);
      try {
        const starships = await Promise.all(people.starships.map((url) => axios.get(url).then(res => res.data)));

        setStarships(starships)
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>
        toast.show({
          description: err.response?.data.detail || 'Unknown Error'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchStarships();
  }, [people])

  if(isLoading) {
    return (
      <VStack space='3'>
        <Heading fontWeight='normal'>Starships</Heading>
        <Skeleton borderRadius='8' />
      </VStack>
    )
  }

  return (
    <VStack space='3'>
      <Heading fontWeight='normal'>Starships</Heading>
      {starships.length ? starships.map((starship, idx) => (
        <Box key={idx} width='100%' borderRadius='8' p='2' bgColor='white'>
          <HStack alignItems='center'>
            <Box px='1' py='2' mr='3' borderRadius='8' overflow='hidden' bgColor='black'>
              <LogoWhite width={40} height={35} />
            </Box>
            <VStack>
              <Text textTransform='capitalize' fontWeight='semibold'>{starship.name}</Text>
              <Text textTransform='capitalize'>{starship.model}</Text>
              <Text textTransform='capitalize' color='gray.400'>{starship.manufacturer}</Text>
            </VStack>
          </HStack>
        </Box>
      )) : <Text color='gray.400'>Belum ada data.</Text>}
    </VStack>
  )
}