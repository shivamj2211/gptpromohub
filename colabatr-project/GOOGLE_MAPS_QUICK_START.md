# 🗺️ Google Maps Location Selector - Quick Start Guide

## ⚡ Quick Setup (5 minutes)

### 1️⃣ Get Your API Key
- Go to: https://console.cloud.google.com/
- Create new project → Enable APIs → Get API Key
- See detailed steps in `GOOGLE_MAPS_SETUP.md`

### 2️⃣ Add Key to Project
Edit `.env.local`:
```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
```

### 3️⃣ Start Development
```bash
npm run dev
```

### 4️⃣ Test It
Navigate to: `http://localhost:3000/location`

---

## ✨ Features

| Feature | Status | Details |
|---------|--------|---------|
| 🗺️ Interactive Map | ✅ | Click to select locations |
| 🔍 Search Box | ✅ | Real-time autocomplete |
| 📍 Marker | ✅ | Visual location indicator |
| 🏙️ City Auto-Detection | ✅ | Automatically extracted |
| 🆎 State Auto-Detection | ✅ | Automatically extracted |
| 📮 Postal Code | ✅ | Automatically retrieved |
| 🌐 Coordinates | ✅ | Latitude & Longitude |
| 📄 Full Address | ✅ | Complete formatted address |
| 📱 Mobile Responsive | ✅ | Works on all devices |

---

## 📊 Data Captured

When user selects a location, you get:

```javascript
{
  address: "123 Street, City, State 123456, India",
  city: "Mumbai",
  state: "Maharashtra",
  pincode: "400001",
  lat: 19.0760,
  lng: 72.8777
}
```

---

## 🎯 Usage in Your Code

```tsx
import GoogleMapsLocationSelector from '@/components/GoogleMapsLocationSelector'

export default function MyPage() {
  const handleLocationSelect = (location) => {
    console.log('City:', location.city)
    console.log('State:', location.state)
    console.log('Pincode:', location.pincode)
    console.log('Coordinates:', location.lat, location.lng)
  }

  return (
    <GoogleMapsLocationSelector onLocationSelect={handleLocationSelect} />
  )
}
```

---

## 🔧 Component Props

```typescript
// Props Interface
{
  onLocationSelect: (location: LocationData) => void  // Required
  initialLocation?: LocationData                      // Optional
}

// Returned Data
{
  address: string      // Full address
  city: string         // City name
  state: string        // State
  pincode: string      // Postal code
  lat: number         // Latitude
  lng: number         // Longitude
}
```

---

## 🆘 Common Issues

| Issue | Solution |
|-------|----------|
| API Key Missing | Check `.env.local` has correct key |
| Map Won't Load | Verify APIs enabled in Google Cloud |
| Search Not Working | Enable Places API in Google Cloud |
| Pincode Not Showing | Enable Geocoding API |
| Slow Loading | Check API quota/limits |

---

## 📱 Mobile Support

✅ Fully responsive  
✅ Touch-friendly map controls  
✅ Works on iOS & Android  
✅ Automatic zoom for mobile  

---

## 🔐 Environment Setup for Team

1. **Create `.env.local` (locally only, not in git)**
2. **Share template in `.env.example`**:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
   ```
3. **Each developer gets their own API key**

---

## 📦 Installed Packages

```json
{
  "@react-google-maps/api": "^2.20.3"
}
```

---

## 🚀 Next Steps

1. ✅ Get Google Maps API Key
2. ✅ Add to `.env.local`
3. ✅ Restart dev server
4. ✅ Test location selection
5. ✅ Integrate with your backend

---

## 📚 Full Documentation

For detailed setup and troubleshooting, see: `GOOGLE_MAPS_SETUP.md`

---

**Status:** ✅ Ready to Use  
**Last Updated:** November 15, 2025
