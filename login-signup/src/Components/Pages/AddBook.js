import React from 'react'

import { useState } from 'react'
import Axios from 'axios'
import '../LoginSignup/Modal.css'
import './AddBook.css'
import AdminNavbar from './AdminNavbar'
function AddBook(){
    const [title,setTitle] = useState("")
    const [image,setImage] = useState("")
    const [description,setDescription] = useState("");
    const [loginStatus, setLoginStatus] = useState(" ");
    const [modal, setModal] = useState(false);
    Axios.defaults.withCredentials = true;
  const toggleModal = () => {
    setModal(!modal);
  };

  const bookhandler=() => {
    toggleModal();
    Axios.post("http://localhost:3002/cour", {
        
        title: title,
        image: image,
        description: description,
        
      }).then((response) => {
        if (response.data.message) {
            setLoginStatus(response.data.message);
            
          } else {
            setLoginStatus("UserName is ?",[response.data[0].user]);
            
          }
        console.log(response);
        
      }).catch(err=>console.log(err));
      
};
    return(
        <div>
            <AdminNavbar></AdminNavbar>
        <div className='co'>
        {modal && (
      <div className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <h2>Book Added</h2>
          <p>
            Book Added Successfylly
          </p>
          <button className="close-modal" onClick={toggleModal}>
            X
          </button>
        </div>
      </div>
    )}
          <div className="header">
              <div className="text">Add Book Details</div>
              <div className="underline"></div>
          </div>
          <div className="inputs">
              <div className="details">Enter Title of the book</div>
              <div className="input">
                  <input type="text" placeholder="title" onChange={(event)=>{
                      setTitle(event.target.value)
                  }}/>
              </div>
              <div className="details">Enter URL of the book image</div>
              <div className="input">
                  <input type="text" placeholder="imageUrl" onChange={(event)=>{
                      setImage(event.target.value)
                  }}/>
              </div>
              <div className="details">Enter Book Description</div>
              <div className="input"> 
                  <input type="text" placeholder="Book Description" onChange={(event)=>{
                      setDescription(event.target.value)
                  }}/>
              </div>
          </div>
          
          <div className="submitcontainer">
              <div className="submit" onClick={bookhandler} > Add Book</div>
          </div>
          <div>
          <h1 className="status">{loginStatus}</h1>
          </div>
      </div>
      </div>
    )
}

export default AddBook