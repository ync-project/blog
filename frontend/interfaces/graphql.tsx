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

export type Mutation = {
  __typename?: 'Mutation';
  addProfileForUser?: Maybe<Profile>;
  createDraft?: Maybe<Post>;
  deletePost?: Maybe<Post>;
  incrementPostViewCount?: Maybe<Post>;
  signupUser: User;
  togglePublishPost?: Maybe<Post>;
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
  data: UserCreateInput;
};


export type MutationTogglePublishPostArgs = {
  id: Scalars['Int'];
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
  postById?: Maybe<Post>;
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


export type QueryPostByIdArgs = {
  id?: InputMaybe<Scalars['Int']>;
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
  posts?: InputMaybe<Array<PostCreateInput>>;
};

export type UserUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type PostFieldsFragment = { __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean };

export type UserIdentitiesFragment = { __typename?: 'User', id: number, name?: string | null, email: string };

export type ProfileFieldsFragment = { __typename?: 'Profile', id: number, bio?: string | null };

export type UserFieldsFragment = { __typename?: 'User', id: number, name?: string | null, email: string, posts: Array<{ __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean }>, profile?: { __typename?: 'Profile', id: number, bio?: string | null } | null };

export type AllFeedsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllFeedsQuery = { __typename?: 'Query', feed: Array<{ __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean, author?: { __typename?: 'User', id: number, name?: string | null, email: string } | null }> };

export type PostByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PostByIdQuery = { __typename?: 'Query', postById?: { __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean, author?: { __typename?: 'User', id: number, name?: string | null, email: string, posts: Array<{ __typename?: 'Post', id: number, title: string, content?: string | null, published: boolean }>, profile?: { __typename?: 'Profile', id: number, bio?: string | null } | null } | null } | null };

export const UserIdentitiesFragmentDoc = gql`
    fragment UserIdentities on User {
  id
  name
  email
}
    `;
export const PostFieldsFragmentDoc = gql`
    fragment PostFields on Post {
  id
  title
  content
  published
}
    `;
export const ProfileFieldsFragmentDoc = gql`
    fragment ProfileFields on Profile {
  id
  bio
}
    `;
export const UserFieldsFragmentDoc = gql`
    fragment UserFields on User {
  ...UserIdentities
  posts {
    ...PostFields
  }
  profile {
    ...ProfileFields
  }
}
    ${UserIdentitiesFragmentDoc}
${PostFieldsFragmentDoc}
${ProfileFieldsFragmentDoc}`;
export const AllFeedsDocument = gql`
    query allFeeds {
  feed {
    ...PostFields
    author {
      ...UserIdentities
    }
  }
}
    ${PostFieldsFragmentDoc}
${UserIdentitiesFragmentDoc}`;

/**
 * __useAllFeedsQuery__
 *
 * To run a query within a React component, call `useAllFeedsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllFeedsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllFeedsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllFeedsQuery(baseOptions?: Apollo.QueryHookOptions<AllFeedsQuery, AllFeedsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllFeedsQuery, AllFeedsQueryVariables>(AllFeedsDocument, options);
      }
export function useAllFeedsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllFeedsQuery, AllFeedsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllFeedsQuery, AllFeedsQueryVariables>(AllFeedsDocument, options);
        }
export type AllFeedsQueryHookResult = ReturnType<typeof useAllFeedsQuery>;
export type AllFeedsLazyQueryHookResult = ReturnType<typeof useAllFeedsLazyQuery>;
export type AllFeedsQueryResult = Apollo.QueryResult<AllFeedsQuery, AllFeedsQueryVariables>;
export const PostByIdDocument = gql`
    query postById($id: Int!) {
  postById(id: $id) {
    ...PostFields
    author {
      ...UserFields
    }
  }
}
    ${PostFieldsFragmentDoc}
${UserFieldsFragmentDoc}`;

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