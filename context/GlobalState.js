import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
import Firebase from "../config/Firebase";

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
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        axios
          .post(
            "https://money-db-839d1.firebaseio.com/user/" +
              user.uid +
              "/expense.json",
            {
              transaction,
            }
          )
          .then((res) => console.log("data wrote"))
          .catch((e) => console.log(e));
      }
    });

    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  function getTransaction() {
    let newTransaticon = [];
    Firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log();
        axios
          .get(
            "https://money-db-839d1.firebaseio.com/user/" +
              user.uid +
              "/expense.json"
          )
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
    });
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
