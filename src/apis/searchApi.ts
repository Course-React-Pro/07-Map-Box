import axios from 'axios';

export const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 7,
    language: 'es',
    access_token: 'pk.eyJ1IjoiY3VhZHJvcyIsImEiOiJjbDE3YXVta3oxYXB5M2V2MHdrdmU4YXA2In0.RNlufKFlqgMk4uK0t4M5Gw'
  }
});
