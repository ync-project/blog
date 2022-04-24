import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Header() {
  const { pathname } = useRouter()

  return (
    <header>
      <Link href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link href="/post/postsscroll">
        <a className={pathname === '/postsscroll' ? 'is-active' : ''}>Posts-Scroll</a>
      </Link>
      <Link href="/user">
        <a className={pathname === '/user' ? 'is-active' : ''}>User</a>
      </Link>
      <Link href="/about">
        <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
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
    </header>
  )
}
