import React, { useEffect, useState } from "react";
import axios from "axios";
import '../styles/LeftHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faPlus, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

function LeftHeader() {
  const [chats, setChat] = useState([]);


  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/Chat/?format=json").then(res => 
      setChat(res.data)
    )
  }, []);
  
  
  return (
    <div className="LeftHeader">
    <FontAwesomeIcon icon={faBars} className="bars" onClick={() => {
        const elem = document.getElementsByClassName("Chats")[0];
        if (elem.style.display === "") {
          elem.style.display = "none";
        } else {
          elem.style.display = "";
        }
      }}/>
    <div className="Chats" >
      <FontAwesomeIcon icon={faPlus} className="plus" onClick={() => {
              axios.post("http://127.0.0.1:8000/api/Chat/", {"title": "New chat"})
                .then(response => {
                  axios.get("http://127.0.0.1:8000/api/Chat/")
                    .then(res => setChat(res.data))
                    .catch(error => console.error("Error fetching chats:", error))
                })
                .catch(error => {
                  console.error("Error creating chat:", error)
                  // Handle the error (e.g., show an error message to the user)
                })
      }}/>
      {chats.map(chat =>
              <div key={chat.id} className="Chats-inside" onClick={() => window.location.href = `http://localhost:5173/${chat.id}`}>
              <h3 key={chat.id}>{chat.title}</h3>
              <FontAwesomeIcon icon={faEllipsisVertical} className="chat-more"/>
              <input type="text" className="change-chat-name" style={{"display": "none"}} />
              </div>
            )
          }
      </div>
    </div>
  );
}

export default LeftHeader;
