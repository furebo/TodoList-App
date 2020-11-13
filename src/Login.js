import { findByLabelText } from '@testing-library/react';
import React, {Component} from 'react';
import fire from './firebase';
class Login extends Component {
    constructor(props)
    {
        super(props)
        this.login=this.login.bind(this);
        this.handleChange=this.handleChange.bind(this);
        this.signup = this.signup.bind(this)
        this.state = {
            email:'',
            password:''
        }
    }

    login(e){
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((u)=>{
            console.log(u)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    signup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((u)=>{
           console.log(u)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    
    render(){

        const mystyle = {
            marginTop:"100px",
            marginLeft:"450px",
            display:"flex",
            flexDirection:"column",
            width:"500px",
            height:"400px",
            color: "white",
            backgroundColor: "DodgerBlue",
            padding: "10px",
            fontFamily: "Arial",
            borderRadius:"10px",
            boxShadow:"0 0 40px 0 #000"
          };

        const inputStyles = {
            height:"40px",
            marginTop:"40px",
            borderRadius:"1px"
        };

        const inputTwoStyles = {
            height:"40px",
            marginTop:"20px",
            marginBottom:"50px",
            borderRadius:"1px"
        };

        const logStyles = {
            width:"200px",
            height:"40px",
            marginTop:"20px",
            marginLeft:"150px",
            borderRadius:"2px",

        };
        const titleStyle = {
            marginLeft:"280px",
            color:"steelblue"
        };
        const footerstyle = {
            marginTop:"100px",
            display:"flex",
            flexDirection:"column",
            height:"auto",
            backgroundColor:"silver",
            paddingLeft:"550px"
          }

        return(
               <div>
                <h1 style = {titleStyle} >Please Enter Your Email and Password to login to the Todo App </h1>
                <form style={mystyle}>
                    <input 
                    style={inputStyles}
                    type='email'
                     name='email' 
                     id='email'
                     placeholder='Enter your Email'
                     onChange={this.handleChange} 
                     value={this.state.email}
                      />
                    <input
                     style={inputTwoStyles} 
                     type ='password'
                     name='password' 
                     id='password' 
                     placeholder='Enter your Password'
                     onChange = {this.handleChange} 
                     value= {this.state.password}
                     />
                    <button style = {logStyles} onClick = {this.login}>Login</button>
                    <button style = {logStyles} onClick = {this.signup}>Signup</button>
                </form>
                <div style={footerstyle}>
                   <h2>Contact: +250784450008 </h2>
                   <h2>Email: furebodidace582@gmail.com</h2>
                 </div>
           </div>
        )
  }
}

export default Login