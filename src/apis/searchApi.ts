import axios from 'axios';

export const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 7,
    language: 'es',
    access_token: 'YOUR_MAPBOX_ACCESS_TOKEN'
  }
});
