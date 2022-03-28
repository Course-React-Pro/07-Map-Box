import axios from "axios";

export const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    language    : 'es',
    geometries  : 'geojson',
    overview    : 'simplified',
    steps       : false,
    access_token: 'YOUR_MAPBOX_ACCESS_TOKEN'
  }
});