import React, {useState} from 'react';
import './Todo.css';
import { List, ListItem, ListItemText,Modal } from '@material-ui/core';
import fire from './firebase';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    paper: {
        width:600,
        height:250,
        padding:40,
        backgroundColor: theme.palette.background.paper,
        border:'2px solid #000',
        boxShadow: theme.shadows[4],
        padding: theme.spacing(2,4,3)
    },
}))

function Todo(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const handleOpen = () => {
        setOpen(true);
    };
    
    const updateTodo = () => {
        //update todo with the new input text
        fire.firestore().collection('1').doc(props.todo.id).set({
          todo: input
        },{merge:true})
        setOpen(false);

    }

    return (
        <>
        <Modal open = {open}  onClose = {e => setOpen(false)}>
            <div className = {classes.paper}>
                <h1>Enter new Todo here</h1>
                <input placeholder = {props.todo.todo} value = {input} onChange = {e => setInput(e.target.value)}/>
                <button onClick = {updateTodo}>Udate a Todo </button>
            </div>
        </Modal>
        <List className = "todo_list">
            <ListItem>
             <ListItemText primary = "Todo" secondary = {props.todo.todo}/>
             </ListItem>
             <button onClick = {e => setOpen(true)}>Edit</button>
             <button onClick = {event => fire.firestore().collection('1').doc(props.todo.id).delete()}> X DELETE</button>
        </List>
        </>
    )
    
}

export default Todo
