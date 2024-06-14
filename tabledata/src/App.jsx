import React,{useState} from 'react'
import { useEffect } from 'react'

function App(){
    const [data,setData]=useState([])
    useEffect(()=>{
        fetch('http://localhost:7090/book_copies')
        .then(res=>res.json())
        .then(data=>setData(data))
        .catch(err=>console.log(err));
    },[])
    return (
        <div className='happy'>
            <div className='text'>Library Collection Details</div>
        <div style={{padding: "50px"}}>
          <table>
            <thead>
                <th>serial_no</th>
                <th>isbn</th>
                <th>available</th>
            </thead>
            <tbody>
                {data.map((d,i)=>(
                    <tr key={i}>
                        <td>{d.serial_no}</td>
                        <td>{d.isbn}</td>
                        <td>{d.available}</td>
                    </tr>
                ))}
            </tbody>
          </table>
        </div>
        </div>
    )
}

export default App