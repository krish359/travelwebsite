import React from 'react'
import AdminNavbar from './AdminNavbar'
import {useState,useEffect} from 'react'
import userpic from '../Assets/search.png'
import Piechart from '../Pie_Chart/Piechart';
import {NavLink } from "react-router-dom";
function Borrowpage() {
  const [datas,setData]=useState([]);
  const [section, setsection] = useState("hai");
  const [colorrate, setcolorrate] = useState("submittrue");
  const [coloruser, setcoloruser] = useState("submitfalse");
  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=5;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const npage=Math.ceil(datas.length/recordsPerPage);
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
  
    useEffect(()=>{
        fetch('http://localhost:3002/user_course')
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
      setRecords(borrowedItems);
      setsection("bai");
      setcolorrate("submitfalse");
      setcoloruser("submittrue");
      
    }
    
    const borrowedItems = datas.filter((val)=>val.Status==='Borrowed');
    const [records,setRecords]=useState(borrowedItems);
    const slicedrecords=records.slice(firstIndex,lastIndex);
    function handleFilter(event){
      const newData=slicedrecords.filter((val)=>{
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
            <button className={colorrate} onClick={ratinghandler}>Books Count</button>
            <button className={coloruser} onClick={userhandler}>Books Description</button>
          </div>
        {section==="hai"&&(
          <div>
        <div style={{width:'60%',height:'auto',backgroundColor:'transparent',marginLeft:'11cm',marginTop:'3cm'}}>
        <h1 style={{marginLeft:'42%',fontWeight:'bold'}}>Borrowed Count</h1>
      <div style={{paddingLeft:'30%',width:'40%'}}>
      <Piechart></Piechart>
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
          <table style={{marginLeft:'18%'}}>
            <thead>
                <tr>
                <th>USERID</th>
                <th>USER</th>
                <th>BOOKID</th>
                <th>TITLE</th>
                <th>BORROWED_TILL</th>
                <th>EXTEND DATE</th>
                <th>RETURN</th>
                </tr>
            </thead>
            <tbody>
            {slicedrecords.map((d,i)=>(
              <tr>
                <td>{d.userid}</td>
                <td>{d.user}</td>
                <td>{d.SNo}</td>
                <td>{d.title}</td>
                <td>{d.Borrowed_Till}</td>
                <td>
                <button className="submit">EXTEND</button>
                </td>
                <td>
                <button className="submit">RETURN</button>
                </td>
              </tr>
              ))}
            </tbody>
            </table>
            <nav style={{marginLeft:'40%'}}>
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
    )}
    
    </div>
  );
  
}
export default Borrowpage