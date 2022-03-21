import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addProfileForUser?: Maybe<Profile>;
  createDraft?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  incrementPostViewCount?: Maybe<Post>;
  signupUser: User;
  togglePublishPost?: Maybe<Post>;
  updateProfileForUser?: Maybe<User>;
};


export type MutationAddProfileForUserArgs = {
  bio?: InputMaybe<Scalars['String']>;
  userUniqueInput: UserUniqueInput;
};


export type MutationCreateDraftArgs = {
  authorEmail: Scalars['String'];
  data: PostCreateInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};


export type MutationIncrementPostViewCountArgs = {
  id: Scalars['Int'];
};


export type MutationSignupUserArgs = {
  bio?: InputMaybe<Scalars['String']>;
  data: UserCreateInput;
};


export type MutationTogglePublishPostArgs = {
  id: Scalars['Int'];
};


export type MutationUpdateProfileForUserArgs = {
  bio?: InputMaybe<Scalars['String']>;
  email: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  currentPage: Scalars['Int'];
  hasNextPage: Scalars['Boolean'];
  pageCount: Scalars['Int'];
  perPage: Scalars['Int'];
  totalCount: Scalars['Int'];
};

export type Post = {
  __typename?: 'Post';
  author?: Maybe<User>;
  content?: Maybe<Scalars['String']>;
  createdAt: Scalars['DateTime'];
  id: Scalars['Int'];
  published: Scalars['Boolean'];
  title: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  viewCount: Scalars['Int'];
};

export type PostCreateInput = {
  content?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};

export type PostOrderByUpdatedAtInput = {
  updatedAt: SortOrder;
};

export type Profile = {
  __typename?: 'Profile';
  bio?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  user?: Maybe<User>;
};

export type Query = {
  __typename?: 'Query';
  allUsers: Array<User>;
  draftsByUser?: Maybe<Array<Maybe<Post>>>;
  feed: Array<Post>;
  feeds?: Maybe<Response>;
  postById?: Maybe<Post>;
  user?: Maybe<User>;
};


export type QueryDraftsByUserArgs = {
  userUniqueInput: UserUniqueInput;
};


export type QueryFeedArgs = {
  orderBy?: InputMaybe<PostOrderByUpdatedAtInput>;
  searchString?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryFeedsArgs = {
  orderBy?: InputMaybe<PostOrderByUpdatedAtInput>;
  page: Scalars['Int'];
  searchString?: InputMaybe<Scalars['String']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryPostByIdArgs = {
  id?: InputMaybe<Scalars['Int']>;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['Int']>;
};

export type Response = {
  __typename?: 'Response';
  pageInfo: PageInfo;
  posts: Array<Maybe<Post>>;
};

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  posts: Array<Post>;
  profile?: Maybe<Profile>;
};

export type UserCreateInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  posts?: InputMaybe<Array<PostCreateInput>>;
};

export type UserUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type PostFieldsFragment = { __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean };

export type UserIdentitiesFragment = { __typename?: 'User', id: number, email: string };

export type UserFieldsFragment = { __typename?: 'User', id: number, email: string, name?: string | null, profile?: { __typename?: 'Profile', id: number, bio?: string | null } | null };

export type ProfileFieldsFragment = { __typename?: 'Profile', id: number, bio?: string | null };

export type FeedsQueryVariables = Exact<{
  searchString?: InputMaybe<Scalars['String']>;
  page: Scalars['Int'];
  take?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<PostOrderByUpdatedAtInput>;
}>;


export type FeedsQuery = { __typename?: 'Query', feeds?: { __typename?: 'Response', pageInfo: { __typename?: 'PageInfo', totalCount: number, pageCount: number, currentPage: number, hasNextPage: boolean }, posts: Array<{ __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean, author?: { __typename?: 'User', id: number, email: string } | null } | null> } | null };

export type PostByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostByIdQuery = { __typename?: 'Query', postById?: { __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean, author?: { __typename?: 'User', id: number, email: string } | null } | null };

export type DraftsByUserQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type DraftsByUserQuery = { __typename?: 'Query', draftsByUser?: Array<{ __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean, author?: { __typename?: 'User', id: number, email: string } | null } | null> | null };

export type CreateDraftMutationVariables = Exact<{
  authorEmail: Scalars['String'];
  title: Scalars['String'];
  content: Scalars['String'];
}>;


export type CreateDraftMutation = { __typename?: 'Mutation', createDraft?: { __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean, author?: { __typename?: 'User', id: number, email: string } | null } | null };

export type TogglePublishPostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type TogglePublishPostMutation = { __typename?: 'Mutation', togglePublishPost?: { __typename?: 'Post', id: number, published: boolean } | null };

export type IncrementPostViewCountMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type IncrementPostViewCountMutation = { __typename?: 'Mutation', incrementPostViewCount?: { __typename?: 'Post', id: number, viewCount: number } | null };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost?: { __typename?: 'Post', id: number } | null };

export type AllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type AllUsersQuery = { __typename?: 'Query', allUsers: Array<{ __typename?: 'User', id: number, email: string }> };

export type UserQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: number, email: string, name?: string | null, profile?: { __typename?: 'Profile', id: number, bio?: string | null } | null } | null };

export type SignupUserMutationVariables = Exact<{
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
}>;


export type SignupUserMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'User', id: number, email: string } };

export type SignupUserAndProfileMutationVariables = Exact<{
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  bio: Scalars['String'];
}>;


export type SignupUserAndProfileMutation = { __typename?: 'Mutation', signupUser: { __typename?: 'User', id: number, email: string, profile?: { __typename?: 'Profile', id: number, bio?: string | null } | null } };

export type AddProfileForUserMutationVariables = Exact<{
  email: Scalars['String'];
  bio: Scalars['String'];
}>;


export type AddProfileForUserMutation = { __typename?: 'Mutation', addProfileForUser?: { __typename?: 'Profile', id: number, bio?: string | null, user?: { __typename?: 'User', id: number, email: string } | null } | null };

export type UpdateProfileForUserMutationVariables = Exact<{
  email: Scalars['String'];
  bio: Scalars['String'];
}>;


export type UpdateProfileForUserMutation = { __typename?: 'Mutation', updateProfileForUser?: { __typename?: 'User', id: number } | null };

export const PostFieldsFragmentDoc = gql`
    fragment PostFields on Post {
  id
  title
  content
  published
}
    `;
export const UserIdentitiesFragmentDoc = gql`
    fragment UserIdentities on User {
  id
  email
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  id
  email
  name
  profile {
    id
    bio
  }
}
    `;
export const ProfileFieldsFragmentDoc = gql`
    fragment ProfileFields on Profile {
  id
  bio
}
    `;
export const FeedsDocument = gql`
    query feeds($searchString: String, $page: Int!, $take: Int, $orderBy: PostOrderByUpdatedAtInput) {
  feeds(searchString: $searchString, page: $page, take: $take, orderBy: $orderBy) {
    pageInfo {
      totalCount
      pageCount
      currentPage
      hasNextPage
    }
    posts {
      ...PostFields
      author {
        ...UserIdentities
      }
    }
  }
}
    ${PostFieldsFragmentDoc}
${UserIdentitiesFragmentDoc}`;

/**
 * __useFeedsQuery__
 *
 * To run a query within a React component, call `useFeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeedsQuery({
 *   variables: {
 *      searchString: // value for 'searchString'
 *      page: // value for 'page'
 *      take: // value for 'take'
 *      orderBy: // value for 'orderBy'
 *   },
 * });
 */
export function useFeedsQuery(baseOptions: Apollo.QueryHookOptions<FeedsQuery, FeedsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FeedsQuery, FeedsQueryVariables>(FeedsDocument, options);
      }
export function useFeedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FeedsQuery, FeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FeedsQuery, FeedsQueryVariables>(FeedsDocument, options);
        }
export type FeedsQueryHookResult = ReturnType<typeof useFeedsQuery>;
export type FeedsLazyQueryHookResult = ReturnType<typeof useFeedsLazyQuery>;
export type FeedsQueryResult = Apollo.QueryResult<FeedsQuery, FeedsQueryVariables>;
export const PostByIdDocument = gql`
    query postById($id: Int!) {
  postById(id: $id) {
    ...PostFields
    author {
      ...UserIdentities
    }
  }
}
    ${PostFieldsFragmentDoc}
${UserIdentitiesFragmentDoc}`;

/**
 * __usePostByIdQuery__
 *
 * To run a query within a React component, call `usePostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostByIdQuery(baseOptions: Apollo.QueryHookOptions<PostByIdQuery, PostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<PostByIdQuery, PostByIdQueryVariables>(PostByIdDocument, options);
      }
export function usePostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PostByIdQuery, PostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<PostByIdQuery, PostByIdQueryVariables>(PostByIdDocument, options);
        }
export type PostByIdQueryHookResult = ReturnType<typeof usePostByIdQuery>;
export type PostByIdLazyQueryHookResult = ReturnType<typeof usePostByIdLazyQuery>;
export type PostByIdQueryResult = Apollo.QueryResult<PostByIdQuery, PostByIdQueryVariables>;
export const DraftsByUserDocument = gql`
    query draftsByUser($email: String!) {
  draftsByUser(userUniqueInput: {email: $email}) {
    ...PostFields
    author {
      ...UserIdentities
    }
  }
}
    ${PostFieldsFragmentDoc}
${UserIdentitiesFragmentDoc}`;

/**
 * __useDraftsByUserQuery__
 *
 * To run a query within a React component, call `useDraftsByUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useDraftsByUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDraftsByUserQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useDraftsByUserQuery(baseOptions: Apollo.QueryHookOptions<DraftsByUserQuery, DraftsByUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DraftsByUserQuery, DraftsByUserQueryVariables>(DraftsByUserDocument, options);
      }
export function useDraftsByUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DraftsByUserQuery, DraftsByUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DraftsByUserQuery, DraftsByUserQueryVariables>(DraftsByUserDocument, options);
        }
export type DraftsByUserQueryHookResult = ReturnType<typeof useDraftsByUserQuery>;
export type DraftsByUserLazyQueryHookResult = ReturnType<typeof useDraftsByUserLazyQuery>;
export type DraftsByUserQueryResult = Apollo.QueryResult<DraftsByUserQuery, DraftsByUserQueryVariables>;
export const CreateDraftDocument = gql`
    mutation createDraft($authorEmail: String!, $title: String!, $content: String!) {
  createDraft(data: {title: $title, content: $content}, authorEmail: $authorEmail) {
    ...PostFields
    author {
      ...UserIdentities
    }
  }
}
    ${PostFieldsFragmentDoc}
${UserIdentitiesFragmentDoc}`;
export type CreateDraftMutationFn = Apollo.MutationFunction<CreateDraftMutation, CreateDraftMutationVariables>;

/**
 * __useCreateDraftMutation__
 *
 * To run a mutation, you first call `useCreateDraftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDraftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDraftMutation, { data, loading, error }] = useCreateDraftMutation({
 *   variables: {
 *      authorEmail: // value for 'authorEmail'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateDraftMutation(baseOptions?: Apollo.MutationHookOptions<CreateDraftMutation, CreateDraftMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDraftMutation, CreateDraftMutationVariables>(CreateDraftDocument, options);
      }
export type CreateDraftMutationHookResult = ReturnType<typeof useCreateDraftMutation>;
export type CreateDraftMutationResult = Apollo.MutationResult<CreateDraftMutation>;
export type CreateDraftMutationOptions = Apollo.BaseMutationOptions<CreateDraftMutation, CreateDraftMutationVariables>;
export const TogglePublishPostDocument = gql`
    mutation togglePublishPost($id: Int!) {
  togglePublishPost(id: $id) {
    id
    published
  }
}
    `;
export type TogglePublishPostMutationFn = Apollo.MutationFunction<TogglePublishPostMutation, TogglePublishPostMutationVariables>;

/**
 * __useTogglePublishPostMutation__
 *
 * To run a mutation, you first call `useTogglePublishPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTogglePublishPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [togglePublishPostMutation, { data, loading, error }] = useTogglePublishPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTogglePublishPostMutation(baseOptions?: Apollo.MutationHookOptions<TogglePublishPostMutation, TogglePublishPostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<TogglePublishPostMutation, TogglePublishPostMutationVariables>(TogglePublishPostDocument, options);
      }
export type TogglePublishPostMutationHookResult = ReturnType<typeof useTogglePublishPostMutation>;
export type TogglePublishPostMutationResult = Apollo.MutationResult<TogglePublishPostMutation>;
export type TogglePublishPostMutationOptions = Apollo.BaseMutationOptions<TogglePublishPostMutation, TogglePublishPostMutationVariables>;
export const IncrementPostViewCountDocument = gql`
    mutation incrementPostViewCount($id: Int!) {
  incrementPostViewCount(id: $id) {
    id
    viewCount
  }
}
    `;
export type IncrementPostViewCountMutationFn = Apollo.MutationFunction<IncrementPostViewCountMutation, IncrementPostViewCountMutationVariables>;

/**
 * __useIncrementPostViewCountMutation__
 *
 * To run a mutation, you first call `useIncrementPostViewCountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrementPostViewCountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementPostViewCountMutation, { data, loading, error }] = useIncrementPostViewCountMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useIncrementPostViewCountMutation(baseOptions?: Apollo.MutationHookOptions<IncrementPostViewCountMutation, IncrementPostViewCountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<IncrementPostViewCountMutation, IncrementPostViewCountMutationVariables>(IncrementPostViewCountDocument, options);
      }
export type IncrementPostViewCountMutationHookResult = ReturnType<typeof useIncrementPostViewCountMutation>;
export type IncrementPostViewCountMutationResult = Apollo.MutationResult<IncrementPostViewCountMutation>;
export type IncrementPostViewCountMutationOptions = Apollo.BaseMutationOptions<IncrementPostViewCountMutation, IncrementPostViewCountMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($id: Int!) {
  deletePost(id: $id) {
    id
  }
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const AllUsersDocument = gql`
    query allUsers {
  allUsers {
    ...UserIdentities
  }
}
    ${UserIdentitiesFragmentDoc}`;

/**
 * __useAllUsersQuery__
 *
 * To run a query within a React component, call `useAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
      }
export function useAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllUsersQuery, AllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllUsersQuery, AllUsersQueryVariables>(AllUsersDocument, options);
        }
export type AllUsersQueryHookResult = ReturnType<typeof useAllUsersQuery>;
export type AllUsersLazyQueryHookResult = ReturnType<typeof useAllUsersLazyQuery>;
export type AllUsersQueryResult = Apollo.QueryResult<AllUsersQuery, AllUsersQueryVariables>;
export const UserDocument = gql`
    query user($id: Int!) {
  user(id: $id) {
    ...UserFields
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;
export const SignupUserDocument = gql`
    mutation signupUser($email: String!, $name: String = "", $password: String!) {
  signupUser(data: {name: $name, email: $email, password: $password}) {
    ...UserIdentities
  }
}
    ${UserIdentitiesFragmentDoc}`;
export type SignupUserMutationFn = Apollo.MutationFunction<SignupUserMutation, SignupUserMutationVariables>;

/**
 * __useSignupUserMutation__
 *
 * To run a mutation, you first call `useSignupUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupUserMutation, { data, loading, error }] = useSignupUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignupUserMutation(baseOptions?: Apollo.MutationHookOptions<SignupUserMutation, SignupUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupUserMutation, SignupUserMutationVariables>(SignupUserDocument, options);
      }
export type SignupUserMutationHookResult = ReturnType<typeof useSignupUserMutation>;
export type SignupUserMutationResult = Apollo.MutationResult<SignupUserMutation>;
export type SignupUserMutationOptions = Apollo.BaseMutationOptions<SignupUserMutation, SignupUserMutationVariables>;
export const SignupUserAndProfileDocument = gql`
    mutation signupUserAndProfile($email: String!, $name: String = "", $password: String!, $bio: String!) {
  signupUser(data: {name: $name, email: $email, password: $password}, bio: $bio) {
    ...UserIdentities
    profile {
      ...ProfileFields
    }
  }
}
    ${UserIdentitiesFragmentDoc}
${ProfileFieldsFragmentDoc}`;
export type SignupUserAndProfileMutationFn = Apollo.MutationFunction<SignupUserAndProfileMutation, SignupUserAndProfileMutationVariables>;

/**
 * __useSignupUserAndProfileMutation__
 *
 * To run a mutation, you first call `useSignupUserAndProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignupUserAndProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signupUserAndProfileMutation, { data, loading, error }] = useSignupUserAndProfileMutation({
 *   variables: {
 *      email: // value for 'email'
 *      name: // value for 'name'
 *      password: // value for 'password'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useSignupUserAndProfileMutation(baseOptions?: Apollo.MutationHookOptions<SignupUserAndProfileMutation, SignupUserAndProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignupUserAndProfileMutation, SignupUserAndProfileMutationVariables>(SignupUserAndProfileDocument, options);
      }
export type SignupUserAndProfileMutationHookResult = ReturnType<typeof useSignupUserAndProfileMutation>;
export type SignupUserAndProfileMutationResult = Apollo.MutationResult<SignupUserAndProfileMutation>;
export type SignupUserAndProfileMutationOptions = Apollo.BaseMutationOptions<SignupUserAndProfileMutation, SignupUserAndProfileMutationVariables>;
export const AddProfileForUserDocument = gql`
    mutation addProfileForUser($email: String!, $bio: String!) {
  addProfileForUser(userUniqueInput: {email: $email}, bio: $bio) {
    ...ProfileFields
    user {
      ...UserIdentities
    }
  }
}
    ${ProfileFieldsFragmentDoc}
${UserIdentitiesFragmentDoc}`;
export type AddProfileForUserMutationFn = Apollo.MutationFunction<AddProfileForUserMutation, AddProfileForUserMutationVariables>;

/**
 * __useAddProfileForUserMutation__
 *
 * To run a mutation, you first call `useAddProfileForUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProfileForUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProfileForUserMutation, { data, loading, error }] = useAddProfileForUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useAddProfileForUserMutation(baseOptions?: Apollo.MutationHookOptions<AddProfileForUserMutation, AddProfileForUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProfileForUserMutation, AddProfileForUserMutationVariables>(AddProfileForUserDocument, options);
      }
export type AddProfileForUserMutationHookResult = ReturnType<typeof useAddProfileForUserMutation>;
export type AddProfileForUserMutationResult = Apollo.MutationResult<AddProfileForUserMutation>;
export type AddProfileForUserMutationOptions = Apollo.BaseMutationOptions<AddProfileForUserMutation, AddProfileForUserMutationVariables>;
export const UpdateProfileForUserDocument = gql`
    mutation updateProfileForUser($email: String!, $bio: String!) {
  updateProfileForUser(email: $email, bio: $bio) {
    id
  }
}
    `;
export type UpdateProfileForUserMutationFn = Apollo.MutationFunction<UpdateProfileForUserMutation, UpdateProfileForUserMutationVariables>;

/**
 * __useUpdateProfileForUserMutation__
 *
 * To run a mutation, you first call `useUpdateProfileForUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileForUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileForUserMutation, { data, loading, error }] = useUpdateProfileForUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      bio: // value for 'bio'
 *   },
 * });
 */
export function useUpdateProfileForUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileForUserMutation, UpdateProfileForUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileForUserMutation, UpdateProfileForUserMutationVariables>(UpdateProfileForUserDocument, options);
      }
export type UpdateProfileForUserMutationHookResult = ReturnType<typeof useUpdateProfileForUserMutation>;
export type UpdateProfileForUserMutationResult = Apollo.MutationResult<UpdateProfileForUserMutation>;
export type UpdateProfileForUserMutationOptions = Apollo.BaseMutationOptions<UpdateProfileForUserMutation, UpdateProfileForUserMutationVariables>;