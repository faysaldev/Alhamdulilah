import React, { useEffect, useState } from 'react';
import {Avatar} from '@material-ui/core';
import db from '../firebase';
import { NavLink } from 'react-router-dom';
import firebase from 'firebase';

function Sidbarchat({id, name, addnewChat}) {

const [massage, setMassage] =useState("");

useEffect(()=>{
if(id){
    db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => (
        setMassage(snapshot.docs.map(doc => doc.data()))
    ))
}
}, []);
const createChat=()=>{
    var promtvalue=prompt("Enter a Group name?");
    if(promtvalue){
        db.collection('rooms').add({name: promtvalue});
    }
    
}

    return !addnewChat ? (
         <NavLink activeClassName="sidbar__active" to={`/room/${id}`}><div className="sidbarchat">
         <Avatar className="avatar__img" src={`https://avatars.dicebear.com/api/human/${id}.svg`}/>
         <div className="sidbarchat__info">
             <h2>{name}</h2>
             <p>{massage[0]?.message} ...</p>
         </div>
     </div>
     </NavLink>
    ):(
        <div onClick={createChat} className="sidbarchat">
        <h2>Create and start Chat</h2>
    </div>
    );
}

export default Sidbarchat;


// 