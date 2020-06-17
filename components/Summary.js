import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalContext } from "../context/GlobalState";

const Summary = () => {
  const { transactions } = useContext(GlobalContext);
  const { getTransaction } = useContext(GlobalContext);

  useEffect(() => getTransaction(), []);

  const amounts = transactions.map((amounts) => amounts.amount);

  //get amounts that bigger than 0
  const income = amounts.filter((item) => item > 0);
  const totalIncome = income
    .reduce((init, curr) => (init += curr), 0)
    .toFixed(2);
  //get amount that less than 0
  const expense = amounts.filter((item) => item < 0);
  const totalExpense = Math.abs(
    expense.reduce((init, curr) => (init += curr), 0)
  ).toFixed(2);
  const balance = (totalIncome - totalExpense).toFixed(2);

  return (
    <>
      {/* {title View} */}
      <View style={styles.header}>
        <Text>Expense Tracker</Text>
      </View>
      {/* {balance view} */}
      <View style={styles.balance}>
        <Text style={styles.balanceText}>Balance: ${balance} </Text>
      </View>
      <View>
        <Text style={styles.balanceText}>Total Income: ${totalIncome}</Text>
      </View>
      {/* {Income total and Expense total  view} */}
      <View style={styles.expenseView}>
        {/* {Expense Total View} */}

        <Text style={styles.expenseText}>Total Expense ${totalExpense}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  balance: {},
  balanceText: {
    color: "green",
    marginBottom: 10,
  },
  expenseView: {
    flexDirection: "row",
    color: "red",
  },
  expenseText: { color: "red", marginBottom: 20 },
  incomeView: {
    marginRight: 40,
  },
});

export default Summary;
