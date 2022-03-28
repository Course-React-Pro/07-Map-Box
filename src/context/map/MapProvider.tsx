import { MapContext } from './MapContext';
import { useReducer, useContext, useEffect } from 'react';
import { Map, Marker, Popup } from 'mapbox-gl';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../places/PlacesContext';

export interface MapState {
  isMapReady: boolean;
  map?: Map,
  markers: Marker[],
}

const initialState : MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
}

const MapProvider = ( { children }: {children: JSX.Element | JSX.Element[]} ) => {

  const [state, dispatch] = useReducer(mapReducer, initialState)
  const { places } = useContext( PlacesContext );

  useEffect(() => {
    if(!places.length) return;

    state.markers.forEach( marker => marker.remove() )

    const newMarkers : Marker[] = [];

    places.forEach( place => {
      const [lng, lat] = place.center;
      const popup = new Popup()
        .setHTML(`
          <h6>${place.text_es}</h6>
          <p>${place.place_name_es}</p>
        `)
      const marker = new Marker()
        .setPopup(popup)
        .setLngLat([lng, lat])
        .addTo( state.map! )

      newMarkers.push( marker )
    })

    dispatch({ type: 'setMarkers', payload: newMarkers })

  }, [places])


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