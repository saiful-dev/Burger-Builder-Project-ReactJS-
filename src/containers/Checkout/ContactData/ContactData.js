import React,{Component} from 'react'

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Axios from '../../../AxiosOrder';
import './ContactData.css';


class ContactData extends Component{

state={
    name: '',
    email: '',
    address:{
        street: '',
        postalCode: ''
    },
    loading:false,

}

OrderHandler=(event)=>{
    
    event.preventDefault();// prevent automatically reload page
    console.log(this.props.ingredients);


     this.setState({loading: true});
        //Axios added
        const order={
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer:{
                name: 'MAx',
                address:{

                    street: " street 1",
                    zipcode: '4343',
                    country: 'Germany',

                },
                email: 'test@gmail.com',
            },

            deliveryMethod: 'fastest',
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

render(){
    let form=(
        <form>
            <input className="Input" type="text" name="name" placeholder="Your Name"/>
            <input className="Input" type="email" name="eame" placeholder="Your Mail"/>
            <input className="Input" type="text" name="street" placeholder="Your street"/>
            <input className="Input" type="text" name="postal" placeholder="postal code"/>
            <Button  btnType="Success" clicked={this.OrderHandler}>ORDER</Button>
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