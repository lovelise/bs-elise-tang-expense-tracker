import React, { useState, useContext, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { GlobalContext } from "../context/GlobalState";
import uuid from "react-native-uuid";
import { LinearGradient } from "expo-linear-gradient";
  

const AddTransationModal = (props) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [nameIsValid, setNameIsValid] = useState(false);
  const [amountIsValid, setAmountIsValid] = useState(false);
  const { addTransaction } = useContext(GlobalContext);

  const nameChangeHandler = (name) => {
    if (name.trim().length === 0) {
      setNameIsValid(false);
    } else {
      setNameIsValid(true);
    }
    setName(name);
  };

  const amountChangeHandler = (amount) => {
    if (isNaN(amount)) {
      setAmountIsValid(false);
    } else {
      setAmountIsValid(true);
    }

    setAmount(amount);
  };

  const onsubmit = () => {
    if (!nameIsValid || !amountIsValid) {
      Alert.alert("Plese entry a title or amount.");
      return;
    }
    const newTransaction = {
      id: uuid.v4(),
      name,
      amount: +amount,
    };
    addTransaction(newTransaction);
    props.cancel();
    setName(""), setAmount("");
    setNameIsValid(false);
    setAmountIsValid(false);
  };

  return (
    <Modal visible={props.visible} animationType="fade">
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
        <View style={styles.title}>
          <Text style={styles.titleStyle}>ADD NEW EXPENSE</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.incomeContainer}>
            <Text style={styles.aboutTitle}>About Transaction</Text>
            <TextInput
              placeholder="About"
              style={styles.input}
              onChangeText={nameChangeHandler}
              value={name}
            />
            <Text style={styles.amountTitle}>Amount</Text>
            <Text style={styles.amountTitleAddOn}>
              "+" for Income, "-" for Expense
            </Text>
            <TextInput
              placeholder="Amount"
              style={styles.amountContainer}
              onChangeText={amountChangeHandler}
              value={String(amount)}
              keyboardType="default"
            />
            <View style={styles.btnContainer}>
              <Button title="ADD" onPress={onsubmit} style={styles.sumbitBtn} />
              <Button
                title="CANCEL"
                color="red"
                onPress={props.cancel}
                style={styles.cancleBtn}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container:{marginTop:0},
  title: {
    marginTop: 80,
    marginLeft: 100,
  },
  titleStyle: {
    color: "#b08fd5",
    fontSize: 20,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginLeft: 100,
  },
  incomeContainer: {
    marginTop: 20,
  },

  aboutTitle: {
    marginBottom: 10,
  },

  amountTitle: {
    marginTop: 15,
    marginBottom: 10,
  },
  amountTitleAddOn: {
    color: "#ee2b2b",
  },
  amountContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  btnContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  sumbitBtn: {},
  cancleBtn: {},
});

export default AddTransationModal;
