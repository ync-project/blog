import NextHead from 'next/head'
import Header from './Header'
import { Box, VStack, Container, Text, HStack, Spacer, Flex, Grid,
  Heading, Button, ButtonGroup } from "@chakra-ui/react"

import Footer from "./footer"
import { DarkModeSwitch } from './DarkModeSwitch'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Flex bg='gray.100' >
      {children}
      <DarkModeSwitch />
    </Flex>
  )
}

