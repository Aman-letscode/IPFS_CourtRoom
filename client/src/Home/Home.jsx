import React, { useState, useEffect } from 'react'
import Case from '../Components/Case'
import './Home.css'
import axios from 'axios'
import LoadingPage from '../Components/LoadingPage'
function Dashboard() {
    if(!localStorage.getItem('User')) window.location='/'
    const url="http://localhost:4000/api/case/"+localStorage.getItem('User');
    const [data, setData] = useState([]);
    const [isLoading,setIsLoading]=useState(true);

  useEffect(
    axios.get(url).then((res) => { 
      setData(res.data)
      // setIsLoading(false)
    }
      ),[]);

  console.log(data.caseIds);
  return (
    <>
    {isLoading?<LoadingPage/>:<>
    <div className='case-area'>

    { Array.isArray(data.caseIds)?data.caseIds.map((dataObj, index) => {
          return (
        
              <Case data={dataObj}></Case>
           
          )
        }):null}
    </div>
    </>}</>
  )
}

export default Dashboard
