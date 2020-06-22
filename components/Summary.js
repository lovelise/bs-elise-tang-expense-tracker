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
      <View style={styles.balance}>
        <Text style={styles.balanceText}>Total Balance: ${balance} </Text>
      </View>
      <View style={styles.income}>
        <Text style={styles.incomeText}>Total Income: ${totalIncome}</Text>
      </View>
      <View style={styles.expense}>
        <Text style={styles.expenseText}>Total Expense: ${totalExpense}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  balance: {
    marginTop: -30,
  },
  balanceText: {
    color: "green",
    marginBottom: 10,
    fontSize: 20,
    // fontFamily:'Bangers_400Regular'
  },
  income: {
    marginTop: 10,
    marginBottom: 20,
  },
  incomeText: {
    fontSize: 16,
  },
  expense: {
    flexDirection: "row",
    color: "red",
  },
  expenseText: {
    color: "red",
    fontSize: 16,
    marginBottom: 10,
  },
});

export default Summary;
