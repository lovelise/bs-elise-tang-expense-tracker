import React, { useState } from "react";
import { StyleSheet, View, Text,TouchableOpacity } from "react-native";
import Summary from "./Summary";
import DetailList from "./DetailList";
import AddTransationModal from "./AddTransationModal";
import { GlobalProvider } from "../context/GlobalState";
import { LinearGradient } from "expo-linear-gradient";

export default function Header() {
  const [isOn, setIsOn] = useState(false);
  const cancelModel = () => {
    setIsOn(false);
  };
  return (
    <GlobalProvider>
      
      <View style={styles.screen}>
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
        <Summary />
        <TouchableOpacity style={styles.addModal}>

          <Text
            style={styles.btn}
            onPress={() => setIsOn(true)}
          >Add New Transation</Text>
        </TouchableOpacity>

        <AddTransationModal visible={isOn} cancel={cancelModel} />
        <DetailList />
      </View>
    </GlobalProvider>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
  addModal: {
    marginLeft:20,
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#69cfac",
    borderColor: "#341b5e",
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  btn: {
      color: "#341b5e"
  },
});
