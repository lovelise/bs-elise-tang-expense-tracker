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

export default function Signup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        Alert.alert("Welcome! Account Created. Back to Login.");
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Account already exits, Back to Login. ");
        navigation.navigate("Login");
      });
  };

  const handleCancel =()=>{
    Alert.alert("Action Cancle, Back to Login");
    navigation.navigate("Login");
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.inputBox}
        value={email}
        onChangeText={(email) => setEmail(email)}
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
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      marginTop:90,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
  },
  inputBox: {
      width: '85%',
      margin: 10,
      padding: 15,
      fontSize: 16,
      borderColor: '#d3d3d3',
      borderBottomWidth: 1,
      textAlign: 'center'
  },
  button: {
      marginTop: 30,
      marginBottom: 20,
      paddingVertical: 5,
      alignItems: 'center',
      backgroundColor: '#FFA611',
      borderColor: '#FFA611',
      borderWidth: 1,
      borderRadius: 5,
      width: 200
  },
  buttonText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff'
  },
  buttonSignup: {
      fontSize: 12
  }
});
