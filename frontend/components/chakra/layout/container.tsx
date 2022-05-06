import { Box, VStack, Container, Text, HStack, Spacer, Flex, Grid,
        Heading, Button, ButtonGroup } from "@chakra-ui/react"


export default function App(){
    return (
      <>
        <VStack>
            <Container maxW='md' bg='blue.600' color='white'>
                "md" Container
            </Container>
            <Container maxW='550px' bg='purple.600' color='white'>
                "550px" Container
            </Container>
            <Container maxW='container.sm' bg='green.400' color='#262626'>
                "container.sm" Container
            </Container>
        </VStack>

        <Container maxW='2xl' bg='blue.600' centerContent>
            <Box padding='4' bg='blue.400' color='black' maxW='md'>
            There are many benefits to a joint design and development system. Not only
            does it bring benefits to the design team, but it also brings benefits to
            engineering teams. It makes sure that our experiences have a consistent look
            and feel, not just in our design specs, but in production.
            </Box>
        </Container>

        <Box>
            <Text>Flex and Spacer: Full width, equal Spacing</Text>
            <Flex>
                <Box w='70px' h='10' bg='red.500' />
                <Spacer />
                <Box w='170px' h='10' bg='red.500' />
                <Spacer />
                <Box w='180px' h='10' bg='red.500' />
            </Flex>

            <Text>
                Grid: The children start at the beginning, the 1/3 mark and 2/3 mark
            </Text>
            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                <Box w='70px' h='10' bg='blue.500' />
                <Box w='170px' h='10' bg='blue.500' />
                <Box w='180px' h='10' bg='blue.500' />
            </Grid>

            <Text>
                HStack: The children have equal spacing but don't span the whole container
            </Text>
            <HStack spacing='24px'>
                <Box w='70px' h='10' bg='teal.500' />
                <Box w='170px' h='10' bg='teal.500' />
                <Box w='180px' h='10' bg='teal.500' />
            </HStack>

            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box p='2'>
                    <Heading size='md'>Chakra App</Heading>
                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                    <Button colorScheme='teal'>Sign Up</Button>
                    <Button colorScheme='teal'>Log in</Button>
                </ButtonGroup>
            </Flex>
        </Box>
        </>    
        )
}