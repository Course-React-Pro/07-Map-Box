import { useContext, useState } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';
import { Feature } from '../interfaces/searchResponse.interface';
import { MapContext } from '../context/map/MapContext';

const SearchResults = () => {

  const { places, userLocation } = useContext(PlacesContext)
  const { map,getRouteBetweenPoints } = useContext(MapContext)
  const [activePlace, setActivePlace] = useState('')

  const onPlaceClick = (place: Feature) => {
    setActivePlace(place.id)
    const [lng, lat] = place.center;
    map?.flyTo({
      zoom: 10,
      duration: 500,
      animate: true,
      center: [lng, lat],
    })
  }

  const getRoute = ( place: Feature ) => {
    if( !userLocation ) return;
    const [lng, lat] = place.center;
    getRouteBetweenPoints( userLocation, [lng, lat] )
  }

  if ( !places.length ) {
    return <></>
  }
  return (
    <ul className='list-group mt-3'>
      {
        places?.map( item => (
          <li 
            className={`list-group-item list-group-item-action pointer ${activePlace === item.id ? 'active' : ''}`}
            onClick={() => onPlaceClick(item)}
          >
            <h6>{item.place_name_es}</h6>
            <p
              style={{ fontSize: '0.8rem' }}
            >
              {item.place_name}
            </p>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => getRoute(item)}
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