import React from 'react'
import DashboardNavbar from '../DashboardNavbar/DashboardNavbar'
import userpic from '../Assets/person.png'
import emailpic from '../Assets/email.png'
import passwordpic from '../Assets/password.png'
import './Profile.css'
import {useState,useEffect} from 'react'
import {FaStar} from 'react-icons/fa'
import { useLocation } from "react-router-dom";
import Axios from 'axios'
function Profile(){
    
    const [rating,setRating]=useState(null);
    const [hover,setHover]=useState(null);
    const [Ratingdes,setratingdes]=useState(" ");
    const [section,setsection]=useState("profile");
    const [profilecolor,setprofilecolor]=useState("submittrue");
    const [feedcolor,setfeedcolor]=useState("submitfalse");
    const [data,setData]=useState([])
    const location=useLocation();
    console.log(location);
    let b=location.state.userid;
    const feedbackhandler=()=>{
        setsection("rating");
        setfeedcolor("submittrue");
        setprofilecolor("submitfalse");
        
    }
    const profilehandler=()=>{
        setsection("profile");
        setfeedcolor("submitfalse");
        setprofilecolor("submittrue");
    }
    useEffect(()=>{
        
        fetch('http://localhost:3002/register_table')
          .then(res=>res.json())
          .then(data=>setData(data))
          .catch(err=>console.log(err));
        },[])
    
        const updatehandler=(id,status)=>{
            if(status!=="Submitted"){
            Axios.put("http://localhost:3002/rating_update", {
                userid: id,
                Rating: rating,
                rating_description: Ratingdes,
                
              }).then((response) => {
                console.log(response);
                
              }).catch(err=>console.log(err));
              window.location.reload();
            }
              
          }
          const resethandler=(id,ratingid)=>{
            Axios.put("http://localhost:3002/rating_reset", {
                userid: id,
                ratingid: ratingid,
              }).then((response) => {
                console.log(response);
                
              }).catch(err=>console.log(err));
              window.location.reload();
          }
      const newItems = data.filter((val)=>val.userid === b)
    return(
     <div>
       <DashboardNavbar></DashboardNavbar>
       <div className='select' style={{marginBottom:'0.5cm'}}>
            <button className={profilecolor} onClick={profilehandler}>User Profile</button>
            <button className={feedcolor} onClick={feedbackhandler}>Give Feedback</button>
            <button className='submitfalse'>Payment History</button>
            </div>
       <img className='profilephoto' src="https://i.etsystatic.com/6597368/r/il/25ffbe/2851356843/il_570xN.2851356843_khi1.jpg" alt="No url"></img>
       {section==="profile"&&(
        
        newItems.map((val)=>{
            return(
       <div key={val.userid}>
        <div style={{display:'flex',paddingBottom:'10px',gap:'10px'}}>
            <div style={{display:'column', marginLeft:'4cm'}}>
            <div style={{paddingBottom:'20px',fontWeight:'bold',fontSize:'25px',color:'white'}}>Name</div>
                <div className="input" style={{border:'5px solid blue'}}>
                    <img src={userpic} alt="" />
                    <input type="text" placeholder="Name" value={val.user}/>
                </div>
            </div>
            <div style={{display:'column', marginLeft:'4cm'}}>
            <div style={{paddingBottom:'20px',fontWeight:'bold',fontSize:'25px',color:'white'}}>Email</div>
                <div className="input" style={{border:'5px solid blue'}}>
                    <img src={emailpic} alt="" />
                    <input type="email" placeholder="Email" value={val.email}/>
                </div>
            </div>
            <div style={{display:'column',marginLeft:'4cm'}}>
            <div style={{paddingBottom:'20px',fontWeight:'bold',fontSize:'25px',color:'white'}}>Password</div>
                <div className="input" style={{border:'5px solid blue'}}>
                    <img src={passwordpic} alt="" />
                    <input type="password" placeholder="Password" value={val.original}/>
                </div>
            </div>
        </div>
        <div style={{display:'flex',gap:'10px',marginTop:'2cm'}}>
            <div style={{marginLeft:'4cm',fontSize:'1.5rem'}}>
            <legend style={{fontWeight:'bold',marginBottom:'25px',color:'white'}}>Gender</legend>
            <div className='imput' style={{border:'5px solid blue'}}>
            
            <div>
            <input style={{margin:'0.4rem'}} type='radio' id='male' name='gender' value='male'></input>
            <label  style={{fontFamily:'sans-serif'}} for='male' >Male</label>
           </div>
           <div>
            <input style={{margin:'0.4rem'}} type='radio' id='female' name='gender' value='female'></input>
            <label style={{fontFamily:'sans-serif'}} for='female'>Female</label>
           </div>
           <div>
            <input style={{margin:'0.4rem'}} type='radio' id='other' name='gender' value='other'></input>
            <label style={{fontFamily:'sans-serif'}} for='other'>Other</label>
           </div>

            </div>
            </div>
            <div style={{marginLeft:'4cm'}}>
            <div style={{paddingBottom:'20px',fontWeight:'bold',fontSize:'25px',color:'white'}}>Date Of Birth</div>
            <div className="input" style={{paddingBottom:'10px',border:'5px solid blue'}}>
            <input style={{marginLeft:'4.5cm',marginTop:'90px'}} type='date' placeholder='birthday date' value={val.DateofBirth}/>
            </div>
            </div>
            <div style={{marginLeft:'3.9cm'}}>
            <div style={{display:'column',paddingBottom:'10px'}}>
            <div style={{paddingBottom:'20px',fontWeight:'bold',fontSize:'25px',color:'white'}}>Course Enrolled</div>
            <div className="imput" style={{border:'5px solid blue'}}>
                <div>
                <select style={{width:'10cm',height:'1.4cm',border: 'none',fontSize: '1rem'}} value={val.Course}>
                <option value='Computer Science'>Computer Science</option>
                <option value='Data Science'>Data Science</option>
                <option value='Information Science'>Information Science</option>
                <option value='Health Science'>Health Science</option>
                <option value='Business Analytics'>Business Analytics</option>
                <option value='ADTA'>ADTA</option>
            </select>
                </div>
            </div>
            </div>
            </div>
        </div>
        <div style={{display:'flex',gap:'10px',marginTop:'2cm'}}>
        <div>
        <div style={{marginLeft:'4cm',display:'flex'}}>
        <div style={{paddingBottom:'20px',fontWeight:'bold',fontSize:'25px',color:'white'}}>Are you a student?</div>
        <div style={{display:'flex',gap:'15px'}}>
        <div style={{fontSize:'1.5rem'}}>
        <input type='checkbox' name='check' id='checkbox1' value='yes'></input>
        <label for='checkbox1' style={{color:'green',fontWeight:'bold'}} >Yes</label>
        </div>
        <div style={{fontSize:'1.5rem'}}>
        <input type='checkbox' name='check' id='checkbox2' value='no'></input>
        <label for='checkbox2' style={{color:'red',fontWeight:'bold'}}>No</label>
        </div>
        </div>
        </div>
        <div className="input" style={{marginLeft:'4cm',border:'5px solid blue'}}>
            <input type="text" placeholder="Provide your ID"/>
        </div>
        </div>
        </div>
        
       </div> )})
        
       )}
    

       {
        section==="rating"&&(
            newItems.map((val)=>{
                return(
            <div key={val.userid}>
            <div style={{display:'flex',marginLeft:'42%'}}>
                {[...Array(5)].map((star,index)=>{
        const currentRating=index+1;
        
        return( 
       <label style={{paddingLeft:'10px'}}>
        <div style={{display:'flex'}} >
         <input style={{display:'none'}} type='radio' name='rating' onClick={()=>setRating(currentRating)}/>
         <FaStar className='star' size={50} color={currentRating <=(hover||rating||val.Rating)?"#ffc107":"#e4e5e9"} 
         onMouseEnter={()=>setHover(currentRating)}
         onMouseLeave={()=>setHover(null)}/>
       </div>
       </label>
       
       )
        
       
                })}
            </div>
       <p style={{marginLeft:'45%',marginTop:'0.5cm',fontSize:'1.6rem',color:'#ffc107',fontWeight:'bold'}}>Your rating is {val.Rating}</p>
       
        <textarea style={{marginLeft:'40%',marginTop:'1cm',width:'12cm',height:'7cm',fontSize:'1.5rem',border:'5px solid blue'}} name="message" value={val.rating_description} placeholder={"Please specify your feedback in detail for rating "+rating} onChange={(event)=>{
                        setratingdes(event.target.value)
                    }}/>
        <div style={{display:'flex',gap:'12px'}}>
        <button className='submit' style={{marginLeft:'40%',marginTop:'0.5cm'}} onClick={()=>updatehandler(b,val.feedbackstatus)}>{val.feedbackstatus}</button>
        <button className='submit' style={{marginTop:'20px'}} onClick={()=>resethandler(b,val.Rating)}>Reset</button>
        </div>
        </div>
            )
    })
        
        )
    
       }
    
     </div>
    )
}
export default Profile