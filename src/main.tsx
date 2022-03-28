import React from 'react'
import ReactDOM from 'react-dom'
import MapsApp from './MapsApp'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import './styles.css'; 

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';


if( !navigator.geolocation ) {
  alert('Geolocation is not supported by your browser')
  throw new Error('Geolocation is not supported by your browser')
}

ReactDOM.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>,
  document.getElementById('root')
)
