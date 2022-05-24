import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ImageBackground, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import LoginPage from "./LoginPage";

const LoadingScreen = () => {
  const [dataLoaded, setdataLoaded] = useState(false);

  useState(() => {
    setTimeout(() => {
      setdataLoaded(true);
    }, 5000);
  }, []);

  if (!dataLoaded)
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require("../assets/app_bg6.png")}
          style={styles.imgBackground}
        >
          <LinearGradient
            colors={["#8e9eab", "#eef2f3"]}
            start={[0.1, 0.1]}
            style={styles.linearGradient}
          >
            <Image
              style={styles.logo}
              source={require("../assets/app_bg7.png")}
            ></Image>
            <Text style={styles.text}>CHILD SAFETY APP</Text>
            <Text style={styles.taglineText}>We understand your concerns</Text>
          </LinearGradient>
        </ImageBackground>
      </View>
    );

  return <LoginPage></LoginPage>;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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
    opacity: 0.87,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    fontFamily: "sans-serif-condensed",
  },
  logo: {
    height: "15%",
    width: "30%",
  },
  taglineText: {
    fontFamily: "serif",
    fontStyle: "italic",
    color: "black",
    textAlign: "center",
    fontSize: 15,
  },
});

export default LoadingScreen;
