import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import axios, { AxiosError } from 'axios';
import { Center, VStack, Modal, Spinner, useToast, Skeleton, Text } from 'native-base';
import debounce from 'lodash.debounce'
import { LogoBlack } from '@assets';
import { RootStackScreenProps } from '@navigation';
import { Film, ErrorResponse } from '@types';
import { SearchBar } from '@components';
import { Card } from './components';

const Home = ({ navigation } : RootStackScreenProps<'Home'>) => {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [films, setFilms] = useState<Film[]>([]);

  const toast = useToast();

  useEffect(() => {
    const fetchFilms = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get('https://swapi.dev/api/films', { params: { search }});
        const { results } = response.data;
        setFilms(results)
      } catch (error) {
        let err = error as AxiosError<ErrorResponse>;
        toast.show({
          description: err.response?.data.detail || 'Unknown Error'
        })
      } finally {
        setIsLoading(false);
      }
    }

    fetchFilms();
  }, [search])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <VStack p='8' space={5}>
          <Center>
            <LogoBlack />
          </Center>
          <SearchBar autoFocus value={search} onChangeText={setSearch} placeholder="Search Star Wars Film" />
          {isLoading ? (
            <>
              <Skeleton key={1} rounded='lg' height='40' />
              <Skeleton key={2} rounded='lg' height='40' />
              <Skeleton key={3} rounded='lg' height='40' />
            </>
          ) : films.length ? films.map((film, idx) => (
            <Card key={idx} film={film} navigation={navigation} />
          )) : <Center><Text>Belum ada data</Text></Center>}
        </VStack>
      </ScrollView>
      <Modal isOpen={isLoading && !search} closeOnOverlayClick={false}>
        <Spinner />
      </Modal>
    </SafeAreaView>
  )
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})