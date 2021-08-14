import React ,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'


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
                <Burger ingredients={this.state.ingredient}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemove={this.removeIngredientsHandler}
                    disabled={disabledInfo}
                    Price={this.state.totalPrice}
                    />

                
            </Aux>
            
        );
    }

}

export default Burgerbuilder;