import React from 'react'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import '../Home/Home.css'
function Case(props) {
  console.log(props.data);
  const handleClick=()=>{
 
    console.log("aaaa");
    localStorage.setItem('Case',props.data.case_id)
    window.location=props.data.case_id

  }
  return (
    <div>
    <Card style={{ width: '18rem',margin:'1rem' }}>
      <Card.Body>
        <Card.Title>{props.data.case_id}</Card.Title>
        <Card.Text>
          {props.data.caseDescription}
        </Card.Text>
        <Card.Text>
          <b>Judge:</b> {props.data.users[2]}
        </Card.Text>
        <Card.Text>
          <b>Lawyer1:</b> {props.data.users[0]}
        </Card.Text>
        <Card.Text>
         <b> Lawyer2:</b> {props.data.users[1]}
        </Card.Text>
            
        <Card.Text>
        <div className={` ${
                props.data.status==='active' ? "active" : "closed"
              }`}>{props.data.status}</div>
         {/* <b> Lawyer2:</b> {dataObj.users[2]} */}
        </Card.Text>

        <Button variant="primary" onClick={handleClick}>Join</Button>
      </Card.Body>
    </Card>
    </div>
  )
}

export default Case 