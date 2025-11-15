'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import GoogleMapsLocationSelector from '@/components/GoogleMapsLocationSelector'
import { useState } from 'react'

interface LocationData {
  address: string
  city: string
  state: string
  pincode: string
  lat: number
  lng: number
}

export default function Location() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location)
  }

  const handleContinue = () => {
    if (selectedLocation) {
      alert(
        `Location saved: ${selectedLocation.city}, ${selectedLocation.state} - ${selectedLocation.pincode}`
      )
      // Here you would typically redirect to dashboard or home
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              promoHubgo
            </div>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Back Button - Progress indicator */}
          <div className="mb-8">
            <div className="h-1 bg-indigo-600 rounded-full" style={{ width: '95%' }}></div>
          </div>

          {/* Location Screen */}
          <>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Where are you located?</h1>
            <p className="text-gray-600 mb-8 text-sm">
              This helps us show your profile to the right audience
            </p>

            {/* Google Maps Location Selector */}
            <div className="mb-8">
              <GoogleMapsLocationSelector onLocationSelect={handleLocationSelect} />
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={!selectedLocation}
              className="w-full py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Continue
            </Button>

            {/* Secondary action */}
            <p className="text-center text-gray-600 text-sm mt-6 cursor-pointer hover:text-indigo-600">
              I don&apos;t see my location
            </p>
          </>
        </div>
      </div>
    </div>
  )
}
