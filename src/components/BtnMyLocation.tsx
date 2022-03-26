import { useContext } from 'react';
import { MapContext } from '../context/map/MapContext';
import { PlacesContext } from '../context/places/PlacesContext';


const BtnMyLocation = () => {

  const { map, isMapReady } = useContext(MapContext)
  const { userLocation } = useContext(PlacesContext)

  const onClick = () => {
    if ( isMapReady && map ) {
      map.flyTo({
        center: userLocation,
        animate: true,
        zoom: 13
      })
    }
  }

  return (
    <button
      className="btn btn-primary btn-sm"
      onClick={onClick}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 1
      }}
    >
      My Location
    </button>
  )
}

export default BtnMyLocation