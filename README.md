# Geofencing-using-NavIC
To design a child safety application of geofencing using NavIC/IRNSS  such that parents can monitor child's location without children using smartphones

## Hardware used

* <a href="https://github.com/Xinyuan-LilyGO/LilyGo-T-Call-SIM800/"> LilyGo T-Call SIM800C </a> 
* NavIC/IRNSS receiver

## Mobile App 
<p align="center">
<img src="https://user-images.githubusercontent.com/47287530/171267563-d40e5377-c747-4ce8-ab6a-5702d2d64568.jpeg" width="200" height="400" />
</p>

Mobile Application is developed with React Native Expo. 
App has 5 main Screens:

1. Registration Screen
2. Login Screen
3. Geofence Setting Screen
4. Real-time Tracking Screen
5. Account detail Screen

### Registration Screen
<p align="center">
<img src="https://user-images.githubusercontent.com/47287530/171267652-029649da-d35e-4423-8420-fcf4e5886581.jpg" width="200" height="400"/>
  </p>
New User enter the asked details and create the password. Behind the scene, Firebase authentication SDK is used as a sign-in method and the entered details also get stored in real-time firebase DataBase.

### Login Screen
<p align="center">

<img src="https://user-images.githubusercontent.com/47287530/171267615-be6b9da4-badb-4127-a842-32b110cbbe1a.jpg" width="200" height="400" />
</p>
To sign a user into the app, User enter the authentication credentials in Login Screen. In the background, these credentials get passed to the Firebase Authentication SDK. Backend services then verify those credentials and return a response whether user is authorised to use the App or not.

### Geofence Setting Screen
<p align="center">

<img src="https://user-images.githubusercontent.com/47287530/171267615-be6b9da4-badb-4127-a842-32b110cbbe1a.jpg" width="200" height="400" />
</p>
User can enter the radius of geofence Circle and the current location(parent location). This create the virtual geofence centered at parent location.

### Real-time Tracking Screen
<p align="center">

<img src="https://user-images.githubusercontent.com/47287530/171267679-63e36930-4d1d-44ed-b918-980931347c77.jpg" width="200" height="400" />
</p>
This Screen show the live tracking of child. It also show the useful informations that 
- Latitude 
- Longitude 
- Navic Status-> Whether Hardware (Navic) receiving the lat/long from statellites or not.
- Child Status-> Whether Child is inside the geofence or not.
- Distance-> Shows the distance between child and parent.

### Account Detail Screen
Show the details entered while doing registration process.


