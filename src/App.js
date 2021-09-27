import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import './App.css';


class App extends Component{

  //state for unmount check
  // just for check unmount work or not
  // state={
  //   show:true
  // }
  // componentDidMount(){
  //   setTimeout(()=>{
  //     this.setState({show: false});
  //   },5000);
  // }
  render(){
    return (
      <div className="App">
          <Layout>
            {/*just for check unmount work or not
            
            {this.state.show?<BurgerBuilder/>:null} */} 
            <Switch>
                <Route path="/checkout" component={Checkout}/>
                <Route path="/" exact component={BurgerBuilder}/>
            </Switch>
            
            
          </Layout>
          
      </div>
    );
  }
}


export default App;
