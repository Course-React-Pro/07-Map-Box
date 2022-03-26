import { PlacesProvider } from './context';
import MapProvider from './context/map/MapProvider';
import HomePage from './pages/HomePage';

const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomePage />
      </MapProvider>
    </PlacesProvider>
  )
}

export default MapsApp