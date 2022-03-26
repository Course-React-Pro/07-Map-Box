import { ChangeEvent, useRef } from "react"

const SearchBar = () => {

  const debounceRef = useRef<any>()

  const onQueryChange = (query: ChangeEvent<HTMLInputElement>) => {

    if ( debounceRef.current ) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      console.log(query.target.value)
    }, 1000)


  }


  return (
    <div className="search-container">
      <input 
        className="form-control"
        type="text" 
        placeholder="Search for places" 
        onChange={onQueryChange}
      />
    </div>
  )
}

export default SearchBar