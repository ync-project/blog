
export type SearchProps = { 
  handleSearchstring: (e: any)=>void 
  searchString: string
}

export default function Search( {handleSearchstring, searchString} : SearchProps) {

  //const handleString = useDebouncedCallback(handleSearchstring, 200)

  return (
    <div className="justify-content-center d-flex position-relative">
      <form>
        <label>Search:</label>
        <input type="text" name="searchString" 
            value={searchString} onChange={handleSearchstring}
          placeholder="title or content" />
        <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
      </form>     
    </div>        
  )
}
