import NextHead from 'next/head'
import Header from './Header'

import Footer from "./footer"
import { DarkModeSwitch } from './DarkModeSwitch'
import { Container } from './Container'
interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Container height="100vh">
      <NextHead>
        <link rel="icon" href="/static/favicon.ico" />
      </NextHead>  
      <Header />
        {children}
      <DarkModeSwitch />
      <Footer />
    </Container>
  )
}

