import React from 'react';
//import { Header } from './components/Header';
//import { Balance } from './components/Balance';
//import { IncomeExpenses } from './components/IncomeExpenses';
//import { TransactionList } from './components/TransactionList';
//import { AddTransaction } from './components/AddTransaction';
import { Header } from './NewComponent/NewHeader'
import { Balance } from './NewComponent/NewBalance'
import { IncomeExpenses } from './NewComponent/NewIncomeExpenses'
import { TransactionList } from './NewComponent/NewTransactionList'
import { AddTransaction } from './NewComponent/AddNewTransaction';

import { GlobalPro } from './context/GlobalState';

import './App.css';

function App() {
    return (
      
            <GlobalPro >
                <Header />
                <div className="container">
                    <Balance />
                    <IncomeExpenses />
                    <TransactionList />
                    <AddTransaction />


                </div>
            </GlobalPro>
 
    );
}

export default App;
