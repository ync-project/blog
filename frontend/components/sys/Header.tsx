import { useRouter } from 'next/router'
import Link from 'next/link'
import { signIn, signOut, useSession } from "next-auth/react"

export default function HeaderPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const loading = status === "loading"
  const isActive: (pathname: string) => string = (pathname) =>
    router.pathname === pathname ? 'is-active' : '';


  return (
    <>
      <div>
        {!session && (
          <>
              <div>
                You are not signed in
              </div>
              <a
                href={`/api/auth/signin`}
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

            <div className="flex w-xl divide-x-2 divide-none">
            <img className="h-10 w-10 rounded-full" src={session.user.image}  referrerPolicy="no-referrer" alt="" />
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{session.user.name}</p>
                    <p className="text-sm text-gray-500">{session.user.email}</p>
                  </div>
                <button className="
                        px-3 py-3 text-sm text-purple-600 font-semibold rounded-full 
                        border border-purple-200 
                        hover:text-white hover:bg-purple-600 hover:border-transparent 
                        focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                >Message</button>
            <a className="
                        px-3 py-3 text-sm text-purple-600 font-semibold rounded-full 
                        border border-purple-200 
                        hover:text-white hover:bg-purple-600 hover:border-transparent 
                        focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2"
                href={`/api/auth/signout`}
                onClick={(e:any) => {
                  e.preventDefault()
                  signOut({
                    callbackUrl: `/`
                  })
                }}
              >
                Sign out
            </a>
            </div>  

          </>    
        )}  
      </div>
      <div>
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
      </div>
    </>
  )
}
