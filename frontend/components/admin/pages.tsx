
import Protect from './protect'
import Submit from '../../components/form/Submit'
import UserList from '../../components/user/UserList'

export const UserProtect = ({ctx}: any) => Protect({ctx, children: 
    <><Submit /><UserList /></>
  })
  
const _Protected = (ctx: any) => {
    const { data: session, status } = ctx
    return <p>Hi {session?.user?.name} User is logged in</p>
}
  
export const Protected = ({ctx}: any) => (
  Protect({ctx, children: _Protected(ctx)}) 
)

