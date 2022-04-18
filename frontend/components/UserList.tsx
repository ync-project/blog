import {useEffect} from 'react'
import { gql, useLazyQuery, NetworkStatus } from '@apollo/client'
import { UsersDocument, UsersQuery, User } from '../types/graphql_generated'
import ErrorMessage from './ErrorMessage'
import { DEFAULT_PAGE_TAKE } from '../types/app_types'  


export default function UserList() {
  const [loadUsers, { loading, error, data, fetchMore, networkStatus }] = useLazyQuery<UsersQuery>(
    UsersDocument,
    {
      variables:  { take: DEFAULT_PAGE_TAKE },
      notifyOnNetworkStatusChange: true,
    }
  )

  useEffect(() => {
    loadUsers()
  }, [])

  const loadingMoreUsers = networkStatus === NetworkStatus.fetchMore

  if (error) return <ErrorMessage message="Error loading users." />
  if (loading && !loadingMoreUsers) return <div>Loading</div>
  if (!data) return <div>No user</div>

  const { cursor, hasMore, totalCount, users } = data.users!

  const loadMoreUsers = () => {
    fetchMore({
      variables: {
        skip: 1,
        after: cursor
      },
    })
  }

  return (
    <>
      {users &&
          <Users users={users as User[]} totalCount={totalCount} hasMore={hasMore} 
                  loadMorePosts={loadMoreUsers} loadingMoreUsers={loadingMoreUsers} />}
    </>
  )
} 

const Users = ({users, loadMorePosts, loadingMoreUsers, hasMore, totalCount}: 
  {users: User[], totalCount: number, loadMorePosts: any, loadingMoreUsers: any
   , hasMore: boolean}) => {
  return (
    <section>
      <h1>User list</h1>
      <ul>
        {(users as User[]).map((user, index) => (
          <li key={user.id}>
            <div>
              <span>{index + 1}. </span>
              <a>{user.email}</a>
            </div>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button onClick={() => loadingMoreUsers()} disabled={loadingMoreUsers}>
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
