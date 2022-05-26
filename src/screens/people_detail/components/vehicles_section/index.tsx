import React, { useState, useEffect } from 'react';
import { Box, Heading, HStack, Skeleton, Text, useToast, VStack } from 'native-base';
import axios, { AxiosError } from 'axios';
import { People, Vehicle, ErrorResponse } from "@types";
import { LogoWhite } from "@assets";

type Props = {
  people: People
}

export const VehicleSection: React.FC<Props> = ({ people }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toast = useToast();

  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const vehicles = await Promise.all(people.vehicles.map((url) => axios.get(url).then(res => res.data)));

        setVehicles(vehicles)
      } catch (error) {
        const err = error as AxiosError<ErrorResponse>
        toast.show({
          description: err.response?.data.detail || 'Unknown Error'
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchVehicles();
  }, [people])

  if(isLoading) {
    return (
      <VStack space='3'>
        <Heading fontWeight='normal'>Vehicles</Heading>
        <Skeleton borderRadius='8' />
      </VStack>
    )
  }

  return (
    <VStack space='3'>
      <Heading fontWeight='normal'>Vehicles</Heading>
      {vehicles.length ? vehicles.map((vehicle, idx) => (
        <Box key={idx} width='100%' borderRadius='8' p='2' bgColor='white'>
          <HStack alignItems='center'>
            <Box px='1' py='2' mr='3' borderRadius='8' overflow='hidden' bgColor='black'>
              <LogoWhite width={40} height={35} />
            </Box>
            <VStack>
              <Text textTransform='capitalize' fontWeight='semibold'>{vehicle.name}</Text>
              <Text textTransform='capitalize'>{vehicle.model}</Text>
              <Text textTransform='capitalize' color='gray.400'>{vehicle.manufacturer}</Text>
            </VStack>
          </HStack>
        </Box>
      )) : <Text color='gray.400'>Belum ada data.</Text>}
    </VStack>
  )
}