import { gql, useQuery, NetworkStatus } from '@apollo/client'
import { AllUsersDocument, AllPostsQueryVariables } from '../interfaces/graphql_generated'
import ErrorMessage from './ErrorMessage'

export const ALL_USERS_QUERY = gql`
  query allUsers($skip: Int!, $take: Int!) {
    allUsers(skip: $skip, take: $take) {
      id
      email
      name
    }
    _allUsersMeta{
      count
    }
  }
`

export const allUsersQueryVars = {
  skip: 0,
  take: 2,
}

export default function UserList() {
  const { loading, error, data, fetchMore, networkStatus } = useQuery(
    AllUsersDocument,
    {
      variables: allUsersQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    }
  )

  const loadingMoreUsers = networkStatus === NetworkStatus.fetchMore

  const loadMoreUsers = () => {
    console.log('loadMoreUsers')
    fetchMore({
      variables: {
        skip: allUsers.length,
      },
    })
  }

  if (error) return <ErrorMessage message="Error loading users." />
  if (loading && !loadingMoreUsers) return <div>Loading</div>

  const { allUsers, _allUsersMeta } = data
  const areMoreUsers = allUsers.length < _allUsersMeta.count //_allPostsMeta.count

  return (
    <section>
      <h1>User list</h1>
      <ul>
        {allUsers.map((user, index) => (
          <li key={user.id}>
            <div>
              <span>{index + 1}. </span>
              <a href={user.name}>{user.email}</a>
            </div>
          </li>
        ))}
      </ul>
      {areMoreUsers && (
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
