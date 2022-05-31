import { Box, Center, color, Grid, GridItem, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Image from 'next/image';
import { Fragment } from 'react';

function typeColor(typeName){
  switch(typeName){
    case "normal":
      return "#A8A77A";
    case "fire":
      return "#EE8130";
    case "water":
      return "#6390F0";
    case "electric":
      return "#F7D02C";
    case "grass":
      return "#7AC74C";
    case "ice":
      return "#96D9D6";
    case "fighting":
      return "#C22E28";
    case "poison":
      return "#A33EA1";
    case "ground":
      return "#E2BF65";
    case "flying":
      return "#A98FF3";
    case "psychic":
      return "#F95587";
    case "bug":
      return "#A6B91A";
    case "rock":
      return "#B6A136";
    case "ghost":
      return "#735797";
    case "dragon":
      return "#6F35FC";
    case "dark":
      return "#705746";
    case "steel":
      return "#B7B7CE";
    case "fairy":
      return "#D685AD";
    default:
      return "white";
  }
}

const Home: NextPage = ({graphQLData}) => {

  console.log(graphQLData.data);

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



        {graphQLData.data.pokemon_v2_pokemon.map((pokemon, i) => (
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
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px" textAlign="center">
              <Center height="100%">
                {pokemon.pokemon_v2_pokemontypes.map((elementType) => (
                  <Box paddingRight="5px">
                    <Box bg={typeColor(elementType.pokemon_v2_type.name)} 
                      paddingLeft="3px" 
                      paddingRight="3px" 
                      borderRadius="4px"
                      color="black">
                      {elementType.pokemon_v2_type.name}
                    </Box>
                  </Box>
                ))}
              </Center>
            </GridItem>
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px" textAlign="center"></GridItem>
            <GridItem colSpan={6} rowSpan={1} bg="gray.800" borderRadius="5px" textAlign="center"></GridItem>
          </Fragment>
        ))}
      </Grid>
    </Box>
  )
}

export async function getServerSideProps({ res }) {

  const graphQL = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
      "content-type": "application/json",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-method-used": "graphiql"
    },
    "referrer": "https://beta.pokeapi.co/graphql/console/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"query\":\"query samplePokeAPIquery {pokemon_v2_pokemon(where: {id: {_lte: 151}}) {  name  id  pokemon_v2_pokemontypes {    pokemon_v2_type {      name    }  }  pokemon_v2_pokemonstats {    base_stat    stat_id  }  pokemon_v2_pokemonabilities {    pokemon_v2_ability {      name    }  }}\\n}\",\"variables\":null,\"operationName\":\"samplePokeAPIquery\"}",
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  });

  const graphQLData = await graphQL.json();

  console.log(graphQLData);

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=10000, stale-while-revalidate=59'
  )

  return {
    props: {graphQLData},
  }
}

export default Home
