import {Grid, GridItem, SimpleGrid, Box} from '@chakra-ui/react'

export default function App(){
    return (
        <Box m="2">
            <Grid
                h='200px'
                templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
                >
                <GridItem rowSpan={2} colSpan={1} bg='tomato' />
                <GridItem colSpan={2} bg='papayawhip' />
                <GridItem colSpan={2} bg='papayawhip' />
                <GridItem colSpan={4} bg='tomato' />
            </Grid>
            <Grid templateColumns='repeat(5, 1fr)' gap={4} mt='4'>
                <GridItem colSpan={2} h='10' bg='tomato' />
                <GridItem colStart={4} colEnd={6} h='10' bg='papayawhip' />
            </Grid>

            <SimpleGrid minChildWidth='120px' spacing={10} mt="4">
                <Box bg='yellow.200' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
            </SimpleGrid>
        </Box>
    )
}