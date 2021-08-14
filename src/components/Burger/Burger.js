import React from 'react';
import './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger =(props)  =>{

    //
    let transfromIngredients=Object.keys(props.ingredients)
             .map(igKey =>{
                    return [...Array(props.ingredients[igKey])] //[Array(1), Array(1), Array(2), Array(2)]
                        .map((_,i)=>{
                           return <BurgerIngredients key={igKey +i} type={igKey} />
                        });

             }).reduce((ac,curVal)=>{ 
                 return ac.concat(curVal)

             },[ ]);

    console.log(transfromIngredients);
    if(transfromIngredients.length ===0){
        transfromIngredients=<p>Please start adding ingredients</p>
    }
    return(
        <div className='Burger'>
            <BurgerIngredients type='bread-top'/>
            {transfromIngredients}
            <BurgerIngredients type='bread-bottom'/>
  
        </div>
    );
};

export default burger;