import { Box } from '@chakra-ui/react'
import type { NextPage } from 'next'

const Home: NextPage = ({data}) => {
  return (
    <Box>
      Hello World
    </Box>
  )
}

export async function getServerSideProps({ req, res }) {

  const pokemonResponse = await fetch('https://pokeapi.co/api/v2/pokemon');

  const data = await pokemonResponse.json();

  console.log(data);
  console.log("test");

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=100, stale-while-revalidate=59'
  )

  return {
    props: {data},
  }
}

export default Home
