import React from 'react'
import {Bar} from "react-chartjs-2";
import './Barchart.css';
import {Chart,LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip} from 'chart.js'
Chart.register(
    LinearScale,CategoryScale,BarElement,Legend,Title,Tooltip
)
const labels = ['Jan','Feb','Mar','April','May','June','July','Aug','Sep','Oct','Nov','Dec'];

const options={
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
        

    },
   
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
                
            },
            position: 'top'
        },
        title:{
            display: true,
            text: "Expense Tracker"

        }
    }
}

const data={
    labels,
    datasets:[
        {
            label:'2023 Expense',
            data:[1,2,3,4,5,6,7,8,9,10,11,12],
            backgroundColor:'pink'
        },
        {
            label:'2024 Expense',
            data:[21,22,23,24,25,26,27,28,29,30,31,32],
            backgroundColor:'green'
        }
    ]
}
function Barchart(){
    return(
        <div className='adjust'>
       <Bar options={options} data={data}/> 
       </div>
    )
}

export default Barchart