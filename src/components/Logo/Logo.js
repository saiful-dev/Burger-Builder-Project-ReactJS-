import React from 'react';

import burgerLogo from '../../assets/Images/burger-logo.png';
import './Logo.css';
const logo=(props)=>(

    <div className='Logo' style={{height:props.height}}> {/* style={{height:props.height}}*/}
        <img src={burgerLogo} alt='Myburger'/>
    </div>
);

export default logo;