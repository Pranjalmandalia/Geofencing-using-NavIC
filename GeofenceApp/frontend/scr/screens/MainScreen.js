import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import GeofenceSetting from "./GeofenceSetting";
import MapScreen from "./MapScreen";
import { getDatabase, ref, onValue } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
const MainScreen = (props) => {
  //console.log(props.route.params);
  const [Confirm, setConfirm] = useState(false);
  const [Radius, setRadius] = useState(0);
  const [Lat, setLat] = useState(0);
  const [Long, setLong] = useState(0);
  const [ChildLat, setChildLat] = useState(0);
  const [ChildLong, setChildLong] = useState(0);
  const [counter, changeCounter] = useState(0);
  const [Status, setStatus] = useState("Inside");
  const [NavicStatus, SetNavicStatus] = useState("Disconnected");

  const [Distance, setDistance] = useState(0);

  const [Try, setTry] = useState("");

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        setTry(value);
      }
    } catch (e) {}
  };

  useEffect(() => {
    console.log("confirm status:" + Confirm);
    const interval = setInterval(async () => {
      getData();
      if (Confirm === true) {
        console.log("Try:" + Try);
        if (Try != null) {
          const db = getDatabase();

          const starCountRef = ref(db, "/" + Try);
          onValue(starCountRef, async (snapshot) => {
            const data = await snapshot.val();

            console.log("data fetching from firebase: ");

            console.log(data);
            SetNavicStatus(data.status);
            if (data.latitude > 0 && data.longitude > 0) {
              setChildLat(data.latitude / 1000000);
              setChildLong(data.longitude / 1000000);
              console.log(ChildLong);

              if (ChildLong == 0) setDistance("Not Found");
              else
                setDistance(
                  calculateDistance(Lat, Long, ChildLat, ChildLong).toFixed(4)
                );

              if (data.latitude === 999000000 || data.longitude === 999000000)
                SetNavicStatus("Disconneted");
              else SetNavicStatus("Connected");
            } else {
              setChildLat(0);
              setChildLong(0);
              setDistance(NaN);
            }
          });
        }
      } else {
        changeCounter(counter + 1);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [ChildLat, counter]);

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function calculateDistance(lat2, long2, lat1, long1) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(long2 - long1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    //console.log(d * 1000);
    return d * 1000;
  }

  if (Confirm === true) {
    var dis = calculateDistance(Lat, Long, ChildLat, ChildLong);
    var current_status = "";
    if (dis > Radius) {
      //console.log(dis);
      //console.log("outside");
      current_status = "Outside";
    } else {
      //console.log(dis);
      //console.log("Inside");
      current_status = "Inside";
    }

    if (Status != current_status) {
      setStatus(current_status);
    }
  }

  const handleRadiusChangeP = () => {
    setRadius(Radius + 0.5);
  };

  const handleRadiusChangeN = () => {
    setRadius(Radius - 0.5);
  };
  return Confirm === false ? (
    <GeofenceSetting
      setConfirm={setConfirm}
      setRadius={setRadius}
      setLat={setLat}
      setLong={setLong}
    ></GeofenceSetting>
  ) : (
    <View>
      <MapScreen
        radius={parseInt(Radius)}
        lat={parseFloat(Lat)}
        long={parseFloat(Long)}
        childlat={parseFloat(ChildLat)}
        childlong={parseFloat(ChildLong)}
      ></MapScreen>
      <View style={styles.detailsSection}>
        <View
          style={{
            paddingTop: "5%",
            //backgroundColor: "green",
            width: Dimensions.get("window").width * 0.5,
            flex: 1,
          }}
        >
          <Text style={styles.textStyle}>
            Latitude:
            {ChildLat == 999.0 ? " Not found" : parseFloat(ChildLat).toFixed(4)}
          </Text>
          <Text style={styles.textStyle}>
            Longitude:
            {ChildLong == 999.0
              ? " Not found"
              : parseFloat(ChildLong).toFixed(4)}
          </Text>
        </View>
        <View
          style={{
            //justifyContent: "flex-end",
            paddingTop: "5%",
            //backgroundColor: "red",
            width: Dimensions.get("window").width * 0.5,
            flex: 1,
          }}
        >
          <Text style={styles.textStyle}>
            Status: {Distance == "Not Found" ? "Not Found" : Status}
          </Text>

          <Text style={styles.textStyle}>Dis: {Distance}</Text>
        </View>
      </View>
      <View style={styles.detailsSection2}>
        <View
          style={{
            alignItems: "center",
            paddingTop: "0%",
            //backgroundColor: "green",
            width: Dimensions.get("window").width,
            flex: 1,
          }}
        >
          <Text style={styles.textStyle}>
            Navic: {NavicStatus.charAt(0).toUpperCase() + NavicStatus.slice(1)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    //textAlign: "center",
    fontSize: 15,
    //fontWeight: "bold",
    margin: 5,
    color: "#d0d0d0",
    paddingLeft: 10,
  },
  detailsSection: {
    flexDirection: "row",
    height: "10%",
    backgroundColor: "#1e272c",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  detailsSection2: {
    flexDirection: "row",
    justifyContent: "center",
    height: "6%",
    backgroundColor: "#1e272c",
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});

export default MainScreen;
