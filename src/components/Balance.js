import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map(transaction => transaction.amount);
    console.log("the value of amount is ", amounts)

    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    console.log("the total amount is ", total)
  return (
    <>
      <h4>Your Balance</h4>
    <h1>${total}</h1>
    </>
  )
}
