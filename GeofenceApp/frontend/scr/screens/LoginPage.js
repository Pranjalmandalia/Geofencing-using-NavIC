import { React } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState, createRef, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const LoginPage = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const passwordInputRef = createRef();
  const [valid, setValidUser] = useState(false);
  const [userId, setUserId] = useState("");
  const [hidePass, setHidePass] = useState(true);

  const handlehidepass = () => {
    if (hidePass == true) setHidePass(false);
    else setHidePass(true);
  };

  const handleSubmitPress = () => {
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }

    if (!userPassword) {
      alert("Please fill Password");
      return;
    }

    const auth = getAuth();
    signInWithEmailAndPassword(auth, userEmail.trim(), userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
        setUserId(user.id);
        setValidUser(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
        setUserId(errorMessage);
        alert(errorMessage);
        setValidUser(false);
      });
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
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/app_bg7.png")}
                style={{
                  width: "55%",
                  height: 120,
                  resizeMode: "contain",
                  margin: 5,
                }}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder="Enter Email" //dummy@abc.com
                placeholderTextColor="#787276"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current && passwordInputRef.current.focus()
                }
                // underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password" //12345
                placeholderTextColor="#787276"
                keyboardType="default"
                //ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={hidePass}
                //underlineColorAndroid="#f000"
                returnKeyType="next"
              ></TextInput>

              <TouchableOpacity
                style={styles.buttonStyle1}
                //activeOpacity={0.5}
                onPress={handlehidepass}
              >
                <Ionicons name={hidePass ? "eye-off" : "eye"} size={28} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate("SignUp")}
            >
              New Here? Register
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
      {valid == true
        ? (setValidUser(false),
          props.navigation.navigate("BottomTab", {
            itemId: userId,
          }))
        : null}
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
    opacity: 0.85,
    justifyContent: "center",
    alignItems: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#0c0908",
    borderWidth: 0,
    color: "red",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
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
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "black",
  },
  registerTextStyle: {
    color: "#29021A",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 5,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },

  buttonStyle1: {
    //backgroundColor: "#0c0908",
    //borderWidth: 0,
    //color: "red",
    //borderColor: "#7DE24E",
    //height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 4,
    marginTop: 5,
  },
  buttonTextStyle1: {
    color: "#FFFFFF",
    paddingVertical: 8,
    fontSize: 16,
  },
});

export default LoginPage;
