
import React, {Component} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class checkout extends Component{
    //dummy ingredients
    state={
        ingredients:{
            salad:1,
            meat:1,
            cheese:1,
            bacon:1

        }

    }
    componentDidMount(){
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        for(let param of query.entries()){
            // ['salad','1']
            ingredients[param[0]] = +param[1]; // convert number by adding plus
        }
        this.setState({ingredients: ingredients})
    }

    checkoutCancelHandaler=()=>{
        this.props.history.goBack();

    }
    checkoutContinueHandaler=()=>{
        this.props.history.replace('checkout/contact-data')
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancel={this.checkoutCancelHandaler}
                    checkoutContinue={this.checkoutContinueHandaler}
                    />
            
            </div>

        );
    }

}

export default checkout;