import { useEffect, useReducer } from "react";
import { searchApi } from "../../apis/searchApi";
import { getUserLocation } from "../../helpers/getUserLocation";
import { Feature, PlacesResponse } from "../../interfaces/searchResponse.interface";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

export interface PlacesProviderProps {
  isLoading     : boolean;
  userLocation ?: [number, number];
  places: Feature[],
}

const initialState : PlacesProviderProps = {
  isLoading: true,
  userLocation: undefined,
  places: [],
};

export const PlacesProvider = ( {children}: {children: JSX.Element | JSX.Element[]} ) => {

  const [state, dispatch] = useReducer( placesReducer, initialState )

  useEffect(() => {
    getUserLocation()
    .then( ( res ) => {
      dispatch( {type: 'setUserLocation', payload: res} )
    })
  }, [])


  const searchPlaces = async ( query: string ): Promise<Feature[]> => {
    if ( query.length === 0 ) return []
    if ( !state.userLocation ) return []

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(','),
      }
    })

    dispatch( {type: 'setPlaces', payload: resp.data.features} )

    return resp.data.features
  }
  

  return (
    <PlacesContext.Provider 
      value={{
        ...state,
        searchPlaces
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}

export default PlacesProvider