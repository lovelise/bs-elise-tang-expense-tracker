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

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailIsValid, setEmailIsValid] = useState(false);

  const checkEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isTrue = re.test(email);
    if (isTrue !== true) {
      setEmailIsValid(false);
    } else {
      setEmailIsValid(true);
    }

    setEmail(email);
  };

  const handleLogin = () => {
    if (!emailIsValid) {
      Alert.alert("please entry valid email");
      return;
    } else if (!password) {
      Alert.alert("Please entry password");
      return;
    }

    Firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        navigation.navigate("Main");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignup = () => {
    navigation.navigate("Signup");
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
          value={email}
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnNewUser} onPress={handleSignup}>
          <Text style={styles.btnNewUserText}>New user</Text>
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
    marginTop: 200,
  },

  inputBox: {
    width: "85%",
    marginTop: 10,
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
    backgroundColor: "#a1ade1",
    borderColor: "#94e9c9",
    borderWidth: 1,
    borderRadius: 5,
    width: 150,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  btnNewUser: {
    marginTop: 20,
  },
  btnNewUserText: {
    fontSize: 20,
    color: "#66dfad",
  },
});
