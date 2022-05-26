import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View } from 'react-native';
import { RootStackScreenProps } from '@navigation';
import { People } from 'types';
import axios from 'axios';

const PeopleList = ({ navigation, route } : RootStackScreenProps<'PeopleList'>) => {
  const { film } = route.params;
  const [peoples, setPeoples] = useState<People[]>([]);
  
  useEffect(() => {
    const fetchPeoples = async () => {
      try {
        const peoples = await Promise.all(film.characters.map((url) => axios.get(url).then((res) => res.data)));

        setPeoples(peoples);
      } catch (error) {
        
      }
    }
  }, [film])

  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Star Wars: ' + film.title })
  }, [])

  return (
    <View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)'}}>
      
    </View>
  )
}

export default PeopleList;