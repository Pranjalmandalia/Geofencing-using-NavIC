import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getDatabase, ref, onValue } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AccountScreen = () => {
  const [Userdata, setUserdata] = useState({});
  const [Try, setTry] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("@storage_Key");
      if (value !== null) {
        setTry(value);
        console.log("from accountScreen:" + Try);
      }
    } catch (e) {
      console.log("from accountScreen:" + e);
    }
  };

  useEffect(() => {
    getData();
    if (Try == null) {
      console.log("Null should: " + Try);
    } else {
      console.log("value:" + Try);
      const db = getDatabase();
      const starCountRef = ref(db, "/" + Try);
      onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        setUserdata(data);
        console.log("userdata for account screen:");
        console.log(data);
      });
    }
    return () => {
      setUserdata({}); // This worked for me
    };
  }, [Try]);

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

      <View
        style={{
          marginTop: 30,
          marginLeft: Dimensions.get("window").width * 0.06,
          marginRight: Dimensions.get("window").width * 0.06,
          height: Dimensions.get("window").height > 650 ? "70%" : "81%",
          // width: Dimensions.get("window").width * 0.9,
          backgroundColor: "#F5F5E6",
          elevation: 5,
          shadowColor: "#52006A",
          borderRadius: 5,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              marginTop: 25,
              borderRadius: 100,
              width: Dimensions.get("window").width * 0.4,
              height: Dimensions.get("window").width * 0.4,
            }}
            source={require("../assets/childImg.jpg")}
          />
        </View>
        <View
          style={{
            marginTop: Dimensions.get("window").height * 0.009,
            marginLeft: 40,
            marginBottom: Dimensions.get("window").height * 0.009,
          }}
        >
          <Text style={{ color: "grey", marginTop: 10 }}>NAME</Text>
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            {Userdata.childname}
          </Text>
        </View>
        <View style={styles.hairline} />
        <View
          style={{
            marginTop: Dimensions.get("window").height * 0.009,
            marginLeft: 40,

            marginBottom: Dimensions.get("window").height * 0.009,
          }}
        >
          <Text style={{ color: "grey", marginTop: 0 }}>EMAIL ADDRESS</Text>
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            {Userdata.email}
          </Text>
        </View>
        <View style={styles.hairline} />
        <View
          style={{
            marginTop: Dimensions.get("window").height * 0.009,
            marginLeft: 40,
            marginBottom: Dimensions.get("window").height * 0.009,
          }}
        >
          <Text style={{ color: "grey", marginTop: 0 }}>AGE</Text>
          <Text style={{ fontWeight: "bold", marginTop: 10 }}>
            {Userdata.childage} Years
          </Text>
        </View>
        <View style={styles.hairline} />
        <View
          style={{
            marginTop: Dimensions.get("window").height * 0.009,
            marginLeft: 40,
          }}
        >
          <Text
            style={{
              color: "grey",
              marginTop: Dimensions.get("window").width * 0.009,
            }}
          >
            Child ID
          </Text>
          <Text style={{ fontWeight: "bold", marginTop: 12 }}>
            {Userdata.nodeID}
          </Text>
        </View>
        {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            // onPress={handleSubmitPress}
          >
            <Text style={styles.buttonTextStyle}>LogOut</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
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
  hairline: {
    marginTop: 2,
    marginBottom: 2,
    backgroundColor: "#DADEDF",
    height: 2,
    // width: 165,
  },
  buttonStyle: {
    backgroundColor: "#0c0908",
    borderWidth: 0,
    color: "red",
    borderColor: "#7DE24E",
    height: Dimensions.get("window").height * 0.049,
    //alignItems: "center",
    borderRadius: 30,
    marginTop: Dimensions.get("window").width * 0.03,

    justifyContent: "center",
  },
  buttonTextStyle: {
    alignItems: "center",
    color: "#FFFFFF",
    paddingVertical: 8,
    fontSize: 12,
    paddingLeft: Dimensions.get("window").width * 0.15,

    paddingRight: Dimensions.get("window").width * 0.15,
  },
});

export default AccountScreen;
