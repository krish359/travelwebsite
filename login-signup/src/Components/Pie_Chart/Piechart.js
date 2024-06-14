import React from 'react'
import {Pie} from 'react-chartjs-2';
import {useState,useEffect} from 'react'
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
}from 'chart.js';
ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
);
const Piechart=()=>{
    const [datas,setData]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:3002/course_books')
        .then(res=>res.json())
        .then(datas=>setData(datas))
        .catch(err=>console.log(err));
        
    },[])
    const bookslist = [...new Set(datas.map((val)=>val.title))]
    const bookscount = [...new Set(datas.map((val)=>val.Borrowed_quantity))]
    const data={
        
        // labels:['one','two','three'],
        labels: bookslist,
        datasets:[
            {
                
                label:'Borrowed Books Count',
                // data:[3,6,5],
                data: bookscount,
                backgroundColor:['aqua','orangered','purple','lightgreen','yellow'],
                
                
            }
            
        ]
    }
    const options={
        // indexAxis:'y',
       plugins:{
        tooltip:{
            titleFont:{
                size:25
            },
            bodyFont:{
                size:25
            },
        },
        legend:{
            display: false,
            labels:{
                color: 'black',
                font:{
                    size: 25,
                    
                },
                
            }
        }
       },
        // scales:{
        //     y:{
        //         ticks:{
        //             color:'black',
        //             font:{
        //                 size:'20',
        //             }
        //         }
        //     },
        //     x:{
        //         ticks:{
        //             color:'black',
        //             font:{
        //                 size:'20',
        //             }
        //         }
        //     },
            

        // }
        
    }
    return (
        <div>
            <Pie data={data} options={options}></Pie>
        </div>
    )
}
export default Piechart