import { SessionContextValue } from "next-auth/react"
import AccessDenied from '../sys/access-denied'

const Protect = ( {ctx, children}: {ctx: SessionContextValue, children: any} ) => {
    const { data: session, status } = ctx
    if (status === "loading") {
      return <>Loading or not authenticated...</>
    }
    if (status === "unauthenticated") {
      return <AccessDenied/>
    }
    return children
  }

export default Protect