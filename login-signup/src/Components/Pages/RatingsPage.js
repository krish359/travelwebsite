import React from 'react'
import HorizontalBar from '../Barchart/HorizontalBar';
import AdminNavbar from './AdminNavbar'
import {useState,useEffect} from 'react'
import userpic from '../Assets/search.png'
function RatingsPage() {
  const [datas,setData]=useState([]);
  const [section, setsection] = useState("hai");
  const [colorrate, setcolorrate] = useState("submittrue");
  const [coloruser, setcoloruser] = useState("submitfalse");
  
    useEffect(()=>{
        fetch('http://localhost:3002/register_table')
        .then(res=>res.json())
        .then(datas=>setData(datas))
        .catch(err=>console.log(err));
        
    },[])
    function ratinghandler(){
    setsection("hai");
    setcolorrate("submittrue");
    setcoloruser("submitfalse");
    }
    function userhandler(){
      setRecords(datas);
      setsection("bai");
      setcolorrate("submitfalse");
      setcoloruser("submittrue");
      
    }
    const [records,setRecords]=useState(datas);
    function handleFilter(event){
      const newData=datas.filter((val)=>{
        if(event.target.value===" "){
           return val;
        }
      else if(val.user.toLowerCase().includes(event.target.value.toLowerCase())){
        return val;
      }
      else{
        return false;
      }
    }
        )
        setRecords(newData);
    }
  return (
    <div>
        <AdminNavbar></AdminNavbar>
        <div style={{display:'flex',marginLeft:'40%',gap:'20px'}}>
            <button className={colorrate} onClick={ratinghandler}>Rating Section</button>
            <button className={coloruser} onClick={userhandler}>User Section</button>
          </div>
        {section==="hai"&&(
          <div>
        <div style={{width:'70%',height:'auto',backgroundColor:'white',marginLeft:'9cm',marginTop:'3cm'}}>
        <h1 style={{marginLeft:'42%'}}>Users Ratings</h1>
      <div style={{padding:'100px',width:'80%'}}>
      <HorizontalBar></HorizontalBar>
      </div>
      
    </div>
    </div>
    )}
    {section==="bai"&&(
      
          <div>
            <div className="inputs">
                <div className="input">
                    <img src={userpic} alt="" />
                    <input id='searchInput' type='text' placeholder='Enter User' onChange={handleFilter}/>
                </div>
                </div>
        <div style={{padding: "50px"}}>
          <table style={{marginLeft:'34%'}}>
            <thead>
                <tr>
                <th>USERID</th>
                <th>USER</th>
                <th>RATING</th>
                <th>DESCRIPTION</th>
                </tr>
            </thead>
            <tbody>
            {records.map((d,i)=>(
              <tr>
                <td>{d.userid}</td>
                <td>{d.user}</td>
                <td>{d.Rating}</td>
                <td>{d.rating_description}</td>
              </tr>
              ))}
            </tbody>
            </table>
    </div>
    
  
    </div>
    )}
    
    </div>
  );
  
}
export default RatingsPage