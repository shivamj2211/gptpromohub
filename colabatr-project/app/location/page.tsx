'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { INDIAN_CITIES } from '@/lib/cities'
import { useState, useMemo } from 'react'

export default function Location() {
  const [location, setLocation] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const [touched, setTouched] = useState(false)

  // Filter cities based on search input
  const filteredCities = useMemo(() => {
    if (!location.trim()) return INDIAN_CITIES
    
    const searchTerm = location.toLowerCase()
    return INDIAN_CITIES.filter(item =>
      item.city.toLowerCase().includes(searchTerm) ||
      item.state.toLowerCase().includes(searchTerm)
    )
  }, [location])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value)
    setShowDropdown(true)
  }

  const handleBlur = () => {
    setTouched(true)
    // Delay hiding dropdown to allow click on option
    setTimeout(() => setShowDropdown(false), 200)
  }

  const handleSelectCity = (city: string, state: string) => {
    setLocation(`${city}, ${state}`)
    setShowDropdown(false)
  }

  const handleContinue = () => {
    if (location.trim().length > 0) {
      // Location submitted successfully - redirect to dashboard or next step
      alert(`Location saved: ${location}`)
      // Here you would typically redirect to dashboard or home
    }
  }

  const handleClear = () => {
    setLocation('')
    setShowDropdown(true)
  }

  const locationError = touched && !location.trim()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="w-full max-w-md">
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

            {/* Location Input with Dropdown */}
            <div className="space-y-4 mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={handleChange}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={handleBlur}
                  placeholder="Search city or state..."
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 pr-10 transition ${
                    locationError
                      ? 'border-red-500 focus:ring-red-600'
                      : 'border-gray-300 focus:ring-indigo-600'
                  }`}
                />
                {location && (
                  <button
                    onClick={handleClear}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}

                {/* Dropdown Menu */}
                {showDropdown && filteredCities.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto">
                    {filteredCities.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleSelectCity(item.city, item.state)}
                        className="w-full text-left px-4 py-3 hover:bg-indigo-50 border-b border-gray-200 last:border-b-0 transition"
                      >
                        <div className="font-medium text-gray-900">{item.city}</div>
                        <div className="text-sm text-gray-500">{item.state}</div>
                      </button>
                    ))}
                  </div>
                )}

                {/* No results message */}
                {showDropdown && filteredCities.length === 0 && location.trim() && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-xl shadow-lg z-10 p-4">
                    <p className="text-gray-500 text-center">No cities found</p>
                  </div>
                )}
              </div>

              {locationError && (
                <p className="text-red-500 text-sm">Location is required</p>
              )}
            </div>

            {/* Continue Button */}
            <Button
              onClick={handleContinue}
              disabled={!location.trim()}
              className="w-full py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Continue
            </Button>

            {/* Secondary action */}
            <p className="text-center text-gray-600 text-sm mt-6 cursor-pointer hover:text-indigo-600">
              I don&apos;t see my city
            </p>
          </>
        </div>
      </div>
    </div>
  )
}
