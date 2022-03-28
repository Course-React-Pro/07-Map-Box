import { createContext } from "react";
import { Feature } from "../../interfaces/searchResponse.interface";

export interface PlacesContext {
  isLoading     : boolean;
  userLocation ?: [number, number];
  searchPlaces: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext( {} as PlacesContext );