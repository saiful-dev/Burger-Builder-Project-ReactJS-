import React,{Component} from 'react';

import Aux from '../../hoc/Aux'
import './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
    state={

        showSideDrawer: false
    }
    sideDrawerClosehandler=()=>{
        this.setState({
            showSideDrawer:false
        })
    }

    sideDrawerTogglehandler =()=>{
        this.setState((prevState)=>{
            return {showSideDrawer: !prevState.showSideDrawer};
        });

    }
    render(){
        return(
            <Aux>  {/* add Aux bcz jsx don't support more than one parent element  */}
                <Toolbar 
                drowerToggleClicked={this.sideDrawerTogglehandler}
                
                />

                <SideDrawer 
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosehandler}/>
                <main className='Content'>
                    {this.props.children}
                 </main>
            </Aux>

        );
    }
}

 export default Layout;