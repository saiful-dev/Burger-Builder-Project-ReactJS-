import React from 'react';

import Aux from '../../hoc/Aux'
import './Layout.css'

const layout=(props)=>(
    // add Aux bcz jsx don't support more than one parent element
    <Aux> 
        <div><p>Toolbar,sidebar,backdoor</p></div>
        <main className='Content'>
            {props.children}
        </main>
    </Aux>
    
);

 export default layout;