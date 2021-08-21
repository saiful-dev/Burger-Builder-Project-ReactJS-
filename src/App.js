import React,{Component} from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
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
            <BurgerBuilder/>
          </Layout>
          
      </div>
    );
  }
}


export default App;
