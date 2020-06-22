import React, { useContext, useEffect } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { GlobalContext } from "../context/GlobalState";
import { TouchableOpacity } from "react-native-gesture-handler";


const DetailList = () => {
  const { transactions } = useContext(GlobalContext);
  const { getTransaction } = useContext(GlobalContext);
  const {deleteTransaction} = useContext(GlobalContext);

  

  useEffect(() => {
    getTransaction();
  }, []);

  return (
    <>
      <View style={styles.listView}>
        <Text style={styles.title}>Details History</Text>
        <FlatList
          style={styles.flatList}
          keyExtractor={(item, index) => item.id}
          data={transactions}
          renderItem={(itemData) => (
            <TouchableOpacity style={styles.listItem}>
              <Text
                style={
                  itemData.item.amount < 0
                    ? styles.amountRed
                    : styles.amountGreen
                }
              >
                {itemData.item.name}
              </Text>
              <Text
                style={
                  itemData.item.amount < 0
                    ? styles.amountRed
                    : styles.amountGreen
                }
              >
                {itemData.item.amount < 0 ? "-" : "+"}$
                {Math.abs(itemData.item.amount)}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    color: "#8459cc",
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  listItem: {
    padding: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
    marginBottom: 20,
    backgroundColor: "#e8dae9",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flatList: {
    height: "60%",
    borderWidth: 1,
  },
  amountRed: {
    color: "red",
  },
  amountGreen: {
    color: "green",
  },
});

export default DetailList;
