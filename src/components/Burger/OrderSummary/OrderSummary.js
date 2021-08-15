import React from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary =(props)=>{

    const ingredientSummary =Object.keys(props.ingredients)
                    .map(igkey =>{
                        return (
                            <li> 
                                <span style={{textTransform: 'capitalize',textAlign:'left'}}> {igkey}</span>: {props.ingredients[igkey]}
                            </li>);
                    });

    return( 
        <Aux>
            <h3>Your Order</h3>
            <p> A delicious burger with following ingredients</p>
            <ul>
                {
                    ingredientSummary
                }
            </ul>
            <p style={{'color':'black'}}><strong>Total Price: {props.price}</strong></p>
            <p>Continue to checkout?</p>
            <Button btnType={'Danger'} clicked={props.purchaseCancelled}>Cancel</Button>
            <Button btnType={'Success'} clicked={props.purchaseContinued}>Continue</Button>
        </Aux>
    );
};

export default orderSummary;