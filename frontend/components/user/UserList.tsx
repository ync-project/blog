import { gql, useQuery, NetworkStatus } from '@apollo/client'
import { UsersDocument, UsersQuery, User } from '../../types/graphql_generated'
import ErrorMessage from '../etc/ErrorMessage'
import { DEFAULT_PAGE_TAKE, Edge } from '../../types/app_types'  
import { useSession } from "next-auth/react"

export function UserList() {
  const { data: session, status } = useSession()
  const { loading, error, data, fetchMore, networkStatus } = useQuery<UsersQuery>(
    UsersDocument,
    {
      variables:  { take: DEFAULT_PAGE_TAKE },
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  )

  const loadingMoreUsers = networkStatus === NetworkStatus.fetchMore


  if (error) return <ErrorMessage message="Error loading users." />
  if (loading && !loadingMoreUsers) return <div>Loading</div>
  if (!data) { return <span>No product!</span>; }

  const users = data.users?.edges?.map((edge) => (edge as Edge<number, User>).node) || [];
  const {endCursor, hasMore, totalCount} = data.users?.pageInfo!

  const loadMoreUsers = () => {
    //console.log('loadMoreUsers')
    fetchMore({
      variables: {
        after: endCursor,
      },
    })
  }
  return (
    <section>
      <h1>User list</h1>
      <p>Hi {session?.user?.name} User is logged in</p>
      <ul>
        {users.map((user, index) => (
          <li key={user.id}>
            <div>
              <span>{index + 1}. </span>
              <a>{user.email}</a>
            </div>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={() => loadMoreUsers()} disabled={loadingMoreUsers}>
          {loadingMoreUsers ? 'Loading...' : 'Show More'}
        </button>
      )}
      <style jsx>{`
        section {
          padding-bottom: 20px;
        }
        li {
          display: block;
          margin-bottom: 10px;
        }
        div {
          align-items: center;
          display: flex;
        }
        a {
          font-size: 14px;
          margin-right: 10px;
          text-decoration: none;
          padding-bottom: 0;
          border: 0;
        }
        span {
          font-size: 14px;
          margin-right: 5px;
        }
        ul {
          margin: 0;
          padding: 0;
        }
        button:before {
          align-self: center;
          border-style: solid;
          border-width: 6px 4px 0 4px;
          border-color: #ffffff transparent transparent transparent;
          content: '';
          height: 0;
          margin-right: 5px;
          width: 0;
        }
      `}</style>
    </section>
  )
}

export default UserList