import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  KeyboardAvoidingView,
  ImageBackground,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { async } from "@firebase/util";

const GeofenceSetting = (props) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    //console.log(location.coords.latitude);
    props.setLat(location.coords.latitude);

    props.setLong(location.coords.longitude);
    //console.log(location.coords.longitude);
  };

  return (
    <View style={styles.mainBody}>
      <ImageBackground
        source={require("../assets/app_bg6.png")}
        style={styles.imgBackground}
      >
        <LinearGradient
          colors={["#8e9eab", "#eef2f3"]}
          start={[0.1, 0.1]}
          style={styles.linearGradient}
        ></LinearGradient>
      </ImageBackground>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <KeyboardAvoidingView enabled>
          <View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={props.setRadius}
                placeholder="Radius in meter"
                placeholderTextColor="#787276"
                keyboardType="default"
                //ref={passwordInputRef}
                keyboardTypeOptions="numeric"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                //underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={getLocation}
            >
              <Text style={styles.buttonTextStyle}>Use current Location</Text>
            </TouchableOpacity>

            {location ? (
              <View>
                <View style={styles.SectionStyle}>
                  <Text style={styles.inputStyle1}>
                    Latitude: {location ? location.coords.latitude : null}
                  </Text>
                </View>
                <View style={styles.SectionStyle}>
                  <Text style={styles.inputStyle1}>
                    Longitude: {location ? location.coords.longitude : null}
                  </Text>
                </View>
              </View>
            ) : null}

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                props.setConfirm(true);
              }}
            >
              <Text style={styles.buttonTextStyle}>Set Geofence</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  card_bg: {
    paddingTop: 20,
    backgroundColor: "#b5bfe5",
    marginLeft: 20,
    marginRight: 20,
    paddingBottom: 20,
  },
  imgBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
  },
  linearGradient: {
    width: "100%",
    height: "100%",
    opacity: 0.9,
    justifyContent: "center",
    alignItems: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 45,
    marginRight: 45,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#0c0908",
    borderWidth: 0,
    //    color: "red",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 45,
    marginRight: 45,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 8,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "black",
    paddingTop: 0,
    paddingLeft: 20,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "black",
  },
  inputStyle1: {
    flex: 1,
    color: "black",
    paddingTop: 11,
    paddingLeft: 20,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "black",
  },
});

export default GeofenceSetting;
