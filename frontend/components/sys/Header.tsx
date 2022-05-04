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
            <div className="flex w-xl">
            <img className="block mx-auto h-12 rounded-full sm:mx-0 sm:shrink-0" 
                  src={session.user.image} alt="Woman's Face"/>
                {session.user.email ?? session.user.name}
                <p className="text-slate-500 font-sm">
                  Product Engineer
                </p>
              <button className="
                      px-3 py-3 text-sm text-purple-600 font-semibold rounded-full 
                      border border-purple-200 
                      hover:text-white hover:bg-purple-600 hover:border-transparent 
                      focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
              >Message</button>
            </div>  
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
