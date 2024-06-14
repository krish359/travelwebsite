import React,{useState} from 'react'
import { useEffect } from 'react'
import './UsersList.css'
import Axios from 'axios'
import AdminNavbar from './AdminNavbar'

function UsersList(){
    const [data,setData]=useState([])
    const [user,setUser] = useState("")
    const [loginStatu,setloginstatu] = useState("")
    const [modal, setModal] = useState(false);
    const [editId,seteditId] = useState(-1)
    const [utitle,usettitle] = useState("")
    const [uimage,usetimage] = useState("")
    const [udescription,usetdescription] = useState("")
    const [uquantity,usetquantity] = useState("")
    const [eddelmode,seteddelmode] = useState(false);
    const toggleModal = () => {
      setModal(!modal);
    };
    useEffect(()=>{
        fetch('http://localhost:3002/course_books')
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>console.log(err));
    },[])
    

    const deletehandler=( ) => {
        toggleModal();
        Axios.post("http://localhost:3002/deletebook", {
            
            email: user,
            
          }).then((response) => {
            if (response.data.message) {
                setloginstatu(response.data.message);
            //     if(response.data.message!=="Failed to Delete"){
                  
            //     }
            //   } else {
            //     setloginstatu("UserName is ?",[response.data[0].user]);
                
            //   }
            // console.log(response);
          }}).catch(err=>console.log(err));
          setTimeout(()=>{
            window.location.reload();
          },4000);
    };

    const cancelhandler =()=>{
      seteditId(-1);
    }
    

    const edithandler=(SNo,title,image,description,quantity)=>{
      seteditId(SNo);
      usettitle(title);
      usetimage(image);
      usetdescription(description);
      usetquantity(quantity);
      seteddelmode(true);
      fetch('http://localhost:3002/course_books')
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>console.log(err));
        

    }
    const updatehandler=(SNo)=>{
      Axios.put("http://localhost:3002/books_update", {
          SNo: SNo,
          title: utitle,
          image: uimage,
          description: udescription,
          quantity: uquantity,
        }).then((response) => {
          console.log(response);
          
        }).catch(err=>console.log(err));
        window.location.reload();
        seteditId(-1);
    }

    return (
        <div>
            <AdminNavbar></AdminNavbar>
            {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Deleted</h2>
            <p>
              Deleted Successfully
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
        <div className='happy'>
            <div className='tex'>Library Users Details</div>
            <div className="input">
                    <input type="text" placeholder="Book ID to be deleted" onChange={(event)=>{
                        setUser(event.target.value)
                    }}/>
                </div>
                <h1 className="statu">{loginStatu}</h1>
            <div className="submitcontainer">
                <button className="submit" onClick={deletehandler}>DELETE</button>
            </div>
            
        <div style={{padding: "50px"}}>
          <table>
            <thead>
                <tr>
                <th>BOOKID</th>
                <th>TITLE</th>
                <th>IMAGE_URL</th>
                <th>DESCRIPTION</th>
                <th>QUANTITY</th>
                <th>ACTION</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d,i)=>(
                    d.SNo === editId ?
                    <tr>
                      <td>{d.SNo}</td>
                      
                      <td><input type="text" value={utitle} className="formdetai" onChange={(event)=>{
                      usettitle(event.target.value)
                  }}/></td>
                  <td><input type="text" value={uimage} className="maildetai" onChange={(event)=>{
                      usetimage(event.target.value)
                  }}/></td>
                      <td><input type="text" value={udescription} className="maildetai" onChange={(event)=>{
                      usetdescription(event.target.value)
                  }}/></td>
                   <td><input type="text" value={uquantity} className="formdetai" onChange={(event)=>{
                      usetquantity(event.target.value)
                  }}/></td>
                     
                  {eddelmode &&(
                    <tr>
                      <td><button className="submit" onClick={()=>updatehandler(d.SNo)}>UPDATE</button></td>
                      <td><button className="submit" onClick={cancelhandler}>CANCEL</button></td>
                      </tr>)}
                    </tr>
                  
                    
                
                    :
                    <tr key={i}>
                        <td>{d.SNo}</td>
                        <td>{d.title}</td>
                        <td>{d.image}</td>
                        <td>{d.description}</td>
                        <td>{d.quantity}</td>
                        <td><button className='submit' onClick={()=>edithandler(d.SNo,d.title,d.image,d.description,d.quantity)}>EDIT</button></td>
                    </tr>
                    
                ))}
            </tbody>
          </table>
        </div>
        </div>
    </div>    
    )
}

export default UsersList