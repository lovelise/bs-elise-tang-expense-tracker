import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import Firebase from "../config/Firebase";
import { LinearGradient } from "expo-linear-gradient";

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [comfrimedPassword, setComfirmedPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

  const checkEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isTrue = re.test(email);
    if (isTrue !== true) {
      setEmailIsValid(false);
      
    }else{
      setEmailIsValid(true)
    }

    setEmail(email)
  };

  const handleSignUp = () => {
  
    if (!emailIsValid) {
      Alert.alert("please entry valid email");
      return;
    }
    else if(password !== comfrimedPassword){
      Alert.alert("please check you password");
      return;
    }
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Welcome! Account Created. Back to Login.");
        navigation.navigate("Welcome");
      })
      .catch((error) => {
        Alert.alert("error: ",error);
        navigation.navigate("Welcome");
      });
  };

  const handleCancel = () => {
    Alert.alert("Action Cancle, Back to Login");
    navigation.navigate("Welcome");
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["rgba(226,194,223,0.8)", "transparent"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: 400,
        }}
      />
      <View style={styles.form}>
        <TextInput
          style={styles.inputBox}
          value={String(email)}
          onChangeText={checkEmail}
          placeholder="Email"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.inputBox}
          value={password}
          onChangeText={(password) => setPassword(password)}
          placeholder="Password"
          secureTextEntry={true}
        />
        <TextInput
          style={styles.inputBox}
          value={comfrimedPassword}
          onChangeText={(password) => setComfirmedPassword(password)}
          placeholder="Comfrim Password"
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
          <Text style={styles.buttonText}>Cancle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  form: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  inputBox: {
    width: "85%",
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: "#d3d3d3",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#66dfad",
    borderColor: "#66dfad",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  buttonSignup: {
    fontSize: 12,
  },
  cancelBtn: {
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#ee2b2b",
    borderColor: "#ee2b2b",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
});
