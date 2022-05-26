import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import axios, { AxiosError } from 'axios';
import { Heading, VStack, Spinner, useToast } from 'native-base';
import { RootStackScreenProps } from '@navigation';
import { ErrorResponse, People } from '@types';
import { ListTile } from './components';

const PeopleList = ({ navigation, route } : RootStackScreenProps<'PeopleList'>) => {
  const { film } = route.params;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [peoples, setPeoples] = useState<People[]>([]);

  const toast = useToast();
  
  useEffect(() => {
    const fetchPeoples = async () => {
      setIsLoading(true)
      try {
        const peoples = await Promise.all(film.characters.map((url) => axios.get(url).then((res) => res.data)));
        setPeoples(peoples);
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>
        toast.show({
          description: err.response?.data.detail || 'Unknown Error'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPeoples()
  }, [film])

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Star Wars: ' + film.title })
  }, [])

  if(isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Spinner accessibilityLabel='Loading data' />
      </View>
    )
  }

  return (
    <ScrollView style={styles.container}>
      <VStack p='5' space='3'>
        <Heading py='3' fontWeight='medium'>Cast</Heading>
        {peoples.map((people, idx) => (
          <ListTile key={idx} people={people} navigation={navigation} />
        ))}
      </VStack>
    </ScrollView>
  )
}

export default PeopleList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
})