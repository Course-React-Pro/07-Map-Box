import { Feature } from "../../interfaces/searchResponse.interface"
import { PlacesProviderProps } from "./PlacesProvider"

type PlacesAction = 
{ type: 'setUserLocation', payload: [number, number] } |
{ type: 'setIsLoading', payload: boolean } |
{ type: 'setPlaces', payload: Feature[] }

export const placesReducer = ( state: PlacesProviderProps,  action: PlacesAction ): PlacesProviderProps => {

  switch (action.type) {
    case 'setUserLocation':
      return {
        ...state,
        isLoading: false,
        userLocation: action.payload
      }
    case 'setIsLoading':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'setPlaces':
      return {
        ...state,
        isLoading: false,
        places: action.payload
      }
    default:
      return state
  }
}