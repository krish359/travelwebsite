import React from 'react'
import {Bar} from 'react-chartjs-2'
import {useState,useEffect} from 'react'
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from 'chart.js';
ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);
const HorizontalBar=()=>{
    const [datas,setData]=useState([]);
    useEffect(()=>{
        fetch('http://localhost:3002/ratinglist')
        .then(res=>res.json())
        .then(datas=>setData(datas))
        .catch(err=>console.log(err));
        
    },[])
    const starlist = [...new Set(datas.map((val)=>val.category))]
    const presentcount = [...new Set(datas.map((val)=>val.usercount))]
    const data={
        labels: starlist,
        datasets:[
            {
                label:'Rating Count',
                data: presentcount,
                backgroundColor:'orange',
                
                
            }
            
        ]
    }
    const options={
        indexAxis:'y',
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
            labels:{
                color: 'black',
                font:{
                    size: 25,
                    
                },
                
            }
        }
       },
        scales:{
            y:{
                ticks:{
                    color:'black',
                    font:{
                        size:'20',
                    }
                }
            },
            x:{
                ticks:{
                    color:'black',
                    font:{
                        size:'20',
                    }
                }
            },
            

        }
        
    }
    return (
        <div>
            <Bar data={data} options={options}></Bar>
        </div>
    )
}
export default HorizontalBar