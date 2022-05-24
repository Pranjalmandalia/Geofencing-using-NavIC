import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import app from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const RegisterScreen = (props) => {
  const auth = getAuth();
  const database = getDatabase(app);
  const [nodeID, setNodeID] = useState("");
  const [childName, setChildName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [childAge, setChildAge] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  const [userCreated, setUserCreated] = useState(false);
  const [hidePass, setHidePass] = useState(true);

  const handlehidepass = () => {
    if (hidePass == true) setHidePass(false);
    else setHidePass(true);
  };

  const emailInputRef = createRef();
  const ageInputRef = createRef();

  const passwordInputRef = createRef();

  function writeUserData(userId, childName, userEmail, childAge, nodeID) {
    const db = getDatabase();
    set(ref(db, "/" + nodeID), {
      childname: childName,
      email: userEmail,
      childage: childAge,
      userId: userId,
      nodeID: nodeID,
      latitude: 0,
      longitude: 0,
      status: "disconnected",
      childStatus: "Not Found",
    }).catch((error) => {
      console.log(error);
    });
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("@storage_Key", value);
    } catch (e) {
      // saving error
      //console.log(e);
    }
  };

  const handleSubmitButton = () => {
    //setErrortext("");
    if (!childName) {
      alert("Please fill Name");
      return;
    }
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!childAge) {
      alert("Please fill Age");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }

    createUserWithEmailAndPassword(auth, userEmail.trim(), userPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user.email);
        setUserCreated(true);
        writeUserData(user.uid, childName, userEmail, childAge, nodeID);
        storeData(nodeID);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage);
        alert(errorMessage);
        setUserCreated(false);
        console.log(userCreated);
      });
  };

  return (
    <View style={{ flex: 1 }}>
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
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../assets/app_bg7.png")}
            style={{
              width: "55%",
              height: 120,
              resizeMode: "contain",
              margin: 60,
            }}
          />
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(ChildName) => setChildName(ChildName)}
              underlineColorAndroid="#f000"
              placeholder="Enter Child Name"
              placeholderTextColor="#787276"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                ageInputRef.current && ageInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(ChildAge) => setChildAge(ChildAge)}
              underlineColorAndroid="#f000"
              placeholder="Enter Child Age"
              placeholderTextColor="#787276"
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) => setUserEmail(UserEmail)}
              underlineColorAndroid="#f000"
              placeholder="Enter Email"
              placeholderTextColor="#787276"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              //blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) => setUserPassword(UserPassword)}
              underlineColorAndroid="#f000"
              placeholder="Enter Password"
              placeholderTextColor="#787276"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={hidePass}
              blurOnSubmit={false}
            />
            <TouchableOpacity
              style={styles.buttonStyle1}
              //activeOpacity={0.5}
              onPress={handlehidepass}
            >
              <Ionicons name={hidePass ? "eye-off" : "eye"} size={28} />
            </TouchableOpacity>
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(nodeID) => setNodeID(nodeID)}
              underlineColorAndroid="#f000"
              placeholder="NodeID"
              placeholderTextColor="#787276"
              keyboardType="numeric"
              ref={ageInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current && emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>

          {errortext != "" ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}
          >
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
      {userCreated == true
        ? (setUserCreated(false), props.navigation.navigate("LoginPage"))
        : null}
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 10,
    marginLeft: 35,
    marginRight: 35,
    margin: 20,
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
  buttonStyle: {
    backgroundColor: "#0c0908",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
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
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  successTextStyle: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    padding: 30,
  },
});
