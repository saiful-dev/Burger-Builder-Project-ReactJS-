
import React, {Component} from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
class checkout extends Component{
    //dummy ingredients
    state={
        ingredients:null,
        price:0,

    }
    componentWillMount(){
        const query=new URLSearchParams(this.props.location.search);
        const ingredients={};
        let price=0;
        for(let param of query.entries()){
            // ['salad','1']
            if(param[0] === 'price'){
                price=param[1]
            }else{
                ingredients[param[0]] = +param[1]; // convert number by adding plus

            }
        }
        this.setState({ingredients: ingredients,totalPrice:price})
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
                    checkoutContinue={this.checkoutContinueHandaler}/>
                    
                    <Route 
                        path={this.props.match.path +'/contact-data'} 
                        render={(props)=>(<ContactData ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        {...props}    
                        />)}/>
                    
            
            </div>

        );
    }

}

export default checkout;