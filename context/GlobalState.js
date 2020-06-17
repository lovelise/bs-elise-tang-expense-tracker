import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";

//initial state
const initialState = {
  transactions: [],
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    axios
      .post("https://money-db-839d1.firebaseio.com/expense.json", {
        transaction,
      })
      .then((res) => console.log("data wrote"))
      .catch((e) => console.log(e));
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  function getTransaction() {
    let newTransaticon = [];
    axios
      .get("https://money-db-839d1.firebaseio.com/expense.json")
      .then((response) => {
        for (let key in response.data) {
          newTransaticon.push(response.data[key].transaction);
        }

        dispatch({
          type: "GET_TRANSACTION",
          payload: newTransaticon,
        });
      })
      .catch((e) => console.log("request cannot be completed: ", e));
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
        getTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
