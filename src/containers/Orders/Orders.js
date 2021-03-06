
import React,{Component} from "react";

import Order from '../../components/Order/Order';
import Axios from '../../AxiosOrder';
import withErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
class Orders extends Component{

    state={

        orders:[],
        loading: true,
    }
    componentDidMount(){
        Axios.get('/orders.json')
             .then(response =>{
                //console.log(response.data);
                const fetchedOrders=[];
                for(let key in response.data){
                    fetchedOrders.push({
                        ...response.data[key],
                        id:key,
                    })
                }
                this.setState({loading:false,orders:fetchedOrders});
             })
             .catch(err=>{
                 this.setState({loading:false});
             })
    }
    render(){

        return(
            <div>
                {this.state.orders.map(order=>(
                    <Order key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                    
                    />
                

                ))
                }
                
            </div>
        );
    }

}
 
export default withErrorHandler(Orders,Axios);