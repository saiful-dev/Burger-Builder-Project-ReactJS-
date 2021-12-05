import React ,{Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Axios from '../../AxiosOrder';



const INGREDIENT_PRICE={
    salad: 20,
    cheese: 30,
    meat: 100,
    bacon: 40,
}


class Burgerbuilder extends Component{

    state={

        ingredient:null,
        // ingredient:{
        //     salad:0,
        //     bacon:0,
        //     cheese:0,
        //     meat:0

        // },
        totalPrice:70,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false,
    }
    // fetch data from firebase
    //componentWillMount will call before the child component are rendered
    componentDidMount(){ // componenetdidmount call after child component rendered 
        console.log(this.props);
        Axios.get('/ingredient.json')
                .then(response =>{
                    this.setState({ingredient: response.data})
                })
                .catch(error=>{
                    this.setState({error:true}); // if data can't fetch, we just find it
                })

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

    purchaseContinueHandler=()=>{
        //alert('You Continue');
        // this.setState({loading: true});
        // //Axios added
        // const order={
        //     ingredients: this.state.ingredient,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name: 'MAx',
        //         address:{

        //             street: " street 1",
        //             zipcode: '4343',
        //             country: 'Germany',

        //         },
        //         email: 'test@gmail.com',
        //     },

        //     deliveryMethod: 'fastest',
        // };
        // Axios.post('/orders.json',order)// we need add json for firebase
        //     .then(response =>{
        //         this.setState({loading: false, 
        //                         purchasing: false,
        //         });

        //     })
                
        //     .catch(error => {
        //         this.setState({loading: false,
        //             purchasing: false,
        //         });
        //     });

        const queryparams=[];
        for(let i in this.state.ingredient){
            queryparams.push(encodeURIComponent(i) + '=' +encodeURIComponent(this.state.ingredient[i]));
        }

        queryparams.push('price=' + this.state.totalPrice);
        const queryString=queryparams.join('&');
        this.props.history.push({
            pathname:'/checkout',
            search:'?'+queryString,
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

        //order Summary: 
        //here in ordersummary have also ingredients, so we should set condition for this ordersummary
        let orderSummary=null;
        
        
        // as we fetch data, at beggingin data(ingredient) is null and show error bcz fetching need time
        // that's why we set condition here for ingredient
        let burger=this.state.error?<p>Ingredients can't be loaded</p>:<Spinner/>
        if(this.state.ingredient){

            burger=(
                <Aux>
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

            orderSummary=<OrderSummary 
                        ingredients={this.state.ingredient}
                        price={this.state.totalPrice}
                        purchaseCancelled={this.purchaseCancelHandelar}
                        purchaseContinued={this.purchaseContinueHandler}
                        />
        }

        if(this.state.loading){
            orderSummary=<Spinner/>

        }
       


        return(
            <Aux>
                <Modal show={this.state.purchasing}
                modalClosed={this.purchaseCancelHandelar}>
                 
                {orderSummary}
                
                </Modal>

                {burger}

                
            </Aux>
            
        );
    }

}

export default withErrorHandler(Burgerbuilder,Axios);