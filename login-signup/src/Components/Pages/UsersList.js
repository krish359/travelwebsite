import React,{useState} from 'react'
import { useEffect } from 'react'
import './UsersList.css'
import Axios from 'axios'
import AdminNavbar from './AdminNavbar'
import {NavLink } from "react-router-dom";
function UsersList(){
    const [data,setData]=useState([])
    const [user,setUser] = useState("")
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("");
    const [loginStatu,setloginstatu] = useState("")
    const [modal, setModal] = useState(false);
    const [section, setsection] = useState("hai");
    const [color,setcolor] = useState("")
    const [colorcheck,setcolorcheck] = useState("submittrue")
    const [coloradd,setcoloradd] = useState("submitfalse")
    const [coloredit,setcoloredit] = useState("submitfalse")
    const [editId,seteditId] = useState(-1)
    const [uusername,usetUsername] = useState("")
    const [uemail,usetEmail] = useState("")
    const [upassword,usetPassword] = useState("");
    const [eddelmode,seteddelmode] = useState(false);
    const [edit,setedit] = useState("false");
    const [currentPage,setCurrentPage]=useState(1);
    const recordsPerPage=5;
    const lastIndex=currentPage*recordsPerPage;
    const firstIndex=lastIndex-recordsPerPage;
    const records=data.slice(firstIndex,lastIndex);
    const npage=Math.ceil(data.length/recordsPerPage);
    const numbers=[...Array(npage+1).keys()].slice(1)
    function prePage(){
      if(currentPage!==1){
        setCurrentPage(currentPage-1);
      }
      }
      function changeCPage(id){
        setCurrentPage(id);
      }
      function nextPage(){
        if(currentPage!==npage){
          setCurrentPage(currentPage+1);
        }
      }
    const toggleModal = () => {
      setModal(!modal);
    };
    const checksectionhandler =()=>{
      setsection("hai");
      setedit("false");
      setcolorcheck("submittrue");
      setcoloradd("submitfalse");
      setcoloredit("submitfalse");
      seteddelmode(false);
    }
    const addsectionhandler =()=>{
      setsection("bai");
      setcolorcheck("submitfalse");
      setcoloradd("submittrue");
      setcoloredit("submitfalse");
      setedit("true");
      seteddelmode(false);
    }
    const editsectionhandler =()=>{
      setsection("bai");
      setcolorcheck("submitfalse");
      setcoloradd("submitfalse");
      setcoloredit("submittrue");
      setedit("false");
      seteddelmode(true);
    }
    const cancelhandler =()=>{
      seteditId(-1);
    }
    

    const edithandler=(id,name,mail,pass)=>{
      seteditId(id);
      usetUsername(name);
      usetEmail(mail);
      usetPassword(pass);
      fetch('http://localhost:3002/register_table')
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>console.log(err));
        

    }
    const updatehandler=(id)=>{
      Axios.put("http://localhost:3002/register_update", {
          userid: id,
          user: uusername,
          email: uemail,
          password: upassword,
        }).then((response) => {
          console.log(response);
          
        }).catch(err=>console.log(err));
        window.location.reload();
        seteditId(-1);
    }
    const Register=() => {
      
      Axios.post("http://localhost:3002/register", {
          user: username,
          email: email,
          password: password,
        }).then((response) => {
          console.log(response);
        }).catch(err=>console.log(err));
        
        
  };
    useEffect(()=>{
        fetch('http://localhost:3002/register_table')
        .then(res=>
          res.json()
          )
        .then(data=>setData(data))
        .catch(err=>console.log(err));
        
    },[])
    const checkhandler=() => {
        Axios.post("http://localhost:3002/regist", {
            
            email: user,
            
          }).then((response) => {
            if (response.data.message) {
              if(response.data.message!=="user not exist"){
                console.log(response.data.result);
                setloginstatu("User Available as userid  "+response.data.re[0].userid);
                setcolor("success");
              }
              else{
                setloginstatu(response.data.message);
                setcolor("fail");
              }
              } else {
                setloginstatu("UserName is ?",[response.data[0].user]);
                
              }
            console.log(response);
          }).catch(err=>console.log(err));
          
    };

    const deletehandler=(item) => {
        Axios.put("http://localhost:3002/regist_delete", {
            
            email: item,
            
          }).then((response) => {
            
            if (response.data.message) {
                setloginstatu(response.data.message);
                if(response.data.message!=="user not exist"){
                  toggleModal();
                  
                  
                }
              } else {
                setloginstatu("UserName is ?",[response.data[0].user]);
                
              }
            console.log(response);
            setTimeout(()=>{
              window.location.reload();
            },4000);
          }).catch(err=>console.log(err));
          
          
    };

    

    return (
        <div>
            <AdminNavbar></AdminNavbar>
            <div className='select'>
            <button className={colorcheck} onClick={checksectionhandler}>Check Section</button>
            <button className={coloradd} onClick={addsectionhandler}>Add Section</button>
            <button className={coloredit} onClick={editsectionhandler}>Edit Section</button>
            </div>
            <div>
            <h1 className="redirec">Want to go for Signup Page?<a href="/signuppage"><u>Click Here</u></a></h1>
            </div>
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
          {section==="hai"&&(
             
            <div>
            <div className='tex'>Library Users Details</div>
            <div className="input">
                    <input type="text" placeholder="Email" onChange={(event)=>{
                        setUser(event.target.value)
                    }}/>
                </div>
                <h1 className={color}>{loginStatu}</h1>
            <div className="sub">
                <button onClick={checkhandler} className="submit">Check Availability</button>
                
            </div>
            </div>)
           }
           {section==="bai"&&edit==="true"&&(
            <div>
              <form className="formdecide" action=" ">
                <input type="text" placeholder="Enter Name" className="formdetail" onChange={(event)=>{
                      setUsername(event.target.value)
                  }}/>
                <input type="text" placeholder="Enter Email" className="formdetail" onChange={(event)=>{
                      setEmail(event.target.value)
                  }}/>
                <input type="text" placeholder="Enter Password" className="formdetail" onChange={(event)=>{
                      setPassword(event.target.value)
                  }}/>
                <button className="submit" onClick={Register}>Add USER</button>
                
              </form>
            </div>
           )}
           
            
           
        <div style={{padding: "50px"}}>
          <table>
            <thead>
                <tr>
                <th>USERID</th>
                <th>USER</th>
                <th>EMAIL</th>
                <th>PASSWORD</th>
                {eddelmode &&(
                  <tr>
                <th>EDIT/UPDATE</th>
                <th>DELETE/CANCEL</th>
                </tr>)}
                </tr>
            </thead>
            <tbody>
                {records.map((d,i)=>(
                    d.userid === editId ?
                    <tr>
                      <td>{d.userid}</td>
                      
                      <td><input type="text" value={uusername} className="formdetai" onChange={(event)=>{
                      usetUsername(event.target.value)
                  }}/></td>
                      <td><input type="text" value={uemail} className="maildetai" onChange={(event)=>{
                      usetEmail(event.target.value)
                  }}/></td>
                      <td><input type="text" value={upassword} className="formdetai" onChange={(event)=>{
                      usetPassword(event.target.value)
                  }}/></td>
                  {eddelmode &&(
                    <tr>
                      <td><button className="submit" onClick={()=>updatehandler(d.userid)}>UPDATE</button></td>
                      <td><button className="submit" onClick={cancelhandler}>CANCEL</button></td>
                      </tr>)}
                    </tr>
                  
                    
                
                    :
                    <tr key={i}>
                        <td>{d.userid}</td>
                        <td>{d.user}</td>
                        <td>{d.email}</td>
                        <td>{d.original}</td>
                        {eddelmode&&(
                          <tr>
                        <td>
                          <button className="submit" onClick={()=>edithandler(d.userid,d.user,d.email,d.original)}>EDIT</button>
                        </td>
                        <td>
                          <button className="submit" onClick={()=>deletehandler(d.userid)}>DELETE</button>
                        </td>
                        </tr>)}
                    </tr>
                    
                ))}
            </tbody>
          </table>
          <nav >
            <ul style={{display:'flex',gap:'20px',fontSize:'25px'}}>
              <li style={{listStyleType:'none',border:'5px solid white', padding:'4px',backgroundColor:'white'}}>
                <NavLink to='#' style={{color:'blue'}} onClick={prePage}>Prev</NavLink>
              </li>
              {
                numbers.map((n,i)=>(
                  <li key={i} style={{listStyleType:'none',border:'5px solid white', padding:'4px',backgroundColor:'white'}}>
                    <NavLink to='#'style={{color:'blue'}} onClick={()=>changeCPage(n)}>{n}</NavLink>
                  </li>
                ))
              }
              <li style={{listStyleType:'none',border:'5px solid white', padding:'4px',backgroundColor:'white'}}>
                <NavLink to='#' style={{color:'blue'}} onClick={nextPage}>Next</NavLink>
              </li>
            </ul>
          </nav>
        </div>
       
        </div>
    </div>    
    )
}

export default UsersList