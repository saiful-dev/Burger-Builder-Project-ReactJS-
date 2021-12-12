import React,{Component} from 'react'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Axios from '../../../AxiosOrder';

import Input from '../../../components/UI/Input/Input';
import './ContactData.css';


class ContactData extends Component{

state={
    OrderFrom:{
        
        name: {
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'Your Name',
            },
            value:''
        },
        street: {
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'Street',
            },
            value:''
        },
        zipcode: {
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'ZIPCODE',
            },
            value:''
        },
        country: {
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'Country',
            },
            value:''
        },
        email: {
            elementType: 'input',
            elementConfig:{
                type:'text',
                placeholder:'E-mail',
            },
            value:''
        },
        deliveryMethod: {
            elementType: 'select',
            elementConfig:{
                options:[
                    {value:'fastest', displayValue:'Fastest'},
                    {value:'cheapest', displayValue:'Cheapest'}
                ]
            },
            value:''
        },
    },
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
inputChangedHandler=(event,inputIdentifier)=>{// we update input field based on user input
    //console.log(event.target.value);
    const updatedOrderForm={ //just copy orderfrom object
        ...this.state.OrderFrom
    }

    const updatedFormElement={ //just copy value's holder object like,email,name
            ...updatedOrderForm[inputIdentifier]
    }
    updatedFormElement.value=event.target.value;
    updatedOrderForm[inputIdentifier]=updatedFormElement;
    this.setState({OrderFrom:updatedOrderForm});
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
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                    />
                ))
            }

            {/*<Input elementType="..." elementConfig="..." value="..."/>
            <Input inputtype="input" type="email" name="eame" placeholder="Your Mail"/>
            <Input inputtype="input" type="text" name="street" placeholder="Your street"/>
            <Input inputtype="input" type="text" name="postal" placeholder="postal code"/>  */}
            <Button  btnType="Success">ORDER</Button>
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