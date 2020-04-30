import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    logo: 'Self Expense Tracker',
    transactions: [
      

    ]
}

// Create context
export const GlobalCon = createContext(initialState);

// Provider component
export const GlobalPro = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions
    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        });
    }


    return (<GlobalCon.Provider value={{
        transactions: state.transactions,
        logo: state.logo,
        addTransaction


    }}>
        {children}
    </GlobalCon.Provider>);
}