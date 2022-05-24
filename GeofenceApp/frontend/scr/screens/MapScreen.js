import React, { useState } from "react";
import MapView, { Callout, Circle, Marker } from "react-native-maps";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";

const MapScreen = (props) => {
  const [Timer, setTimer] = useState(false);

  setTimeout(() => {
    setTimer(true);
  }, 1200);

  if (Timer === false) {
    return (
      <View style={styles.mainBody}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: props.lat,
            longitude: props.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          provider="google"
        >
          <Marker coordinate={{ latitude: props.lat, longitude: props.long }}>
            <Callout>
              <View>
                <View style={{ height: 55, width: 100 }}>
                  <Text style={styles.title}>Parent</Text>
                  <Text style={styles.description}>
                    Lat: {props.lat.toFixed(4)}
                  </Text>
                  <Text style={styles.description}>
                    Long: {props.long.toFixed(4)}
                  </Text>
                </View>
              </View>
            </Callout>
          </Marker>

          <Marker
            coordinate={{
              latitude: props.childlat,
              longitude: props.childlong,
            }}
          >
            <Image
              source={require("../assets/boy.png")}
              style={{ height: 50, width: 55 }}
            />
          </Marker>
        </MapView>
      </View>
    );
  } else
    return (
      <View style={styles.mainBody}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: props.lat,
            longitude: props.long,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          provider="google"
        >
          <Marker coordinate={{ latitude: props.lat, longitude: props.long }}>
            <Callout>
              <View>
                <View style={{ height: 55, width: 100 }}>
                  <Text style={styles.title}>Parent</Text>
                  <Text style={styles.description}>
                    Lat: {props.lat.toFixed(4)}
                  </Text>
                  <Text style={styles.description}>
                    Long: {props.long.toFixed(4)}
                  </Text>
                </View>
              </View>
            </Callout>
          </Marker>

          <Circle
            center={{ latitude: props.lat, longitude: props.long }}
            radius={props.radius}
            fillColor={"rgb(180, 208, 207)"}
            strokeColor={"rgb(200, 0, 207)"}
          ></Circle>

          <Marker
            coordinate={{
              latitude: props.childlat,
              longitude: props.childlong,
            }}
          >
            <Image
              source={require("../assets/boy.png")}
              style={{ height: 50, width: 55 }}
            />
            <Callout>
              <View>
                <View style={{ height: 55, width: 90 }}>
                  <Text style={styles.title}>Child</Text>
                  <Text style={styles.description}>
                    Lat: {props.childlat.toFixed(4)}
                  </Text>
                  <Text style={styles.description}>
                    Long: {props.childlong.toFixed(4)}
                  </Text>
                </View>
              </View>
            </Callout>
          </Marker>
        </MapView>
      </View>
    );
};

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 50,
  },
  map: {
    width: Dimensions.get("window").width,
    height:
      Dimensions.get("window").height -
      (Dimensions.get("window").height > 650 ? 0.17 : 0.21) *
        Dimensions.get("window").height,
  },
  title: {
    fontSize: 14,
    marginBottom: 5,
  },
  description: {
    fontSize: 8,
  },
  mainBody: {
    justifyContent: "center",
    alignContent: "center",
  },
});

export default MapScreen;
