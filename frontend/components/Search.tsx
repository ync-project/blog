
export default function Search({searchText, take, handeleSearch}: any) {
  return (
    <div className="justify-content-center d-flex position-relative">
      <form onSubmit={handeleSearch}>
        <input type="text" name="searchText" placeholder="title or content"/>
        <input type="text" name="take" placeholder="number of page"/>
        <button type="submit" disabled={false}>
          Search
        </button>
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
