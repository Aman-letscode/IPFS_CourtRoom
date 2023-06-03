import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card';
import './Home.css'
import axios from 'axios'
import Button from 'react-bootstrap/Button';


function AdminDashboard() {
    if(!localStorage.getItem('role')) window.location='/'
    const url="http://localhost:4000/api/case";
    const [data, setData] = useState([]);

  const fetchInfo = () => {
    return axios.get(url).then((res) => setData(res.data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  console.log(data);

  const handleClick = ()=>{
    window.location = '/addCase'
  }
  return (
    <>
<Button variant="primary" onClick={handleClick} style={{margin:'2%',backgroundColor:'green'}}>Add Case</Button>
    <div className='case-area'>

    { Array.isArray(data)?data.map((dataObj, index) => {
      console.log(dataObj)
          return (
        <>
              {/* <Case data={dataObj}></Case> */}
              <div>
    <Card style={{ width: '18rem',margin:'1rem' }}>
      <Card.Body>
        <Card.Title>{dataObj.case_id}</Card.Title>
        <Card.Text>
          {dataObj.caseDescription}
        </Card.Text>
        <Card.Text>
          {/* <b>Judge:</b> {dataObj.users[2]} */}
          <b>Judge:</b> {dataObj.judge_id}
        </Card.Text>
        <Card.Text>
          <b>Lawyer1:</b> {dataObj.laywer1}
        </Card.Text>
        <Card.Text>
         <b> Lawyer2:</b> {dataObj.laywer2}
        </Card.Text>
            
        <Card.Text>
        <div className={` ${
                dataObj.status==='active' ? "active" : "closed"
              }`}>{dataObj.status}</div>
         {/* <b> Lawyer2:</b> {dataObj.users[2]} */}
        </Card.Text>

        
      </Card.Body>
    </Card>
    </div>
              <br />
        </>
              
           
          )
        }):null}
    </div>
    </>
  )
}

export default AdminDashboard