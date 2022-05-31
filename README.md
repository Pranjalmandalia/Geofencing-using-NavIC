# Geofencing-using-NavIC
To design a child safety application of geofencing using NavIC/IRNSS  such that parents can monitor child's location without children using smartphones

## Hardware used

* <a href="https://github.com/Xinyuan-LilyGO/LilyGo-T-Call-SIM800/"> LilyGo T-Call SIM800C </a> 
* NavIC/IRNSS receiver

## Mobile App 

Mobile Application is developed with React Native Expo. 
App has 5 main Screens:
1. Registration Screen
2. Login Screen
3. Geofence Setting Screen
4. Real-time Tracking Screen
5. Account detail Screen

### Registration Screen
New User enter the asked details and create the password. Behind the scene, Firebase authentication SDK is used as a sign-in method and entered details also get stored in real-time firebase Data Base.

### Login Screen
To sign a user into the app, User enter the authentication credentials in Login Screen. In the background, these credentials get passed to the Firebase Authentication SDK. Backend services then verify those credentials and return a response whether user is authorised to use the App or not.

### Geofence Setting Screen
User can enter the radius of geofence Circle and enter the location(parent location). This create the virtual geofence.

### Real-time Tracking Screen
This Screen show the live tracking of child. It also show the useful informations that 
- Latitude 
- Longitude 
- Navic Status-> whether Hardware (Navic) receiving the lat/long from statellites or not.
- Child Status-> Whether Child is inside the geofence or not.
- Distance-> Shows the distance between child and parent.

### Account Detail Screen
Show the deatils entered during registration process.


