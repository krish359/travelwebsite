import React from 'react'
import {Bar} from 'react-chartjs-2'
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
    const data={
        labels:['5-star','4-star','3-star','2-star','1-star'],
        datasets:[
            {
                label:'Rating',
                data:[12,5,9,2,1],
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