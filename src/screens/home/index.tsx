import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import axios from 'axios';
import { Center, VStack } from 'native-base';
import { LogoBlack } from '@assets';
import { RootStackScreenProps } from '@navigation';
import { Film } from '@types';
import { SearchBar } from '@components';
import { Card } from './components';

const Home = ({ navigation } : RootStackScreenProps<'Home'>) => {
  const [search, setSearch] = useState("");
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await axios.get('https://swapi.dev/api/films');
        const { results } = response.data;
        setFilms(results)
      } catch (error) {
        console.log(error)
      }
    }

    fetchFilms();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <VStack p='6' space={5}>
          <Center>
            <LogoBlack />
          </Center>
          <SearchBar value={search} onChangeText={setSearch} placeholder="Search Star Wars Film" />
          {films.map((film, idx) => (
            <Card key={idx} film={film} navigation={navigation} />
          ))}
        </VStack>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home;