import { useRouter } from 'next/router'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"
import {Header, NotSignedInText, SignedInStatus, Avatar,
  Abutton, PrimaryButton, NavItems } from '../../styles/styles'

export default function HeaderPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const isActive: (pathname: string) => string = (pathname) =>
    router.pathname === pathname ? 'is-active' : '';


  return (
    <Header>
      <SignedInStatus>
        {!session && (
          <>
              <NotSignedInText>
                You are not signed in
              </NotSignedInText>
              <PrimaryButton
                href={`/api/auth/signin`}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </PrimaryButton>
            </>
        )}
        {session?.user && (
          <>
            {session.user.image && (
                <Avatar
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                />
            )}
            <span>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
            </span>
            <Abutton
                href={`/api/auth/signout`}
                onClick={(e:any) => {
                  e.preventDefault()
                  signOut({
                    callbackUrl: `/`
                  })
                }}
              >
                Sign out
            </Abutton>
          </>    
        )}  
      </SignedInStatus>
      <NavItems>
        <Link href="/">
          <a className={isActive('/')}>Home</a>
        </Link>
        <Link href="/posts">
          <a className={isActive('/posts')}>Posts-Scroll</a>
        </Link>
        <Link href="/about">
          <a className={isActive('/about')}>About</a>
        </Link>
        <Link href="/api-example">
          <a className={isActive('/api-example')}>API</a>
        </Link>

        { status === 'authenticated' && (
          <>
            <Link href="/drafts">
              <a className={isActive('/drafts')}>My drafts</a>
            </Link>
            <Link href="/admin">
              <a className={isActive('/admin')}>Admin</a>
            </Link>
            <Link href="/users">
              <a className={isActive('/users')}>User</a>
            </Link>
            <Link href="/client-only">
              <a className={isActive('/client-only')}>
                Client-Only
              </a>
            </Link>
            <Link href="/ssr">
              <a className={isActive('/ssr')}>SSR</a>
            </Link>
            <Link href="/ssr">
              <a className={isActive('/ssr')}>SSR</a>
            </Link>
            <Link href="/ssg">
              <a className={isActive('/ssg')}>SSG</a>
            </Link>
            <Link href="/protected">
              <a className={isActive('/protected')}>Protected</a>
            </Link>
            <Link href="/drafts/create">
                <button>
                    <a>New post</a>
                </button>
            </Link>
          </>  
        )}
      </NavItems>
    </Header>
  )
}
