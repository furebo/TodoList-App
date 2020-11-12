import React, {Component} from 'react';
import './App.css';
import fire from './firebase';
import Login from './Login';
import Home from './Home';

class App extends Component {
  constructor(props)
  {
    super(props)
    this.state = {
      user:{}
    }
  };
  
  componentDidMount(){
    this.authListener();
  }

  authListener(){
    fire.auth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({user})
      }else{
        this.setState({user:null})
      }
    })
  }
  render(){
    return (
 <div>
   <h1>my todo app</h1>
 </div>
    );
  }

}

export default App;
