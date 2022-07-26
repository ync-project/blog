import Link from "next/link"
import packageJSON from "../../package.json"
import { Footer } from './Footer'

export default function FooterPage() {
  return (
    <Footer>
      <hr />
      <ul className="navItems">
        <li className="navItem">
          <a href="https://next-auth.js.org">Documentation</a>
        </li>
        <li className="navItem">
          <a href="https://www.npmjs.com/package/next-auth">NPM</a>
        </li>
        <li className="navItem">
          <a href="https://github.com/nextauthjs/next-auth-example">GitHub</a>
        </li>
        <li className="navItem">
          <Link href="/policy">
            <a>Policy</a>
          </Link>
        </li>
        <li className="navItem">
          <em>next-auth@{packageJSON.dependencies["next-auth"]}</em>
        </li>
      </ul>
    </Footer>

  )
}
