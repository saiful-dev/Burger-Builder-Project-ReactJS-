import React,{Component} from 'react';

import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component{
    // this could be functional component, doesn't add class
    componentDidUpdate(){
        console.log('[OrderSummary.js] Didupdate')
    }

    render(){

        const ingredientSummary =Object.keys(this.props.ingredients)
                    .map(igkey =>{
                        return (
                            <li> 
                                <span style={{textTransform: 'capitalize',textAlign:'left'}}> 
                                {igkey}</span>: {this.props.ingredients[igkey]}
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
                <p style={{'color':'black'}}><strong>Total Price: {this.props.price}</strong></p>
                <p>Continue to checkout?</p>
                <Button btnType={'Danger'} clicked={this.props.purchaseCancelled}>Cancel</Button>
                <Button btnType={'Success'} clicked={this.props.purchaseContinued}>Continue</Button>
            </Aux>

        );
    }
}


export default OrderSummary;