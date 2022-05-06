import { Stack, HStack, VStack, Box, StackDivider,
        Heading, Text} from '@chakra-ui/react'

function Feature({ title, desc, ...rest }: any) {
    return (
      <Box p={5} shadow='md' borderWidth='1px' {...rest}>
        <Heading fontSize='xl'>{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    )
  }
export default function App(){
    return (
        <>
            <HStack spacing='24px'>
            <Box w='40px' h='40px' bg='yellow.200'>
                1
            </Box>
            <Box w='40px' h='40px' bg='tomato'>
                2
            </Box>
            <Box w='40px' h='40px' bg='pink.100'>
                3
            </Box>
            </HStack>
            <Stack direction={['column', 'row']} spacing='24px' mt="4">
                <Box w='40px' h='40px' bg='yellow.200'>
                    1
                </Box>
                <Box w='40px' h='40px' bg='tomato'>
                    2
                </Box>
                <Box w='40px' h='40px' bg='pink.100'>
                    3
                </Box>
            </Stack>
            <a>Stack Dividers</a>
            <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch' m='2' 
                border='1px' borderColor='gray.200' borderRadius='2xl' p='2'
                >
                <Box h='40px' bg='yellow.200'>
                    1
                </Box>
                <Box h='40px' bg='tomato'>
                    2
                </Box>
                <Box h='40px' bg='pink.100'>
                    3
                </Box>
            </VStack>    
            <a>Stack items horizontally</a>       
            <Stack spacing={8} direction='row' m="4">
                <Feature
                    title='Plan Money'
                    desc='The future can be even brighter but a goal without a plan is just a wish'
                />
                <Feature
                    title='Save Money'
                    desc='You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process'
                />
            </Stack>
            <HStack spacing={8} m="4">
                <Feature
                    title='Plan Money'
                    desc='The future can be even brighter but a goal without a plan is just a wish'
                />
                <Feature
                    title='Save Money'
                    desc='You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process'
                />
            </HStack>
      </>  
    )
}