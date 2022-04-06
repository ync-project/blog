import { ParsedUrlQuery } from 'querystring';

export type TODOPageErr = {
    message: string
} 

export const DEFAULT_PAGE_TAKE = 3
export interface PostIdParams extends ParsedUrlQuery {
    id: string,
 }

export type SearchVariables = {
    searchString?: string ,
    take?: number, 
    skip?: number
}
  