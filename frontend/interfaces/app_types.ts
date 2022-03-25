import { ParsedUrlQuery } from 'querystring';

export type TODOPageErr = {
    message: string
} 

export const DEFAULT_PAGE_TAKE = 8
export interface PostIdParams extends ParsedUrlQuery {
    id: string,
 }

