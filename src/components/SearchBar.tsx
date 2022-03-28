import { ChangeEvent, useRef, useContext } from 'react';
import { PlacesContext } from '../context';
import SearchResults from './SearchResults';

const SearchBar = () => {

  const debounceRef = useRef<any>()
  const { searchPlaces } = useContext(PlacesContext)

  const onQueryChange = (query: ChangeEvent<HTMLInputElement>) => {

    if ( debounceRef.current ) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      searchPlaces(query.target.value)
    }, 800)

  }


  return (
    <div className="search-container">
      <input 
        className="form-control"
        type="text" 
        placeholder="Search for places" 
        onChange={onQueryChange}
      />

      <SearchResults />

    </div>
  )
}

export default SearchBar