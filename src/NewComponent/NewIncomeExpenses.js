import React, { useContext } from 'react';
import { GlobalCon } from '../context/GlobalState';

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalCon);

  const amounts = transactions.map(transaction => transaction.amount);

  const income = amounts
    .filter(x => x > 0)
    .reduce((a, i) => (a += i), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(x => x < 0).reduce((a, i) => (a += i), 0) *
    -1
  ).toFixed(2);

  return (
    <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
  <p className="money plus">{income}</p>
        </div>
        <div>
          <h4>Expense</h4>
  <p className="money minus">{expense}</p>
        </div>
      </div>
  )
}
