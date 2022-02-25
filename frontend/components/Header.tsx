import Link from "next/link"
import { useRouter } from "next/router"
import { useTranslation } from 'react-i18next';
import { i18n, Language } from '../lib/i18n';
import { useApolloClient } from '@apollo/client';

// function isActive(pathname) {
//   return (
//     typeof document !== "undefined" && document.location.pathname === pathname
//   )
// }

const Header = () => {
  const router = useRouter()

  function isActive(pathname) {
    return router.pathname === pathname
  }

  const [t] = useTranslation('common');
  const apolloClient = useApolloClient();
  const handleClick: React.MouseEventHandler = () => {
    const currentLanguage = i18n.language;

    i18n.changeLanguage(
      currentLanguage === Language.EN ? Language.RU : Language.EN,
    );
  };

  return (
    <nav>
      <div className="left">
        <Link href="/">
          <a className="bold" data-active={isActive("/")}>
            Blog
          </a>
        </Link>
        <Link href="/drafts">
          <a data-active={isActive("/drafts")}>Drafts</a>
        </Link>
      </div>
      <div className="right">
            {t('greetings', { version: apolloClient.version })}
      </div>
      <div className="right">
        <button onClick={handleClick}>Change language</button>
        <Link href="/signup">
          <a data-active={isActive("/signup")}>Signup</a>
        </Link>
        <Link href="/create">
          <a data-active={isActive("/create")}>+ Create draft</a>
        </Link>
      </div>
      <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }

        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        .left a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }

        .right {
          margin-left: auto;
        }

        .right a {
          border: 1px solid black;
          padding: 0.5rem 1rem;
          border-radius: 3px;
        }
      `}</style>
    </nav>
  )
}

export default Header
