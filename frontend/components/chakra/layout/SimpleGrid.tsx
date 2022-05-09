import { SimpleGrid, Box } from "@chakra-ui/react"

export default function Home(){
    return (
        <>
        <SimpleGrid columns={2} spacing={10}>
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        </SimpleGrid>    
        <SimpleGrid columns={[2, null, 3]} spacing='40px'>
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        <Box bg='tomato' height='80px'></Box>
        </SimpleGrid>
        </>
    )    
  }
  