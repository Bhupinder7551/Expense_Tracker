// JavaScript source code
import React, { useContext } from 'react'

import { GlobalCon } from '../context/GlobalState';

export const Header = () => {
    const { logo } = useContext(GlobalCon);

    return (
        <h1 style={{ color:'white' }}>
            {logo}
        </h1>
    )
}
