import axios from "axios";

export const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    language    : 'es',
    geometries  : 'geojson',
    overview    : 'simplified',
    steps       : false,
    access_token: 'pk.eyJ1IjoiY3VhZHJvcyIsImEiOiJjbDE3YXVta3oxYXB5M2V2MHdrdmU4YXA2In0.RNlufKFlqgMk4uK0t4M5Gw'
  }
});