import NextHead from 'next/head'
import Header from './Header'
import Button from '@mui/material/Button';

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <div >
      <Button variant="contained">Hello World</Button>;

      {children}
    </div>
  )
}

