
import React from 'react';
import './Modal.css'
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

const modal =(props) =>(
    <Aux>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        
        <div 
            className='Modal'
            style={{
                transform: props.show? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show? '1':'0',
            }}>

            {props.children}
        </div> 
    </Aux>
        // props.children=>it is used to display whatever you include between the opening and closing tags when invoking a component.
);
export default modal;

