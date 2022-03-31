
export default function Search({handeleSearch}: any) {
  return (
    <div className="justify-content-center d-flex position-relative">
      <form onSubmit={handeleSearch}>
        <input type="text" name="searchString" placeholder="title or content"/>
        <input type="text" name="take" placeholder="number of page"/>
        <button type="submit" disabled={false}>
          Search
        </button>
        <input type="reset"/>
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
