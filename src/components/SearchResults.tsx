import { useContext } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';

const SearchResults = () => {

  const { places } = useContext(PlacesContext)

  if ( !places.length ) {
    return <></>
  }


  return (
    <ul className='list-group mt-3'>
      {
        places?.map( item => (
          <li className='list-group-item list-group-item-action'>
            <h6>{item.place_name_es}</h6>
            <p 
              className="text-muted"
              style={{ fontSize: '0.8rem' }}
            >
              {item.place_name}
            </p>
            <button 
              className="btn btn-outline-primary btn-sm"
            >
              Direciones
            </button>
          </li>
        ))
      }
    </ul>
  )
}

export default SearchResults