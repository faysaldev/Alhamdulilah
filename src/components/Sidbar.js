import React, { useEffect, useState } from 'react';
import {Avatar, IconButton} from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import './sidbar.css';
import Sidbarchat from './Sidbarchat';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import MenuIcon from '@material-ui/icons/Menu';





function Sidbar() {

const [rooms,setRooms] =useState([]);
const [{ user },dispatch] = useStateValue([]);

useEffect(()=>{
db.collection('rooms').onSnapshot(snapshot=>(
  setRooms(snapshot.docs.map(doc =>
    ({
      id:doc.id,
      data:doc.data()
    })
    ))
));
}, []);

const menushow=()=>{
if(document.querySelector(".sidbar").classList.contains('show')){
  document.querySelector(".sidbar").classList.remove('show');

}else{

  document.querySelector(".sidbar").classList.add('show');

}
}

    return (
            <div className="sidbar">
           <div className="sidbar__header">
               <Avatar src={user?.photoURL} /> {/* this question mark for undefiend user */}
            <div className="header__right">
                
               <IconButton >
               <DonutLargeIcon className="sidbar__icon" />
               </IconButton>

               <IconButton>
               <ChatIcon className="sidbar__icon" />
               </IconButton>

              <IconButton>
              <MoreVertIcon className="sidbar__icon" />
              </IconButton>
            </div>
           </div>

           <div className="sidbar__search">
                <div className="search__container">
                  <SearchIcon style={{color:"gray",padding:"10px"}} />
                  <input type="text" placeholder="Group Search" />
                </div>
           </div>

           <div className="sidbar__chat">
           <Sidbarchat addnewChat />

            {rooms.map(room=>(
              <Sidbarchat key={room.id} id={room.id} name={room.data.name} />
            ))}

           </div>
        </div>
    )
}

export default Sidbar;
