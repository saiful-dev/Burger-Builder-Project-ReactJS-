import React,{Component} from 'react';
import {Route,Switch} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
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

  //React renders HTML to the web page by using a function called render(). T
  render(){
    return (
      <div className="App">
          <Layout>
            {/*just for check unmount work or not
            
            {this.state.show?<BurgerBuilder/>:null} */} 
            {/* The <Switch /> component will only render the first route that matches/includes the path.*/}
            <Switch> 
                <Route path="/checkout" component={Checkout}/>
                <Route path="/Orders" component={Orders}/>
                <Route path="/" exact component={BurgerBuilder}/>
            </Switch>
            
            
          </Layout>
          
      </div>
    );
  }
}


export default App;
