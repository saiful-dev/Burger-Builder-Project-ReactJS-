
import React from 'react';
import './Modal.css'

const modal =(props) =>(
    <div 
        className='Modal'
        style={{
            transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
            opacity: props.show? '1':'0',
        }}>

        {props.children}
    </div>
        // props.children=>it is used to display whatever you include between the opening and closing tags when invoking a component.
);
export default modal;

