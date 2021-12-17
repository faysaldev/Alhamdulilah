import { Avatar,IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './chat.css';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router';
import db from '../firebase';
import { useStateValue } from '../StateProvider';
import firebase from 'firebase';

function Chat() {

const [avatar,setavater] = useState('');
const [searchVal,setSearchVal] = useState('');

const {roomId} =useParams();

const [roomName, setRoomName] =useState("");

const [massages ,setMassages] = useState([]);

const [{ user }, dispatch] = useStateValue();


useEffect(()=>{

    if(roomId){

        db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
            setRoomName(snapshot.data().name)
        ));

        db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
            setMassages(snapshot.docs.map(doc => doc.data()))
        ));

    }

}, [roomId]);


const sendMassage=(e)=>{
    e.preventDefault();
    console.log("You type >>>",searchVal);

    db.collection('rooms').doc(roomId).collection('messages').add({
        message:searchVal,
        name: user.displayName,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()


    })

    setSearchVal('');
}
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${roomId}.svg`}/>
                <div className="chatheader__info">
                    <h3>{roomName}</h3>
                    <p>Last Seen {new Date(massages[massages.length - 1]?.timestamp?.toDate()).toUTCString()}</p>
                </div>
                
                <div className="chatheader__right">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>

                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {massages.map(massage =>(
                    <p className={`chat__massage ${ massage.name === user.displayName && 'chat__reciver'}`}>
                    <span className="chat__name">{massage.name}</span>
                   {massage.message}
                    <span className="chat__time">
                        {new Date(massage.timestamp?.toDate()).toUTCString()}
                    </span>
                  </p>
                ))}
            
        
       
            </div>

            <div className="chat__fotter">
                <InsertEmoticonIcon className="fotter_icon" />
                <form>
                    <input value={searchVal} onChange={(e)=> setSearchVal(e.target.value)} type="text" placeholder="Type a massage" />
                    <button style={{display:"none"}} onClick={sendMassage}  type="submit">Send</button>
                </form>
                <MicIcon className="fotter_icon" />
            </div>
        </div>
    )
}

export default Chat;

// {`https://avatars.dicebear.com/api/human/${avatar}.svg`}
// useEffect(()=>{
// setavater(Math.floor(Math.random()))
// },[]);
{/* <p className={`chat__massage ${true && 'chat__reciver'}`}>
                 <span className="chat__name">{message.name}</span>
                 {message.message}
                 <span className="chat__time">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
               </p> */}


//   db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot =>
//     setMessages(snapshot.docs.map(doc => doc.data())))
// }