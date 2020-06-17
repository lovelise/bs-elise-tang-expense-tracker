import React, { useContext,useEffect } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import { GlobalContext } from "../context/GlobalState";

const DetailList = () => {
  const { transactions } = useContext(GlobalContext);
  const { getTransaction } = useContext(GlobalContext);

  useEffect(() =>{getTransaction()},[]);
 

  return (
    <>
      <View style={styles.listView}>
        <Text>Details History</Text>
        <FlatList
          style={styles.flatList}
          keyExtractor={(item, index) => item.id}
          data={transactions}
          renderItem={(itemData) => (
            <View style={styles.listItem}>
              <Text>
                {itemData.item.name}
                <Text>
                  {itemData.item.amount < 0 ? "-" : "+"}$
                  {Math.abs(itemData.item.amount)}
                </Text>
              </Text>
            </View>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    backgroundColor: "#ccc",
    borderColor: "black",
    borderWidth: 1,
  },
  flatList: {
    height: "60%",
    borderWidth: 1,
  },
});

export default DetailList;
