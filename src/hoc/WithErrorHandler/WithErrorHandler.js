import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux';

const withErrorHandler=(WrappedComponent,axios)=>{

    return class extends Component{ 
        //annonymous class bcz we return that's why we no need name

        state={
            error: null,
        }
        componentWillMount(){ ////componentWillMount will call before the child component are rendered
            this.reqInterceptor=axios.interceptors.request.use(request =>{
                this.setState({error: null});
                return request;
            })
            this.resInterceptor=axios.interceptors.response.use(res=>res,error=>{
                this.setState({error: error});
            })
        }
        // we need to remove interceptors after componentwillmount bcz it leads memory leak
        componentWillUnmount(){
            //console.log("will Unmount", this.reqInterceptor,this.resInterceptor); // just for show it work or not
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);


        }

        errorConfimedHandler=()=>{
            this.setState({error: null});
        }

        render(){
            return (

                <Aux>
                    <Modal show={this.state.error}
                            modalClosed={this.errorConfimedHandler}>
                            {this.state.error ? this.state.error.message :null} {/* message object */}
                    </Modal>
                    <WrappedComponent {...this.props} />
                
                
                
                </Aux>
            );

        }

    }
    
}

export default withErrorHandler;