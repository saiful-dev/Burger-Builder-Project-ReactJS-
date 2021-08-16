import React from 'react';

import burgerLogo from '../../assets/Images/burger-logo.png';
import './Logo.css';
const logo=(props)=>(

    <div className='Logo'>
        <img src={burgerLogo} alt='Myburger'/>
    </div>
);

export default logo;