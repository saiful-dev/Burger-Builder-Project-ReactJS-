import React from "react";


import './Order.css';

const Order=(props)=>{
    const ingredients=[];

    for(let ingredientName in props.ingredients){
        ingredients.push(
            {
                name:ingredientName,
                amount: props.ingredients[ingredientName],
            }
        );
    }

    const ingredientOutput = ingredients.map(ingre=>{
        return <span 
            style={{
                textTransform: 'capitalize',
                display:'inline-block',
                margin:'0 8px',
                border:'2px dotted #ccc',
                padding:'5px',
            
            }}
            key={ingre.name}>{ingre.name} -- {ingre.amount}</span> 
    });

    console.log(ingredientOutput);

    return(
    <div className='Order'>
        <p>Ingredients: {ingredientOutput}</p>
        <p> Price: <strong>{props.price} TK</strong></p>
    
    </div> 
    );
};

export default Order;