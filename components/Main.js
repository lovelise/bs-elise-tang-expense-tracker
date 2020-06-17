import React, { useState } from "react";
import { StyleSheet, View, Button } from "react-native";
import Summary from "./Summary";
import DetailList from "./DetailList";
import AddTransationModal from "./AddTransationModal";
import { GlobalProvider } from "../context/GlobalState";

export default function Header() {
  const [isOn, setIsOn] = useState(false);
  const cancelModel = () => {
    setIsOn(false);
  };
  return (
    <GlobalProvider>
      <View style={styles.screen}>
        <Summary />
        <Button title="Add New Transation" onPress={() => setIsOn(true)} />
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
});
