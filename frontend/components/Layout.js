import Header from './Header'

const Layout = props => (
  <div>
    <Header />
    <div>{props.children}</div>
  </div>
)

export default Layout
