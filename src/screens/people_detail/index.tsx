import React, { useLayoutEffect } from 'react';
import { View, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { Box, Center, Heading, HStack, Text, VStack } from 'native-base';
import { RootStackScreenProps } from '@navigation';
import { LogoYellow } from '@assets';
import { ProfileSection, StarshipSection, VehicleSection } from './components';
import { FilmsSection } from './components/films_section';

const PeopleDetail = ({ navigation, route }: RootStackScreenProps<'PeopleDetail'>) => {
  const { people } = route.params;

  const { width } = useWindowDimensions()

  useLayoutEffect(() => {
    navigation.setOptions({ title: people.name })
  }, [])

  return (
    <ScrollView style={styles.container}>
      <VStack p="5" space='5'>
        <ProfileSection people={people} />
        <FilmsSection people={people} />
        <VehicleSection people={people} />
        <StarshipSection people={people} />
      </VStack>
    </ScrollView>
  )
}

export default PeopleDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  }
})