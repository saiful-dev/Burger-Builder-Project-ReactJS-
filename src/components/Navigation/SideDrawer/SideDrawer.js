import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';
const sideDrawer=(props) =>{
    
    let attachedclass=['SideDrawer','Close'];
    if(props.open){
        attachedclass=['SideDrawer','Open'];

    }

    return(
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedclass.join(' ')}>
                <div className='SLogo'>
                    <Logo/>
                </div>
                
                <nav>
                    <NavigationItems/>
                </nav>
            
            </div>
        </Aux>

    );
};

export default sideDrawer;