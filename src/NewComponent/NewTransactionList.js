import React, { useContext } from 'react';
//import { Transaction } from './Transaction';

import { GlobalCon } from '../context/GlobalState';

export const TransactionList = () => {
    const { transactions } = useContext(GlobalCon);
 
    return (
        <>
            <h3 style={{ color: 'white' }}>History</h3>
            <ul className="list">
                {transactions.map(x =>
                    <li className={x.amount < 0 ? 'minus' : 'plus'} key={x.id}>
                        {x.text}
                        <span>{x.amount < 0 ? '-' : '+'} ${Math.abs(x.amount)}</span>
                    </li>
                )}
            </ul>
        </>
    )
}
