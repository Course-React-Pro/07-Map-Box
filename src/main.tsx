import React from 'react'
import ReactDOM from 'react-dom'
import MapsApp from './MapsApp'
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import './styles.css'; 

mapboxgl.accessToken = 'pk.eyJ1IjoiY3VhZHJvcyIsImEiOiJjbDE3YXVta3oxYXB5M2V2MHdrdmU4YXA2In0.RNlufKFlqgMk4uK0t4M5Gw';


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
