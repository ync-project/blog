import NextHead from 'next/head'
import Header from './Header'

import Footer from "./footer"

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <>
      <NextHead>
        <link rel="icon" href="/static/favicon.ico" />
      </NextHead>  
      <Header />
      <main >
        {children}
      </main>
      <Footer />
    </>
  )
}

