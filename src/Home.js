import React, {Component,useState,useEffect} from 'react';
import Todo from './Todo';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import fire from './firebase';
import firebase from 'firebase';//bcse we need to add timestamp
function App() {
  
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads we need to listen to the database and fetch new todos as they get added/removed

  useEffect(()=>{
    //this codes here fires when the app.js loads
   fire.firestore().collection('1').orderBy('timestamp','desc').onSnapshot(snapshot =>{

     setTodos(snapshot.docs.map(doc=>({id:doc.id, todo:doc.data().todo})));
     
   })
  },[])
  const addTodo = (e)=>{
    //this will fires when we click the button
    e.preventDefault();
    fire.firestore().collection('1').add({
      todo:input,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
  
    })
    
    setInput(" ");
  }

  const logout = ()=>{
    fire.auth().signOut();
  };
  const logoutBtnStyles = {
    marginTop:"20px",
    width:"120px",
    height:"40px",
    borderRadius:"5px"
};
const headerStyle = {
  height:"80px",
  backgroundColor:"pink"
};
const todostyle = {
  marginLeft:"400px"
};
const titlestyle = {
  color:"steelBlue"
};
const footerstyle = {
  display:"flex",
  flexDirection:"column",
  height:"auto",
  backgroundColor:"silver"
}

  return (
    <div className="App">
      <div style={headerStyle}>
      <button style={logoutBtnStyles} onClick={logout}>Logout</button>
      </div>
     <h1 style={titlestyle}>List of Todos on {Date()} </h1>
     <form>
     <FormControl>
       <InputLabel >: Enter your Todo Here</InputLabel>
       <Input value = {input} onChange = {e =>setInput(e.target.value)} />
     </FormControl>
     <Button disabled = {!input} type = "submit" onClick = {addTodo} variant="contained" color="primary">Add a Todo</Button>
     
     </form>

     <ul style={todostyle}>
       {todos.map(todo => (
         <Todo todo={todo}/>
         //<li>{todo}</li>
       ))}
     </ul>
     <div style={footerstyle}>
       <h2>Contact: +250784450008 </h2>
       <h2>Email: furebodidace582@gmail.com</h2>
     </div>
    </div>
  );
}

export default App;
