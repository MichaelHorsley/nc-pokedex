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
