import React, { useState, useEffect } from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';
import { Box, Center, Heading, HStack, Skeleton, Text, useToast, VStack } from 'native-base';
import axios, { AxiosError } from 'axios';
import { People, Film, ErrorResponse } from "@types";
import { LogoYellow } from "@assets";

type Props = {
  people: People
}

export const FilmsSection: React.FC<Props> = ({ people }) => {
  const [films, setFilms] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { width } = useWindowDimensions();
  const toast = useToast();

  useEffect(() => {
    const fetchFilms = async () => {
      setIsLoading(true);
      try {
        const films = await Promise.all(people.films.map((url) => axios.get(url).then(res => res.data)));

        setFilms(films)
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>
        toast.show({
          description: err.response?.data.detail || 'Unknown Error'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchFilms();
  }, [people])

  if(isLoading) {
    return (
      <VStack space='3'>
        <Heading fontWeight='normal'>Films</Heading>
        <HStack space='3'>
          <Skeleton width={width / 3} rounded='lg' height='48' />
          <Skeleton width={width / 3} rounded='lg' height='48' />
          <Skeleton width={width / 3} rounded='lg' height='48' />
        </HStack>
      </VStack>
    )
  }

  return (
    <VStack space='3'>
      <Heading fontWeight='normal'>Films</Heading>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space='3'>
        {films.length ? films.map((film, idx) => (
          <Box key={idx} width={width / 3} rounded='lg' overflow='hidden'>
            <Box bgColor='gray.800' py='8' px='5'>
              <Center>
                <LogoYellow width={90} height={80} />
              </Center>
            </Box>
            <Box p='3' bgColor='white'>
              <Text numberOfLines={2}>Star Wars: {film.title}</Text>
            </Box>
          </Box>
        )) : <Text color='gray.400'>Belum ada data.</Text>}
        </HStack>
      </ScrollView>
    </VStack>
  )
}