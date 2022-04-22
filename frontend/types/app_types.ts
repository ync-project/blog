import { ParsedUrlQuery } from 'querystring';

export type TODOPageErr = {
    message: string
} 

export const DEFAULT_PAGE_TAKE = 5
export interface PostIdParams extends ParsedUrlQuery {
    id: string,
 }

export type SearchVariables = {
    searchString?: string ,
    take?: number, 
    skip?: number
}
  
export type PageInfo<T extends string | number > = { 
    totalCount: number, 
    endCursor: T, 
    hasMore: boolean,
}

export interface Response<T extends string | number, N>{
    pageInfo: PageInfo<T>,
    edges: {
        cursor: T,
        node: N
    }[]
}

