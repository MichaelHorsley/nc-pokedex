import { Box, Center, Grid, GridItem, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Image from 'next/image';
import { Fragment } from 'react';

const Home: NextPage = ({data}) => {

  console.log(data);

  return (
    <Box padding="100px" bg="gray.900" width="100vw" color="white">
      <Grid templateColumns="repeat(36, 1fr)" templateRows="repeat(2, 1fr)" gap={1}>
        <GridItem colSpan={6} rowSpan={2} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">No.</Center></GridItem>
        <GridItem colSpan={6} rowSpan={2} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">Pic</Center></GridItem>
        <GridItem colSpan={6} rowSpan={2} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">Name</Center></GridItem>
        <GridItem colSpan={6} rowSpan={2} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">Type</Center></GridItem>
        <GridItem colSpan={6} rowSpan={2} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">Abilities</Center></GridItem>
        <GridItem colSpan={6} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">Base Stats</Center></GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">HP</Center></GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">Att</Center></GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">Def</Center></GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">S.Att</Center></GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">S.Def</Center></GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center"><Center height="100%">Spd</Center></GridItem>

        {data.results.map((pokemon, i) => (
          <Fragment key={pokemon.name}>
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px">
              <Center height="100%">#{i+1}</Center>
            </GridItem>
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px" textAlign="center">
              <Image width="100px" height="100px" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`}/>
            </GridItem>
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px" textAlign="center">
              <Center height="100%">{pokemon.name}</Center>
            </GridItem>
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px" textAlign="center"></GridItem>
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px" textAlign="center"></GridItem>
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px" textAlign="center"></GridItem>
          </Fragment>
        ))}
      </Grid>
    </Box>
  )
}

export async function getServerSideProps({ res }) {

  const pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=151');

  const data = await pokemonResponse.json();

  console.log(data);
  console.log("test");

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10000, stale-while-revalidate=59'
  )

  return {
    props: {data},
  }
}

export default Home
