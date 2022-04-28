import { useRouter } from 'next/router'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./Header.module.css"

export default function Header() {
  const { pathname } = useRouter()
  const { data: session, status } = useSession()
  const loading = status === "loading"

  return (
    <>
      <div className={styles.signedInStatus}>
        <p
          className={`nojs-show ${
            !session && loading ? styles.loading : styles.loaded
          }`}
        >
          {!session && (
            <>
              <span className={styles.notSignedInText}>
                You are not signed in
              </span>
              <a
                href={`/api/auth/signin`}
                className={styles.buttonPrimary}
                onClick={(e) => {
                  e.preventDefault()
                  signIn()
                }}
              >
                Sign in
              </a>
            </>
          )}
          {session?.user && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url('${session.user.image}')` }}
                  className={styles.avatar}
                />
              )}
              <span className={styles.signedInText}>
                <small>Signed in as</small>
                <br />
                <strong>{session.user.email ?? session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className={styles.button}
                onClick={(e) => {
                  e.preventDefault()
                  signOut()
                }}
              >
                Sign out
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <Link href="/">
          <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
        </Link>
        <Link href="/posts">
          <a className={pathname === '/posts' ? 'is-active' : ''}>Posts-Scroll</a>
        </Link>
        <Link href="/about">
          <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
        </Link>
        <Link href="/api-example">
              <a className={pathname === '/api-example' ? 'is-active' : ''}>API</a>
            </Link>

        { status === 'authenticated' && (
          <>
            <Link href="/admin">
              <a className={pathname === '/admin' ? 'is-active' : ''}>Admin</a>
            </Link>
            <Link href="/users">
              <a className={pathname === '/users' ? 'is-active' : ''}>User</a>
            </Link>
            <Link href="/client-only">
              <a className={pathname === '/client-only' ? 'is-active' : ''}>
                Client-Only
              </a>
            </Link>
            <Link href="/ssr">
              <a className={pathname === '/ssr' ? 'is-active' : ''}>SSR</a>
            </Link>
            <Link href="/ssg">
              <a className={pathname === '/ssg' ? 'is-active' : ''}>SSG</a>
            </Link>
            <Link href="/protected">
              <a className={pathname === '/protected' ? 'is-active' : ''}>Protected</a>
            </Link>
          </>
          )}
          <style jsx>{`
          header {
            margin-bottom: 25px;
          }
          a {
            font-size: 14px;
            margin-right: 15px;
            text-decoration: none;
          }
          .is-active {
            text-decoration: underline;
          }
        `}</style>
      </nav>
    </>  
  )
}
