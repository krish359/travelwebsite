import React,{useState,useEffect} from 'react'
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar'
import '../Card/Card.css'
import './Dashboard.css'
import userpic from '../Assets/search.png'
import {useLocation } from "react-router-dom";
import Axios from 'axios'
import QuantityButton from '../QuantityButton/QuantityButton'

function Dashboard(){
    const [data,setData]=useState([])
    const [topdata,settopData]=useState([])
    const [bottomdata,setbottomData]=useState([])
    const [searchterm,setsearchterm]=useState("")
    const [modal, setModal] = useState(false);
    const [topmodal, settopModal] = useState(false);
    const [bottommodal, setbottomModal] = useState(false);
    const location=useLocation();
    console.log(location);
    const a=location.state.userid;
    const b=location.state.user;
    console.log('Hi')
    
    const toggleModal = () => {
        setModal(!modal);
        setTimeout(()=>{
          window.location.reload();
        },2000);
      };
      const topmodalhandler = () => {
        settopModal(!topmodal);
      };
      const bottommodalhandler = () => {
        setbottomModal(!bottommodal);
      };
    useEffect(()=>{
        fetch('http://localhost:3002/course_books')
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>console.log(err));
    },[])

    useEffect(()=>{
        fetch('http://localhost:3002/most_popular')
        .then(res=>res.json())
        .then(topdata=>settopData(topdata))
        .catch(err=>console.log(err));
    },[])

    useEffect(()=>{
        fetch('http://localhost:3002/recently_added')
        .then(res=>res.json())
        .then(bottomdata=>setbottomData(bottomdata))
        .catch(err=>console.log(err));
    },[])
    
    const carthandler=(id,title,image,description) => {
        
        Axios.put("http://localhost:3002/user_course", {
            userid: a,
            user: b,
            bookid: id,
            title: title,
            image: image,
            description: description
          }).then((response) => {
            console.log(response);
          }).catch(err=>console.log(err));
          toggleModal();
          
    };
    
    return (
        <div className='Dashboardbody'>
            <DashboardNavbar></DashboardNavbar>
            <div style={{display:'flex',gap:'10px',marginLeft:'41%',marginBottom:'1cm'}}>
            <button className='submit' onClick={topmodalhandler}>MOST POPULAR</button>
            <button className='submit' onClick={bottommodalhandler}>NEW EDITION</button>
            </div>
            {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <h2>Cart</h2>
            <p>
              Added to Cart Successfully
            </p>
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
      {topmodal && (
        <div style={{top:'0',bottom:'0',left:'0',right:'0',position:'absolute',width:'100vw',height:'100vh'}}>
          <div onClick={topmodalhandler} className="overlay"></div>
          <div className="modal-content">
            {topdata.map((val)=>{
                return(
          <div style={{width:'auto',height:'auto',backgroundColor:'white',}}>
          <div style={{height:'500px',width:'500px',overflow:'hidden'}}>
                <img style={{height:'500px',width:'500px',overflow:'hidden'}} src={val.image} alt="" />
            </div>
            <div className='card-content'>
            <div className='card-title'>
                <h3>{val.title}</h3>
            </div>
            <div className='card-body'>
                <p><b>Author: </b>{val.description}</p>
            </div>
            </div>
          </div>)})}
          <button className="close-modal" onClick={topmodalhandler}>
              CLOSE
        </button>
          </div>
      
        </div>
      )}
      {bottommodal && (
        <div style={{top:'0',bottom:'0',left:'0',right:'0',position:'absolute',width:'100vw',height:'100vh'}}>
          <div onClick={bottommodalhandler} className="overlay"></div>
          <div className="modal-content">
            {bottomdata.map((val)=>{
                return(
          <div style={{width:'auto',height:'auto',backgroundColor:'white',}}>
          <div style={{height:'500px',width:'500px',overflow:'hidden'}}>
                <img style={{height:'500px',width:'500px',overflow:'hidden'}} src={val.image} alt="" />
            </div>
            <div className='card-content'>
            <div className='card-title'>
                <h3>{val.title}</h3>
            </div>
            <div className='card-body'>
                <p><b>Author: </b>{val.description}</p>
            </div>
            </div>
          </div>)})}
          <button className="close-modal" onClick={bottommodalhandler}>
              CLOSE
        </button>
          </div>
      
        </div>
      )}
      
            <div className='welcome'>
                <div className='start'>Welcome to Library Books Collection</div>
            </div>
                <div className="inputs">
                <div className="input">
                    <img src={userpic} alt="" />
                    <input id='searchInput' type='text' placeholder='Enter Search Book' onChange={(event)=>{
                        setsearchterm(event.target.value)
                    }}/>
                </div>
                </div>
            <div>
              <div className='ove'>
                
                  {
                    data.filter((val)=>{
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
                            <b>Author: </b> {val.description}
                            <div>
                            <b>Stock Available:</b> {val.quantity}
                            </div>
                           
                            <div className="qbutton">
                                <b>Quantity:</b> 
                                <QuantityButton></QuantityButton>
                                </div>      
                        </div>
                        </div>
                        <div>
                            <button className='zoro' onClick={()=>carthandler(val.SNo,val.title,val.image,val.description)}>
                                Add To Cart
                            </button>
                            
                            
                        </div>
                        </div>
                        </div>    
                        )
                        
                      })
                      
                  }
                   
              </div>
        </div>
            
        </div>
    )
}

export default Dashboard