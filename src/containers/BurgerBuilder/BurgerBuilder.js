import React ,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE={
    salad: 20,
    cheese: 30,
    meat: 100,
    bacon: 40,
}


class Burgerbuilder extends Component{

    state={
        ingredient:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0

        },
        totalPrice:70,
        purchasable: false,
        purchasing: false,
    }

    updatePurchaseState (ingredients){

        // we need state after addhandelar and removehandaler thats why we pass arguments
        
        // const ingredients={
        //     ...this.state.ingredients // just shallow copy
        // };
        const sum =Object.keys(ingredients)
                .map(igKey =>{
                    return ingredients[igKey];
                })
                .reduce((sum,el) =>{
                    return sum +el
                },0);
        this.setState({purchasable: sum>0})
    }

    addIngredientHandler =(type)=>{
        const oldCount=this.state.ingredient[type];
        const updatedCount =oldCount +1;
        const UpdatedIngredients ={
            ...this.state.ingredient
        };

        UpdatedIngredients[type]=updatedCount;
        const priceAddition =INGREDIENT_PRICE[type];
        const oldPrice=this.state.totalPrice;
        const newPrice =oldPrice+priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredient: UpdatedIngredients
        });

        this.updatePurchaseState (UpdatedIngredients); // to active order button after add element
    }

    removeIngredientsHandler =(type) =>{

        const oldCount=this.state.ingredient[type];

        if(oldCount <=0){
            return;
        }

        const updatedCount =oldCount-1;
        const UpdatedIngredients ={
            ...this.state.ingredient
        };

        UpdatedIngredients[type]=updatedCount;
        const priceDeduction =INGREDIENT_PRICE[type];
        const oldPrice=this.state.totalPrice;
        const newPrice =oldPrice-priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredient: UpdatedIngredients
        });

        this.updatePurchaseState (UpdatedIngredients);// to disabled order button after remove all element
            
    }

    purchasehandelar=()=>{
        this.setState({
            purchasing: true
        });

    }

    purchaseCancelHandelar=()=>{
        this.setState({purchasing: false});
    }


    render(){

        //disabled button like less when element is <=0
        const disabledInfo={
            ...this.state.ingredient
        };
        for(let key in disabledInfo){
            disabledInfo[key] =disabledInfo[key] <=0 // set true/false
        }
        //{ salad: true, meat: false,...}

        return(
            <Aux>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandelar}
                > 
                <OrderSummary ingredients={this.state.ingredient}/>
                
                </Modal>

                <Burger ingredients={this.state.ingredient}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    purchasAble={this.state.purchasable}
                    ordered={this.purchasehandelar}
                    Price={this.state.totalPrice}
                    />

                
            </Aux>
            
        );
    }

}

export default Burgerbuilder;