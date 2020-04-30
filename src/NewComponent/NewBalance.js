// JavaScript source code
import React, { useContext } from 'react';
import { GlobalCon } from '../context/GlobalState';

export const Balance = () => {
    const { transactions } = useContext(GlobalCon);

    const amounts = transactions.map(x => x.amount);

    const total = amounts.reduce((a, i) => (a += i), 0).toFixed(2);
    return (
        <div style={{
            backgroundColor: '#fff',
            boxShadow: 'var(--box-shadow)',
            padding: '20px'
        }}>
            <h2 >Your Balance</h2>
            <h1>${total}</h1>
        </div>
    )
}
