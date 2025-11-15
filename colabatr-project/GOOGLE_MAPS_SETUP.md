# Google Maps Location Selector Setup Guide

## 🎯 Overview
Google Maps Location Selector has been successfully integrated into your application. It replaces the previous dropdown-based location selector with an interactive map-based solution.

## 📋 Step-by-Step Setup

### Step 1: Get Google Maps API Key

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com/
   - Sign in with your Google account (create one if needed)

2. **Create a New Project**
   - Click on "Select a project" → "New Project"
   - Enter project name (e.g., "PromoHub Location")
   - Click "Create"

3. **Enable Required APIs**
   - Navigate to "APIs & Services" → "Library"
   - Search for and enable these APIs:
     - **Google Maps JavaScript API**
     - **Places API**
     - **Geocoding API**
   - Click "Enable" for each

4. **Create API Key**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key

5. **Set API Key Restrictions (Important for Production)**
   - In the Credentials page, click on your API key
   - Under "Key restrictions":
     - Select "HTTP referrers (web sites)"
     - Add your domain(s):
       - For development: `localhost:3000/*`
       - For production: `yourdomain.com/*`
   - Under "API restrictions":
     - Select "Restrict key"
     - Choose these APIs:
       - Google Maps JavaScript API
       - Places API
       - Geocoding API

### Step 2: Add API Key to Environment

1. **Open `.env.local` file**
   ```bash
   c:\Users\SHIVAM\Desktop\gptpromohub\colabatr-project\.env.local
   ```

2. **Replace placeholder with your key**
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_COPIED_API_KEY_HERE
   ```

3. **Save the file**

### Step 3: Restart Development Server

```bash
npm run dev
```

The server will automatically reload with the new API key.

---

## 🗺️ Features Implemented

### 1. **Interactive Map**
   - Full-screen Google Map centered on India
   - Click anywhere to select location
   - Zoom controls enabled
   - Gesture handling for mobile

### 2. **Search Box**
   - Real-time search suggestions using Google Places
   - Search by city name, address, or postal code
   - Autocomplete functionality

### 3. **Location Details**
   - **City**: Automatically extracted from geocoding
   - **State**: Administrative area level 1
   - **Postal Code**: Automatically retrieved
   - **Coordinates**: Latitude and Longitude (4 decimal precision)
   - **Full Address**: Complete formatted address

### 4. **Visual Feedback**
   - Marker placed at selected location
   - Selected location details displayed in card
   - Real-time coordinate updates
   - Help text for user guidance

---

## 📁 Files Created/Modified

### New Files:
1. **`components/GoogleMapsLocationSelector.tsx`**
   - Main Google Maps component
   - Handles map interactions and geocoding
   - Exports `LocationData` interface

2. **`.env.local`**
   - Environment configuration file
   - Contains Google Maps API key

### Modified Files:
1. **`app/location/page.tsx`**
   - Replaced dropdown selector with Google Maps component
   - Updated to handle location selection
   - New `LocationData` interface

---

## 🔧 Component API

### GoogleMapsLocationSelector Props

```typescript
interface GoogleMapsLocationSelectorProps {
  onLocationSelect: (location: LocationData) => void
  initialLocation?: LocationData
}

interface LocationData {
  address: string      // Full formatted address
  city: string         // City name
  state: string        // State/Province
  pincode: string      // Postal code
  lat: number         // Latitude
  lng: number         // Longitude
}
```

### Usage Example

```tsx
import GoogleMapsLocationSelector from '@/components/GoogleMapsLocationSelector'

export default function MyPage() {
  const handleLocationSelect = (location: LocationData) => {
    console.log('Selected:', location)
    // Do something with location data
  }

  return (
    <GoogleMapsLocationSelector onLocationSelect={handleLocationSelect} />
  )
}
```

---

## 🎮 User Interactions

### How Users Select Location

1. **Search Method**
   - Type in search box
   - Select from autocomplete suggestions
   - Location updates on map with marker

2. **Click Method**
   - Click anywhere on the map
   - Marker placed at clicked location
   - Location details auto-populated

### What Data is Captured

✅ City name  
✅ State/Province  
✅ Postal Code  
✅ Exact Coordinates (Lat/Lng)  
✅ Full Address  

---

## 🐛 Troubleshooting

### Issue: "Google Maps API Key Missing"
**Solution:** 
- Check `.env.local` file exists
- Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set correctly
- Restart dev server after saving

### Issue: Map doesn't load
**Solution:**
- Verify API key is valid
- Check Google Cloud Console for quota limits
- Ensure all required APIs are enabled (JavaScript API, Places API, Geocoding API)
- Check browser console for specific errors

### Issue: Search not working
**Solution:**
- Enable "Places API" in Google Cloud Console
- Add additional API restriction if needed
- Clear browser cache and restart dev server

### Issue: Slow map loading
**Solution:**
- API key might have high latency
- Check internet connection
- Consider using API key with region-specific restrictions

---

## 📊 API Quota & Pricing

- **Free Tier**: 25,000 map loads/day + API usage
- **Billing**: Starts after exceeding free tier
- **Monitor Usage**: Google Cloud Console → "Billing" section

---

## 🔐 Security Best Practices

✅ **DO:**
- Use `NEXT_PUBLIC_` prefix only for frontend keys
- Restrict API key to specific domains
- Restrict to specific APIs needed only
- Monitor quota usage regularly
- Rotate keys periodically

❌ **DON'T:**
- Share API key publicly
- Commit API key to version control
- Use unrestricted API keys in production
- Share `.env.local` file

---

## 🚀 Deployment Checklist

- [ ] API key obtained and verified
- [ ] `.env.local` updated with API key
- [ ] All APIs enabled in Google Cloud Console
- [ ] API key restrictions set properly
- [ ] Development testing completed
- [ ] Error handling verified
- [ ] Mobile responsiveness tested
- [ ] Performance monitored

---

## 📞 Support Resources

- **Google Maps Documentation**: https://developers.google.com/maps
- **Places API Documentation**: https://developers.google.com/maps/documentation/places
- **Geocoding API Documentation**: https://developers.google.com/maps/documentation/geocoding
- **React Google Maps**: https://react-google-maps-api-docs.netlify.app/

---

## ✅ Testing Checklist

- [ ] Test search functionality with different cities
- [ ] Test clicking on map at different locations
- [ ] Verify postal codes are retrieved correctly
- [ ] Test on mobile devices (responsive)
- [ ] Test with initial location prop
- [ ] Verify coordinates precision
- [ ] Check error handling when API fails

---

**Last Updated:** November 15, 2025  
**Status:** ✅ Ready for Integration
