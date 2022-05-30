import { Box, Grid, GridItem } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Image from 'next/image';
import { Fragment } from 'react';

const Home: NextPage = ({data}) => {

  console.log(data);

  return (
    <Box padding="100px" bg="gray.900" height="100vh" width="100vw" color="white">
      <Grid templateColumns="repeat(36, 1fr)" templateRows="repeat(2, 1fr)" gap={1}>
        <GridItem colSpan={6} rowSpan={2} bg="#2b4f01" borderRadius="5px" textAlign="center">No.</GridItem>
        <GridItem colSpan={6} rowSpan={2} bg="#2b4f01" borderRadius="5px" textAlign="center">Pic</GridItem>
        <GridItem colSpan={6} rowSpan={2} bg="#2b4f01" borderRadius="5px" textAlign="center">Name</GridItem>
        <GridItem colSpan={6} rowSpan={2} bg="#2b4f01" borderRadius="5px" textAlign="center">Type</GridItem>
        <GridItem colSpan={6} rowSpan={2} bg="#2b4f01" borderRadius="5px" textAlign="center">Abilities</GridItem>
        <GridItem colSpan={6} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center">Base Stats</GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center">HP</GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center">Att</GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center">Def</GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center">S.Att</GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center">S.Def</GridItem>
        <GridItem colSpan={1} rowSpan={1} bg="#2b4f01" borderRadius="5px" textAlign="center">Spd</GridItem>

        {data.results.map((pokemon, i) => (
          <Fragment key={pokemon.name}>
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px" textAlign="center">#{i+1}</GridItem>
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px" textAlign="center">
              <Image width="100px" height="100px" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${i+1}.png`}/>
            </GridItem>
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px" textAlign="center">{pokemon.name}</GridItem>
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
