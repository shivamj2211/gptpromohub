# Google Maps Location Selector - Integration Examples

## 📋 Table of Contents
1. [Basic Usage](#basic-usage)
2. [With Form Integration](#with-form-integration)
3. [With State Management](#with-state-management)
4. [With Database Storage](#with-database-storage)
5. [With Validation](#with-validation)

---

## Basic Usage

### Simple Component

```tsx
'use client'

import GoogleMapsLocationSelector from '@/components/GoogleMapsLocationSelector'

export default function SimpleExample() {
  const handleLocationSelect = (location) => {
    console.log('Selected:', location)
  }

  return (
    <div>
      <h1>Select Your Location</h1>
      <GoogleMapsLocationSelector onLocationSelect={handleLocationSelect} />
    </div>
  )
}
```

---

## With Form Integration

### React Hook Form Integration

```tsx
'use client'

import { useForm, Controller } from 'react-hook-form'
import GoogleMapsLocationSelector from '@/components/GoogleMapsLocationSelector'

interface LocationFormData {
  location: any
  name: string
}

export default function LocationForm() {
  const { control, handleSubmit } = useForm<LocationFormData>({
    defaultValues: {
      name: '',
      location: null,
    },
  })

  const onSubmit = (data: LocationFormData) => {
    console.log('Form Data:', {
      name: data.name,
      city: data.location?.city,
      state: data.location?.state,
      pincode: data.location?.pincode,
      coordinates: {
        lat: data.location?.lat,
        lng: data.location?.lng,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name</label>
        <input
          type="text"
          {...control.register('name', { required: 'Name is required' })}
        />
      </div>

      <div>
        <label>Location</label>
        <Controller
          name="location"
          control={control}
          render={({ field }) => (
            <GoogleMapsLocationSelector
              onLocationSelect={(location) => field.onChange(location)}
            />
          )}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  )
}
```

---

## With State Management

### Using Zustand (Optional)

```tsx
import { create } from 'zustand'

interface LocationStore {
  selectedLocation: LocationData | null
  setLocation: (location: LocationData) => void
  clearLocation: () => void
}

export const useLocationStore = create<LocationStore>((set) => ({
  selectedLocation: null,
  setLocation: (location) => set({ selectedLocation: location }),
  clearLocation: () => set({ selectedLocation: null }),
}))

// In your component:
'use client'

import GoogleMapsLocationSelector from '@/components/GoogleMapsLocationSelector'
import { useLocationStore } from '@/store/locationStore'

export default function LocationSelector() {
  const { setLocation, selectedLocation } = useLocationStore()

  return (
    <div>
      <GoogleMapsLocationSelector onLocationSelect={setLocation} />
      {selectedLocation && (
        <div>
          <p>Selected: {selectedLocation.city}, {selectedLocation.state}</p>
          <p>Pincode: {selectedLocation.pincode}</p>
        </div>
      )}
    </div>
  )
}
```

---

## With Database Storage

### Save to Database

```tsx
'use client'

import { useState } from 'react'
import GoogleMapsLocationSelector from '@/components/GoogleMapsLocationSelector'

export default function SaveLocationPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleLocationSelect = async (location) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          city: location.city,
          state: location.state,
          pincode: location.pincode,
          address: location.address,
          latitude: location.lat,
          longitude: location.lng,
        }),
      })

      if (!response.ok) throw new Error('Failed to save')
      
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Save Your Location</h1>
      
      <GoogleMapsLocationSelector onLocationSelect={handleLocationSelect} />
      
      {loading && <p>Saving...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>Location saved successfully!</p>}
    </div>
  )
}
```

### API Route Handler

```typescript
// app/api/locations/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prismadb'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const location = await prisma.userLocation.create({
      data: {
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        address: data.address,
        latitude: data.latitude,
        longitude: data.longitude,
        userId: 'current-user-id', // Get from session
      },
    })

    return NextResponse.json(location, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to save location' },
      { status: 500 }
    )
  }
}
```

### Prisma Schema

```prisma
model UserLocation {
  id        String   @id @default(cuid())
  userId    String
  city      String
  state     String
  pincode   String
  address   String
  latitude  Float
  longitude Float
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user      User     @relation(fields: [userId], references: [id])

  @@index([userId])
}
```

---

## With Validation

### Client-Side Validation

```tsx
'use client'

import { useState } from 'react'
import GoogleMapsLocationSelector from '@/components/GoogleMapsLocationSelector'

interface ValidationErrors {
  city?: string
  state?: string
  pincode?: string
}

export default function ValidatedLocation() {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [errors, setErrors] = useState<ValidationErrors>({})

  const validateLocation = (location) => {
    const newErrors: ValidationErrors = {}

    // City validation
    if (!location.city || location.city === 'Unknown') {
      newErrors.city = 'Please select a valid city'
    }

    // State validation
    if (!location.state || location.state === 'Unknown') {
      newErrors.state = 'Please select a valid state'
    }

    // Pincode validation (optional but recommended)
    if (location.pincode === 'N/A' || !location.pincode) {
      newErrors.pincode = 'Pincode could not be determined'
    }

    // Pincode format validation (India: 6 digits)
    if (location.pincode && !/^\d{6}$/.test(location.pincode)) {
      newErrors.pincode = 'Invalid pincode format'
    }

    return newErrors
  }

  const handleLocationSelect = (location) => {
    const validationErrors = validateLocation(location)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setSelectedLocation(location)
    }
  }

  const handleSubmit = () => {
    if (Object.keys(errors).length === 0 && selectedLocation) {
      console.log('Valid location:', selectedLocation)
      // Submit to backend
    }
  }

  return (
    <div>
      <h1>Select Valid Location</h1>
      
      <GoogleMapsLocationSelector onLocationSelect={handleLocationSelect} />

      {Object.entries(errors).map(([key, value]) => (
        <div key={key} style={{ color: 'red', marginTop: '10px' }}>
          {value}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={Object.keys(errors).length > 0 || !selectedLocation}
        style={{
          padding: '10px 20px',
          marginTop: '20px',
          opacity: Object.keys(errors).length > 0 ? 0.5 : 1,
        }}
      >
        Confirm Location
      </button>
    </div>
  )
}
```

---

## Advanced: Multiple Location Selection

```tsx
'use client'

import { useState } from 'react'
import GoogleMapsLocationSelector from '@/components/GoogleMapsLocationSelector'

export default function MultipleLocations() {
  const [locations, setLocations] = useState([])

  const handleLocationSelect = (location) => {
    setLocations([...locations, { ...location, id: Date.now() }])
  }

  const removeLocation = (id) => {
    setLocations(locations.filter((loc) => loc.id !== id))
  }

  return (
    <div>
      <h1>Select Multiple Locations</h1>
      
      <GoogleMapsLocationSelector onLocationSelect={handleLocationSelect} />

      <div style={{ marginTop: '20px' }}>
        <h2>Selected Locations ({locations.length})</h2>
        {locations.map((location) => (
          <div
            key={location.id}
            style={{
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              marginBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <strong>{location.city}</strong>, {location.state} - {location.pincode}
            </div>
            <button onClick={() => removeLocation(location.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Testing Guide

```tsx
// __tests__/LocationSelector.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import GoogleMapsLocationSelector from '@/components/GoogleMapsLocationSelector'

describe('GoogleMapsLocationSelector', () => {
  it('should render map container', () => {
    render(
      <GoogleMapsLocationSelector
        onLocationSelect={jest.fn()}
      />
    )
    // Add assertions
  })

  it('should call onLocationSelect when location is selected', () => {
    const mockOnSelect = jest.fn()
    render(
      <GoogleMapsLocationSelector
        onLocationSelect={mockOnSelect}
      />
    )
    // Simulate selection
    // expect(mockOnSelect).toHaveBeenCalled()
  })
})
```

---

## Performance Tips

```tsx
// Memoize component to prevent unnecessary re-renders
import { memo } from 'react'

const MemoizedLocationSelector = memo(
  GoogleMapsLocationSelector,
  (prevProps, nextProps) => {
    return (
      prevProps.initialLocation === nextProps.initialLocation &&
      prevProps.onLocationSelect === nextProps.onLocationSelect
    )
  }
)

export default MemoizedLocationSelector
```

---

## Type Safety

```typescript
// types/location.ts
export interface LocationData {
  address: string
  city: string
  state: string
  pincode: string
  lat: number
  lng: number
}

export interface UserProfile {
  id: string
  name: string
  location: LocationData
  createdAt: Date
  updatedAt: Date
}

// Use in components
'use client'

import { LocationData } from '@/types/location'
import GoogleMapsLocationSelector from '@/components/GoogleMapsLocationSelector'

export default function StronglyTyped() {
  const handleLocationSelect = (location: LocationData) => {
    // TypeScript ensures location has all required fields
    console.log(location.pincode) // ✅ Typed
  }

  return (
    <GoogleMapsLocationSelector onLocationSelect={handleLocationSelect} />
  )
}
```

---

## Summary

You now have Google Maps location selector with:
- ✅ Interactive map
- ✅ Real-time search
- ✅ Auto-populated pincode
- ✅ Multiple integration patterns
- ✅ Database storage examples
- ✅ Validation examples
- ✅ Type safety

Start with the basic usage and expand as needed!
