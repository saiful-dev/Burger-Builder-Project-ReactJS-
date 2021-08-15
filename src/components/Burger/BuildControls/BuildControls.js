import React from 'react';
import './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';
const controls =[

    {label:'Salad', type:'salad'},
    {label:'Bacon', type:'bacon'},
    {label:'Cheese', type:'cheese'},
    {label:'Meat', type:'meat'}

];
const buildControls=(props)=>(

    <div className='BuildControls'>
        <p ><strong>Current Prince: {props.Price}</strong></p>

        {controls.map(ctrl =>(
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label} 
                added={()=>props.ingredientAdded(ctrl.type)}
                removed={() =>props.ingredientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]} 
                                //props.disabled means {salad: true, meat: false,...}
                                // we just use ctrl.type for access disabledInfo
                
                                />
        ))}
        <button 
            className='OrderButton' 
            disabled={!props.purchasAble}
            onClick={props.ordered}
            >ORDER NOW</button>

    </div>
);
export default buildControls; 