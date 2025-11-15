'use client'

import React, { useCallback, useRef, useState } from 'react'
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api'

interface LocationData {
  address: string
  city: string
  state: string
  pincode: string
  lat: number
  lng: number
}

interface GoogleMapsLocationSelectorProps {
  onLocationSelect: (location: LocationData) => void
  initialLocation?: LocationData
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '12px',
}

const defaultCenter = {
  lat: 20.5937,
  lng: 78.9629,
}

export const GoogleMapsLocationSelector: React.FC<GoogleMapsLocationSelectorProps> = ({
  onLocationSelect,
  initialLocation,
}) => {
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(initialLocation || null)
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  const onMapLoad = useCallback((mapInstance: google.maps.Map) => {
    setMap(mapInstance)
    setMapLoaded(true)
    
    // Set initial marker if location is provided
    if (initialLocation) {
      const newMarker = new google.maps.Marker({
        position: { lat: initialLocation.lat, lng: initialLocation.lng },
        map: mapInstance,
        title: initialLocation.city,
      })
      setMarker(newMarker)
      mapInstance.setCenter({ lat: initialLocation.lat, lng: initialLocation.lng })
      mapInstance.setZoom(12)
    } else {
      // Center on India
      mapInstance.setCenter(defaultCenter)
      mapInstance.setZoom(5)
    }
  }, [initialLocation])

  const onSearchBoxLoad = useCallback((ref: google.maps.places.SearchBox) => {
    searchBoxRef.current = ref
  }, [])

  const onPlacesChanged = useCallback(() => {
    if (!searchBoxRef.current || !map) return

    const places = searchBoxRef.current.getPlaces()
    if (!places || places.length === 0) return

    const place = places[0]
    if (!place.geometry || !place.geometry.location) return

    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()

    // Update marker
    if (marker) {
      marker.setPosition({ lat, lng })
    } else {
      const newMarker = new google.maps.Marker({
        position: { lat, lng },
        map,
        title: place.name,
      })
      setMarker(newMarker)
    }

    // Pan map to selected location
    map.panTo({ lat, lng })
    map.setZoom(15)
  }, [map, marker])

  const geocodeLocation = useCallback((lat: number, lng: number) => {
    if (!mapLoaded) return

    const geocoder = new google.maps.Geocoder()
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const result = results[0]
        const addressComponents = result.address_components

        let city = ''
        let state = ''
        let pincode = ''

        addressComponents.forEach((component) => {
          if (component.types.includes('postal_code')) {
            pincode = component.long_name
          }
          if (component.types.includes('administrative_area_level_1')) {
            state = component.long_name
          }
          if (component.types.includes('administrative_area_level_2')) {
            city = component.long_name
          }
          if (component.types.includes('locality')) {
            city = component.long_name
          }
        })

        const locationData: LocationData = {
          address: result.formatted_address,
          city: city || 'Unknown',
          state: state || 'Unknown',
          pincode: pincode || 'N/A',
          lat,
          lng,
        }

        setSelectedLocation(locationData)
        onLocationSelect(locationData)
      }
    })
  }, [mapLoaded, onLocationSelect])

  const handleMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (!event.latLng) return

      const lat = event.latLng.lat()
      const lng = event.latLng.lng()

      // Update marker
      if (marker) {
        marker.setPosition({ lat, lng })
      } else {
        const newMarker = new google.maps.Marker({
          position: { lat, lng },
          map,
          title: 'Selected Location',
        })
        setMarker(newMarker)
      }

      geocodeLocation(lat, lng)
    },
    [map, marker, geocodeLocation]
  )

  if (!GOOGLE_MAPS_API_KEY) {
    return (
      <div className="w-full h-96 bg-red-50 border-2 border-red-300 rounded-xl flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600 font-semibold mb-2">Google Maps API Key Missing</p>
          <p className="text-red-500 text-sm">
            Please set NEXT_PUBLIC_GOOGLE_MAPS_API_KEY in .env.local
          </p>
        </div>
      </div>
    )
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={['places']}>
      <div className="space-y-4">
        {/* Search Box */}
        <div className="relative">
          <StandaloneSearchBox onLoad={onSearchBoxLoad} onPlacesChanged={onPlacesChanged}>
            <input
              type="text"
              placeholder="Search location, city, or pincode..."
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
            />
          </StandaloneSearchBox>
        </div>

        {/* Map */}
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={initialLocation ? { lat: initialLocation.lat, lng: initialLocation.lng } : defaultCenter}
          zoom={initialLocation ? 15 : 5}
          onLoad={onMapLoad}
          onClick={handleMapClick}
          options={{
            gestureHandling: 'greedy',
            zoomControl: true,
            streetViewControl: false,
            fullscreenControl: true,
          }}
        >
          {marker && <Marker position={{ lat: marker.getPosition()?.lat() || 0, lng: marker.getPosition()?.lng() || 0 }} />}
        </GoogleMap>

        {/* Selected Location Details */}
        {selectedLocation && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 space-y-2">
            <h3 className="font-semibold text-gray-900">Selected Location</h3>
            <div className="space-y-1 text-sm">
              <p>
                <span className="font-medium text-gray-700">City:</span>{' '}
                <span className="text-gray-600">{selectedLocation.city}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">State:</span>{' '}
                <span className="text-gray-600">{selectedLocation.state}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Pincode:</span>{' '}
                <span className="text-gray-600 font-mono">{selectedLocation.pincode}</span>
              </p>
              <p>
                <span className="font-medium text-gray-700">Coordinates:</span>{' '}
                <span className="text-gray-600 font-mono text-xs">
                  {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                </span>
              </p>
              <p className="text-xs text-gray-500 mt-2">{selectedLocation.address}</p>
            </div>
          </div>
        )}

        {/* Help Text */}
        <p className="text-xs text-gray-500 text-center">
          💡 Search for a location or click on the map to select
        </p>
      </div>
    </LoadScript>
  )
}

export default GoogleMapsLocationSelector
