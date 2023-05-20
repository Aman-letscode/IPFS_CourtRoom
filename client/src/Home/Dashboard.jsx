import React, { useState, useEffect } from 'react'
import Case from '../Components/Case'
import './Home.css'
import axios from 'axios'
function Dashboard() {
    if(!localStorage.getItem('User')) window.location='/'
    const url="http://localhost:4000/api/case/"+localStorage.getItem('User');
    const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get(url).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  console.log(data.caseIds);
  return (
    <>

    <div className='case-area'>

    { Array.isArray(data.caseIds)?data.caseIds.map((dataObj, index) => {
          return (
        
              <Case data={dataObj}></Case>
           
          )
        }):null}
    </div>
    </>
  )
}

export default Dashboard