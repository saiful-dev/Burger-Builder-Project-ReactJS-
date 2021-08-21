
import React,{Component} from 'react';
import './Modal.css'
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){ //return false to tell React the update can be skipped
        return nextProps.show !== this.props.show || nextProps.children !==this.props.children; 
        //|| nextProps.children !==this.props.children;  for spinner 
    }
    componentDidUpdate(){
        console.log('[Modal] Will update')
    }
    render(){
        return(
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                
                <div 
                    className='Modal'
                    style={{
                        transform: this.props.show? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show? '1':'0',
                    }}>

                    {this.props.children}
                </div> 
            </Aux>

        );
    }
}

    
        // props.children=>it is used to display whatever you include between the opening and closing tags when invoking a component.

export default Modal;

