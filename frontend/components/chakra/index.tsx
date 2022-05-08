import { Box, VStack, Container, Text, HStack, Spacer, Flex, Grid,
    Heading, Button, ButtonGroup } from "@chakra-ui/react"

export const H1 = ({children}: any) => <Heading as="h1" fontSize={"9xl"}>{children}</Heading> 
export const H2 = ({children}: any) => <Heading as="h2" fontSize={"7xl"}>{children}</Heading> 
export const H3 = ({children}: any) => <Heading as="h3" fontSize={"5xl"}>{children}</Heading> 
export const H4 = ({children}: any) => <Heading as="h4" fontSize={"3xl"}>{children}</Heading> 
export const H5 = ({children}: any) => <Heading as="h5" fontSize={"2xl"}>{children}</Heading> 
export const H6 = ({children}: any) => <Heading as="h6" fontSize={"lg"}>{children}</Heading> 

export function Feature({ title, desc, ...rest }: any) {
    return (
      <Box p={5} shadow='md' borderWidth='1px' {...rest}>
        <Heading fontSize='xl'>{title}</Heading>
        <Text mt={4}>{desc}</Text>
      </Box>
    )
  }
