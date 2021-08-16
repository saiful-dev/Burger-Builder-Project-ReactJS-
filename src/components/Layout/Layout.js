import React from 'react';

import Aux from '../../hoc/Aux'
import './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout=(props)=>(
    // add Aux bcz jsx don't support more than one parent element
    <Aux> 
        <Toolbar/>
        <main className='Content'>
            {props.children}
        </main>
    </Aux>
    
);

 export default layout;