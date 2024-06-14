
import React from 'react'
import {useState,useEffect,useRef} from 'react'
import { useLocation } from "react-router-dom";
import userpic from '../Assets/search.png'
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar';
import Axios from 'axios'
import './Cart.css'
import Headline from '../Headline/Headline';
import { useNavigate } from 'react-router-dom'

function Cart(){
    const ref = useRef(null);
    const [data,setData]=useState([])
    const [date,setDate]=useState(" ")
    const [searchterm,setsearchterm]=useState("")
    const [section,setsection]=useState(true)
    const [color,setcolor]=useState("submitborrowfalse")
    const [cartcolor,setcartcolor]=useState("submitborrowtrue")
    const [status,setstatus]=useState("")
    const [modal, setModal] = useState(false);
    const location=useLocation();
    console.log(location);
    let b=location.state.userid;
    let c=location.state.user;
    console.log(b)
    const toggleModal = () => {
      setModal(!modal);
    };
    useEffect(()=>{
        fetch('http://localhost:3002/user_course')
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>console.log(err));
        
    },[])
    const newItems = data.filter((val)=>val.userid === b)
    const borrowedItems = newItems.filter((val)=>val.Status==='Borrowed')
    const cartItems = newItems.filter((val)=>val.Status==='Carted')
    console.log(newItems)
    console.log(borrowedItems)
    console.log(cartItems)
    console.log(location.state.a)
    
    const scrollhandler=()=>{
    ref.current?.scrollIntoView({behaviour:'smooth'});
    
    }
    const borrowhandler=(item) => {
      if(date===" ")
      {
        toggleModal();
      }
      else{
        Axios.put("http://localhost:3002/usercourse_borrow", {
            
            SNo: item,
            userid: b,
            date: date,
            
          }).then((response) => {
            
            if (response.data.message) {
                
                if(response.data.message!=="Failed to Delete"){
                  setstatus("sucess");
                }
              } else {
                setstatus("fail");
                
              }
            console.log(response);
            setTimeout(()=>{
              window.location.reload();
            },3000);
          }).catch(err=>console.log(err));
        }
          
          
    };
    const delhandler=(item) => {
        Axios.put("http://localhost:3002/usercourse_delete", {
            
            SNo: item,
            userid: b,
            
          }).then((response) => {
            
            if (response.data.message) {
                
                if(response.data.message!=="Failed to Delete"){
                  setstatus("sucess");
                }
              } else {
                setstatus("fail");
                
              }
            console.log(response);
            
              window.location.reload();
           
          }).catch(err=>console.log(err));
          
          
    };
    const navigate = useNavigate();
    const returnhandler=(SNo,userid,title,image,description,Borrowed_Till) => {
      navigate("/feepay",{state:{SNo:SNo, userid: userid,user:c,title:title,image:image,description:description,Borrowed_Till: Borrowed_Till}})
      
        
  };
    const sectionhandler=()=>{
        setsection(true);
        setcolor('submitborrowtrue');
        setcartcolor('submitborrowfalse');
        setTimeout(()=>{
          scrollhandler()
        },200);
        
    }
    const carthandler=()=>{
      setsection(true);
      setcolor('submitborrowfalse');
      setcartcolor('submitborrowtrue');
    }
    return(
      <div >
        <DashboardNavbar></DashboardNavbar>
        {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2 style={{color:'red'}}>Note</h2>
            <p>
              Please enter Borrow Tiil Date
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
        <div>{status}</div>
        <div className="inputs">
                <div className="input">
                    <img src={userpic} alt="" />
                    <input id='searchInput' type='text' placeholder='Enter Cart/Borrowed Book' onChange={(event)=>{
                        setsearchterm(event.target.value)
                    }}/>
                </div>
                
                
        </div>
         
         <div className="selec">
            <button className={cartcolor} onClick={carthandler}>CART BOOKS</button>
            <button className={color} onClick={sectionhandler}>BORROWED BOOKS</button>
         </div>
         <div className='ove'>
           
             {
                cartItems.length===0?
                <div className="noitemscontainer">
                 <div className="noitems">
                   No Cart Books in your List</div>
                 </div>
                :
               cartItems.filter((val)=>{
                   if(searchterm===" "){
                       return val;  
                   }else if(val.title.toLowerCase().includes(searchterm.toLowerCase())){
                       return val;
               
                   }
                   else{
                       return false;
                   }
                 })
                 .map((val)=>{
                   return(
                   <div>
                           <div key={val.SNo} className='card-container'>
                   <div className='image-contain'>
                       <img src={val.image} alt="" />
                   </div>
                   <div className='card-content'>
                   <div className='card-title'>
                       <h3>{val.title}</h3>
                   </div>
                   <div className='card-body'>
                       <p><b>Author: </b> {val.description}</p>
                       <div style={{display:'flex'}}>
                                <b style={{paddingTop:'0.5cm',marginRight:'20px'}}>Borrow Till:</b>
                                <input type='date' placeholder='Enter Borrow Date' onChange={(event)=>{
                         setDate(event.target.value)
                    }}/>
                            </div>
                   </div>
                   </div>
                   <div className='flex'>
                       
                       <button onClick={()=>borrowhandler(val.SNo)} className='zor'>
                           Borrow Book
                       </button>
                       <button onClick={()=>delhandler(val.SNo)} className='zor'>
                           Delete Book
                       </button>
                       
                   </div>
                   </div>
                   </div>    
                   )
                   
                 })
             }
         </div>
        
         <div style={{width:'auto',height:'1.8cm',marginTop:'2cm',paddingLeft:'48%',paddingTop:'1px',color:'white',backgroundColor:'blue',fontWeight:'bold'}}><Headline ref={ref} text="Borrowed Books"/></div>
         
         <div>
            {
            section &&(
         <div className='ove' style={{marginBottom:'3cm'}}>
           
           {
           borrowedItems.length===0?
           <div className="noitemscontainer">
            <div className="noitems">
              No Borrowed Books in your List</div>
            </div>
           :
             borrowedItems.filter((val)=>{
                 if(searchterm===" "){
                     return val;  
                 }else if(val.title.toLowerCase().includes(searchterm.toLowerCase())){
                     return val;
             
                 }
                 else{
                     return false;
                 }
               })
               .map((val)=>{
                 return(
                 <div>
                         <div key={val.SNo} className='card-container'>
                 <div className='image-contain'>
                     <img src={val.image} alt="" />
                 </div>
                 <div className='card-content'>
                 <div className='card-title'>
                     <h3>{val.title}</h3>
                 </div>
                 <div className='card-body'>
                  <p><b>Author: </b> {val.description}</p>
                  <div style={{display:'flex'}}>
                     <b style={{paddingTop:'0.5cm',marginRight:'20px'}}>Borrow Till: </b>
                     <input type='date' placeholder='Enter Borrow Date' value={val.Borrowed_Till}/>
                  </div>
                 </div>
                 </div>
                 <div className='flex'>
                     
                     <button className='zor' onClick={()=>returnhandler(val.SNo,val.userid,val.title,val.image,val.description,val.Borrowed_Till)}>
                         Return Book
                     </button>
                     {/* <button onClick={()=>delhandler(val.SNo)} className='zor'>
                         Delete Book
                     </button> */}
                     
                 </div>
                 </div>
                 </div>    
                 )
                 
               })
               
           }
           
       </div>)}
         </div>
      </div>

    )

}
export default Cart