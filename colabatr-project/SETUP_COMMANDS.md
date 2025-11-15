# 🚀 Google Maps Location Selector - EXACT SETUP COMMANDS

**Copy & paste these commands in order to get started!**

---

## ✅ STEP 1: Get Your API Key (5 minutes)

### Open Google Cloud Console
```
https://console.cloud.google.com/
```

### Commands (if using gcloud CLI)
```bash
# Login to Google Cloud
gcloud auth login

# Create new project
gcloud projects create promohub-maps --name="PromoHub Maps"

# Set project as default
gcloud config set project promohub-maps

# Enable required APIs
gcloud services enable maps-backend.googleapis.com
gcloud services enable places-backend.googleapis.com
gcloud services enable geocoding-backend.googleapis.com

# Create API key
gcloud alpha services api-keys create \
  --display-name="PromoHub Location Maps"
```

### OR Manual Steps (Recommended for First Time)
1. Go to: https://console.cloud.google.com/
2. Click "Select a Project" → "New Project"
3. Enter name: `PromoHub`
4. Click "Create"
5. Search for "Google Maps JavaScript API" → Enable
6. Search for "Places API" → Enable
7. Search for "Geocoding API" → Enable
8. Go to "Credentials" → "Create Credentials" → "API Key"
9. Copy your API key

---

## ✅ STEP 2: Add API Key to Your Project

### Windows PowerShell
```powershell
# Navigate to project
cd c:\Users\SHIVAM\Desktop\gptpromohub\colabatr-project

# Create/Edit .env.local with your key
@"
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_ACTUAL_API_KEY_HERE
"@ | Set-Content .env.local
```

### Or Manual Edit
1. Open: `.env.local`
2. Replace `YOUR_ACTUAL_API_KEY_HERE` with your actual key
3. Save file

### Verify
```bash
# Check if .env.local exists
cat .env.local
# Should show: NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_KEY_HERE
```

---

## ✅ STEP 3: Start Development Server

```bash
# Navigate to project
cd c:\Users\SHIVAM\Desktop\gptpromohub\colabatr-project

# Start dev server
npm run dev
```

**You should see:**
```
✓ Next.js 14.0.4
- Local: http://localhost:3000
✓ Ready in X.Xs
```

---

## ✅ STEP 4: Test the Feature

### In Your Browser
```
Open: http://localhost:3000/location
```

### Try These Actions
1. **Search Test**
   - Type "Mumbai" in search box
   - Select from dropdown
   - Verify pincode shows

2. **Click Test**
   - Click anywhere on the map
   - Verify marker appears
   - Check pincode is populated

3. **Mobile Test**
   - Open DevTools (F12)
   - Toggle device toolbar
   - Try on mobile view

---

## 📋 FULL COMMAND SEQUENCE

### Complete Start-to-Finish

```bash
# 1. Navigate to project
cd c:\Users\SHIVAM\Desktop\gptpromohub\colabatr-project

# 2. Verify packages installed
npm list @react-google-maps/api
# Should show: @react-google-maps/api@2.20.3

# 3. Build to verify everything works
npm run build

# 4. Start dev server
npm run dev

# 5. In another terminal, check if API key is set
cat .env.local

# 6. Open browser
start http://localhost:3000/location
```

---

## 🔍 VERIFICATION COMMANDS

### Check Installation
```bash
# Verify package installed
npm list @react-google-maps/api

# Expected output: @react-google-maps/api@2.20.3
```

### Check Environment
```bash
# Verify .env.local exists
test -f .env.local && echo "✅ .env.local exists" || echo "❌ .env.local missing"

# Check if API key is set
grep NEXT_PUBLIC_GOOGLE_MAPS_API_KEY .env.local
```

### Build Status
```bash
# Full build
npm run build

# Expected: ✅ Compiled successfully
```

### Development Server
```bash
# Start dev
npm run dev

# Expected: ✓ Ready in X.Xs
# Access: http://localhost:3000
```

---

## 🆘 TROUBLESHOOTING COMMANDS

### If API key not working
```bash
# 1. Verify .env.local
cat .env.local

# 2. Check if key has special characters that need escaping
# Re-add it if needed

# 3. Restart dev server
# Stop current: Ctrl+C
# Start new: npm run dev
```

### If build fails
```bash
# 1. Clear next build
rm -r .next

# 2. Reinstall dependencies
npm install

# 3. Try build again
npm run build
```

### If nothing shows
```bash
# 1. Check browser console (F12 → Console)
# Look for errors

# 2. Check terminal for errors
# Look at npm run dev output

# 3. Verify API key is correct
cat .env.local
```

---

## 📊 EXPECTED BEHAVIOR AFTER SETUP

### On Page Load
- ✅ Map loads centered on India
- ✅ Search box visible at top
- ✅ "💡 Search for a location or click on the map" message

### On Search
- ✅ Autocomplete suggestions appear
- ✅ Click on suggestion
- ✅ Marker placed on map
- ✅ Details card shows below map

### Details Card Shows
- ✅ City name
- ✅ State name
- ✅ **Pincode** (this is the key feature!)
- ✅ Coordinates (lat, lng)
- ✅ Full address

### On Map Click
- ✅ Marker appears at clicked location
- ✅ Details auto-populate
- ✅ Pincode extracted

---

## 🎯 QUICK CHECKLIST

After setup, verify:

- [ ] .env.local file exists
- [ ] NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set
- [ ] npm run dev starts successfully
- [ ] http://localhost:3000/location loads
- [ ] Map is visible
- [ ] Search box works
- [ ] Click on map places marker
- [ ] Pincode appears in details

---

## 💡 TIPS

### If Running Multiple Projects
```bash
# Run on different port
PORT=3001 npm run dev
# Access: http://localhost:3001
```

### Stopping Dev Server
```bash
# Press Ctrl+C in terminal
# Or kill process
npx kill-port 3000
```

### Checking Node Version
```bash
# Verify you have Node.js installed
node --version
# Should be v18+

npm --version
# Should be v9+
```

### Reinstall Everything Fresh
```bash
# 1. Remove node_modules
rm -r node_modules

# 2. Clear npm cache
npm cache clean --force

# 3. Reinstall
npm install

# 4. Start fresh
npm run dev
```

---

## 📞 NEED HELP?

**If stuck on:**

| Issue | Solution |
|-------|----------|
| API key creation | See GOOGLE_MAPS_SETUP.md |
| Map not loading | Verify .env.local and restart server |
| Search not working | Enable Places API in Google Cloud |
| Pincode missing | Enable Geocoding API in Google Cloud |
| Build errors | Run `npm install` and try again |

---

## 🎓 LEARNING NEXT

After basic setup works:

1. **Read:** `GOOGLE_MAPS_EXAMPLES.md`
2. **Choose:** Integration pattern that fits your needs
3. **Copy:** Example code
4. **Adapt:** To your use case
5. **Test:** In your app
6. **Deploy:** When ready

---

## 📱 MOBILE TESTING

### iOS
```
1. Get your computer's local IP
   Windows: ipconfig (look for "IPv4 Address")
   
2. On your iPhone:
   Safari → http://YOUR_IP:3000/location
   
3. Test map and search
```

### Android
```
1. Same as iOS
2. On Android device:
   Chrome → http://YOUR_IP:3000/location
```

---

## 🚀 YOU'RE READY!

All files are in place. Just:

1. **Get API key** (5 min)
2. **Add to `.env.local`** (1 min)
3. **Run `npm run dev`** (1 min)
4. **Test in browser** (1 min)

**Total time: ~8 minutes**

Then start integrating into your app!

---

## 📋 CHECKLIST

```
Setup Verification:
☐ API key obtained from Google Cloud
☐ .env.local file created
☐ NEXT_PUBLIC_GOOGLE_MAPS_API_KEY added
☐ npm install ran successfully
☐ npm run build completed
☐ npm run dev started
☐ Browser shows location page
☐ Search box works
☐ Map responds to clicks
☐ Pincode displays
```

---

**Ready to go!** 🚀

Next: Follow the commands above, then check out `GOOGLE_MAPS_EXAMPLES.md` for integration patterns!
