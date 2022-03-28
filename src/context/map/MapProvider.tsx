import { MapContext } from './MapContext';
import { useReducer, useContext, useEffect } from 'react';
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from 'mapbox-gl';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../places/PlacesContext';
import { directionsApi } from '../../apis/directionsApi';
import { DirectionsResponse } from '../../interfaces/directions.interface';

export interface MapState {
  isMapReady: boolean;
  map?: Map,
  markers: Marker[],
  distance: number,
  duration: number,
}

const initialState : MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
  distance: 0,
  duration: 0,
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

  const getRouteBetweenPoints = async ( 
    start : [number, number], 
    end   : [number, number] 
  ) => {
    
    const resp = await directionsApi.get<DirectionsResponse>(`/${ start.join(',') };${ end.join(',') }`);
    const { distance, duration, geometry } = resp?.data?.routes[0];

    const { coordinates: coords } = geometry

    let kms = distance / 1000;
        kms = Math.round(kms * 100) / 100;

    let mins = duration / 60;
        mins = Math.floor(mins);

    console.log(kms, mins);

    const bounds =  new LngLatBounds(
      start,
      start
    )
    
    for (const coord of coords) {
      const newCoord :[number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    }

    state.map?.fitBounds( bounds, {
      padding: 200,
    })


    // Polyline 
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if( state.map?.getLayer('RouteString') ) { 
      state.map?.removeLayer('RouteString') 
      state.map?.removeSource('RouteString')
    }

    state.map?.addSource('RouteString', sourceData);
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#3b9ddd',
        'line-width': 5,
      },
    });

  }

  return (
    <MapContext.Provider 
      value={{
        ...state,
        setMap,
        getRouteBetweenPoints
      }}
    >
      { children }
    </MapContext.Provider>
  )
}

export default MapProvider