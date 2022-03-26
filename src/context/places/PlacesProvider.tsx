import { useEffect, useReducer } from "react";
import { getUserLocation } from "../../helpers/getUserLocation";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";

export interface PlacesProviderProps {
  isLoading     : boolean;
  userLocation ?: [number, number];
}

const initialState : PlacesProviderProps = {
  isLoading: true,
  userLocation: undefined
};

export const PlacesProvider = ( {children}: {children: JSX.Element | JSX.Element[]} ) => {

  const [state, dispatch] = useReducer( placesReducer, initialState )

  useEffect(() => {
    getUserLocation()
    .then( ( res ) => {
      dispatch( {type: 'setUserLocation', payload: res} )
    })
  }, [])
  

  return (
    <PlacesContext.Provider 
      value={{
        ...state,
      }}
    >
      {children}
    </PlacesContext.Provider>
  )
}

export default PlacesProvider