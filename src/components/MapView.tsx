import { useContext, useLayoutEffect, useRef } from "react"
import { PlacesContext } from "../context"
import Loading from "./Loading"
import mapboxgl from "mapbox-gl"
import { MapContext } from '../context/map/MapContext';

const MapView = () => {

  const { userLocation, isLoading } = useContext( PlacesContext )
  const { setMap } = useContext( MapContext )
  const mapDiv = useRef<HTMLDivElement>( null )

  useLayoutEffect(() => {
    
    if ( !isLoading ) {
      const map = new mapboxgl.Map({
        container: mapDiv.current!,
        style: "mapbox://styles/mapbox/streets-v11",
        center: userLocation,
        zoom: 13
      })
      map.addControl( new mapboxgl.NavigationControl() )
      setMap( map )
    }

  }, [isLoading])

  if ( isLoading ) {
    return <Loading />
  }

  return (
    <div 
      ref={mapDiv}
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0
      }}
    >
        { userLocation?.join(', ') }
    </div>
  )
}

export default MapView