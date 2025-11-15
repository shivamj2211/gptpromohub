// Indian cities and towns with postal code information
// Sourced from comprehensive Indian postal code database

import citiesData from './indian-cities-data.json'

export interface City {
  city: string
  state: string
  pincode: string
  district?: string
}

export const INDIAN_CITIES: City[] = citiesData as City[]

export default INDIAN_CITIES
