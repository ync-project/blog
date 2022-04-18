interface CursorResults<T, K extends keyof T>{
  cursor?: T[K],
  hasMore: boolean
  totalCount: number
}

export function paginateResults<T, K extends keyof T>(
  ary: T[], 
  allAry: T[], 
  cursorName: K, 
  defaultCursor: T[K],
): CursorResults<T, K>  {
  return {
    cursor: ary && ary.length > 0 && get(ary[ary.length - 1], cursorName) || defaultCursor,
    hasMore: 
      ary.length ? 
      get(ary[ary.length - 1], cursorName) !== get(allAry[allAry.length - 1], cursorName)
        : false,
    totalCount: allAry.length, 
  };

  //ret[resultName] = allAry
  // Object.defineProperty(ret, resultName, {
  //   value: ary
  // })
}

function get<T, K extends keyof T>(object: T, key: K): T[K]{
  return object[key];
}

// function set<T extends CursorResults, K extends keyof T, V>(object: T, key: K, value: T): T{
//   object[key] = value;
//   return object
// }