import React, { useState, useContext, useEffect } from "react";
import { Modal, StyleSheet, View, Text, TextInput, Button } from "react-native";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-native-uuid";

const AddTransationModal = (props) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const { addTransaction } = useContext(GlobalContext);

  const onsubmit = () => {
    const newTransaction = {
      id: uuid.v4(),
      name,
      amount: +amount,
    };
    addTransaction(newTransaction);
    props.cancel();
    setName(""), setAmount("");
  };

  return (
    <Modal visible={props.visible} animationType="fade">
      <View style={styles.title}>
        <Text>ADD NEW EXPENSE</Text>
      </View>

      <View style={styles.inputContainer}>
        <View style={styles.incomeContainer}>
          <Text>About Transaction</Text>
          <TextInput
            placeholder="About"
            style={styles.input}
            onChangeText={(name) => setName(name)}
            value={String(name)}
          />
          <Text>Amount</Text>
          <Text>"+" for Income, "-" for Expense</Text>
          <TextInput
            placeholder="Amount"
            style={styles.input}
            onChangeText={(amount) => setAmount(amount)}
            value={String(amount)}
            keyboardType="default"
          />
          <View>
            <Button title="ADD" onPress={onsubmit} />
            <Button title="CANCLE" color="red" onPress={props.cancel} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginLeft: 120,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  incomeContainer: {
    flex: 1,
    marginTop: 20,
  },
});

export default AddTransationModal;
