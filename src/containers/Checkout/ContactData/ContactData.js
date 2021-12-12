import React,{Component} from 'react'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Axios from '../../../AxiosOrder';

import Input from '../../../components/UI/Input/Input';
import './ContactData.css';
import { is } from '@babel/types';


class ContactData extends Component{

state={
    OrderFrom:{
        
        name: {
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'Your Name',
            },
            value:'',
            validation:{
                required: true
            },
            valid: false,
            touched:false,
        },
        street: {
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'Street',
            },
            value:'',
            validation:{
                required: true
            },
            valid: false,
            touched:false,
            
        },
        zipcode: {
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'ZIPCODE',
            },
            value:'',
            validation:{
                required: true,
                minLength:5,
                maxLength:5,
            },
            valid: false,
            touched:false,
        },
        country: {
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'Country',
            },
            value:'',
            validation:{
                required: true
            },
            valid: false,
            touched:false,
        },
        email: {
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'E-mail',
            },
            value:'',
            validation:{
                required: true
            },
            valid: false,
            touched:false,
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig:{
                options:[
                    {value:'fastest', displayValue:'Fastest'},
                    {value:'cheapest', displayValue:'Cheapest'}
                ]
            },
            value:'fastest', //by default 
            //validation:{}, //handling validation error
            valid:true,

        },
    },
    formIsValid:false,
    loading:false,

}

OrderHandler=(event)=>{
    
    event.preventDefault();// prevent automatically reload page
    console.log(this.props.ingredients);


     this.setState({loading: true});
     const formData={}; //creation of empty object

     for(let formElementIdentifer in this.state.OrderFrom){
         formData[formElementIdentifer]= this.state.OrderFrom[formElementIdentifer].value;

     }

        //Axios added
        const order={
            ingredients: this.props.ingredients,
            price: this.props.price,
            orderData:formData,
            
        };
        Axios.post('/orders.json',order)// we need add json for firebase
            .then(response =>{
                this.setState({loading: false});
                this.props.history.push('/');

            })
                
            .catch(error => {
                this.setState({loading: false});
            });
}

checkValidity(value,rules){

    let isValid=true;
    if(!rules){ //for delivaryMethod error handle, bcz where we havn't validation rules
        return true;
    }
    if(rules.required){
        isValid=value.trim() !=='' && isValid; //trim removes empty space before and after
    }
    if(rules.minLength){
        isValid=value.length >=  rules.minLength && isValid;
    }
    if(rules.maxLength){
        isValid=value.length <=  rules.maxLength && isValid;
    }

    return isValid;

}


inputChangedHandler=(event,inputIdentifier)=>{// we update input field based on user input
    //console.log(event.target.value);
    const updatedOrderForm={ //just copy orderfrom object
        ...this.state.OrderFrom
    }

    const updatedFormElement={ //just copy value's holder object like,email,name
            ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value=event.target.value;
    //check validity
    updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
    updatedFormElement.touched=true;
    // just see the effect 
    console.log(updatedFormElement);
    updatedOrderForm[inputIdentifier]=updatedFormElement;
    // just for check overall form validation
    let formIsValid=true;
    for(let inputIdentifier in updatedOrderForm){
        formIsValid= updatedOrderForm[inputIdentifier].valid && formIsValid
    }
    
    
    this.setState({OrderFrom:updatedOrderForm, formIsValid: formIsValid});
}

render(){

    const formElementArray=[];
    for(let key in this.state.OrderFrom){
        formElementArray.push({
            id:key,
            config: this.state.OrderFrom[key],
        })
    }

    let form=(
        <form onSubmit={this.OrderHandler}>

            {
                formElementArray.map(formElement=>(
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                    />
                ))
            }

            {/*<Input elementType="..." elementConfig="..." value="..."/>
            <Input inputtype="input" type="email" name="eame" placeholder="Your Mail"/>
            <Input inputtype="input" type="text" name="street" placeholder="Your street"/>
            <Input inputtype="input" type="text" name="postal" placeholder="postal code"/>  */}
            <Button  btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
    );
    if(this.state.loading){
        form=<Spinner/>
    }
    return(

        <div className='ContactData'>
            <h4>Enter your Contact Data</h4>
            {form}
        
        </div>
    );
}
}

export default ContactData;