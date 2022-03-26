import { MapContext } from './MapContext';
import { useReducer } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';
import { mapReducer } from './mapReducer';

export interface MapState {
  isMapReady: boolean;
  map?: Map
}

const initialState : MapState = {
  isMapReady: false,
  map: undefined
}

const MapProvider = ( { children }: {children: JSX.Element | JSX.Element[]} ) => {


  const [state, dispatch] = useReducer(mapReducer, initialState)

  const setMap = (map: Map) => {

    const myLocartionPopup = new Popup()
      .setHTML(`
        <h3>My Location</h3>
        <p>Lat: ${map.getCenter().lat}</p>
      `)

    new Marker({ color: 'red' })
        .setLngLat(map.getCenter())
        .setPopup(myLocartionPopup)
        .addTo(map);

    dispatch({
      type: 'setMap',
      payload: map
    })
  }

  return (
    <MapContext.Provider 
      value={{
        ...state,
        setMap
      }}
    >
      { children }
    </MapContext.Provider>
  )
}

export default MapProvider