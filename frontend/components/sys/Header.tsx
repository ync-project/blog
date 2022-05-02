import { useRouter } from 'next/router'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"
import styles from "./Header.module.css"

export default function Header() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

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
              <span className={styles.signedInText}>
              </span>
            </>
          )}
        </p>
      </div>
      <nav>
        <Link href="/">
          <a data-active={isActive('/')}>Home</a>
        </Link>
        <Link href="/posts">
          <a data-active={isActive('/posts')}>Posts-Scroll</a>
        </Link>
        <Link href="/about">
          <a data-active={isActive('/about')}>About</a>
        </Link>
        <Link href="/api-example">
              <a data-active={isActive('/api-example')}>API</a>
            </Link>

        { status === 'authenticated' && (
          <>
            <Link href="/posts/drafts">
              <a data-active={isActive('/posts/drafts')}>My drafts</a>
            </Link>
            <Link href="/admin">
              <a data-active={isActive('/admin')}>Admin</a>
            </Link>
            <Link href="/users">
              <a data-active={isActive('/users')}>User</a>
            </Link>
            <Link href="/client-only">
              <a data-active={isActive('/client-only')}>
                Client-Only
              </a>
            </Link>
            <Link href="/ssr">
              <a data-active={isActive('/ssr')}>SSR</a>
            </Link>
            <Link href="/ssg">
              <a data-active={isActive('/ssg')}>SSG</a>
            </Link>
            <Link href="/protected">
              <a data-active={isActive('/protected')}>Protected</a>
            </Link>
            <Link href="/posts/create">
              <button>
                <a>New post</a>
              </button>
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
          button {
            float: right;
          }
          button a {
            text-color: yellow;
            color: yellow;
          }
        `}</style>
      </nav>
    </>  
  )
}
