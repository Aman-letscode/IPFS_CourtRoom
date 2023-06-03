import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../Login/Login.css";
import { useState } from "react";
import axios from "axios";
// import { image } from "../Images/images.jpg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import LoadingPage from "../Components/LoadingPage";
// import { ReactComponent as Logo } from '../Images/judge.jpg';
function AddCase() {
  
  const [caseno, setCaseno] = useState("");
  const [judge, setJudge] = useState("");
  const [lawyer1, setLawyer1] = useState("");
  const [lawyer2, setLawyer2] = useState("");
  const [desc, setDesc] = useState("");
  
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { CaseNo:caseno,judge:judge,lawyer1:lawyer1,lawyer2:lawyer2,desc:desc };
    console.log(data)
    try {
      const res = await axios.post("http://localhost:4000/api/addCase", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.status==='success') {
        
        alert(res.data.message);
          // window.location = '/admin'
        
        
      }
      else{
        if(res.data.error !==undefined) {
            alert(res.data.message+res.data.error)
        }
        else{

            alert(res.data.message);
            // window.location = '/addCase'
        }
        
      }
    } catch (e) {
      alert(e);
    }
  };
  
  const handleBack = () =>{
    window.location = '/admin'
  }

  return (
    <>
      <div className="container-fluid homepage-bgimage">
      <div className="header">

<h1 className="room-name">Case Information:</h1>
<button onClick={handleBack} className="send-message-button" style={{marginLeft:'60%',backgroundColor:'green'}}>Back</button>
</div>
        <div className="login-body" >
        <Card>
          <Card.Body>
            <Form noValidate 
              validated={false} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Case Number:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Case No."
                  onChange={(e) => setCaseno(e.target.value)}
                  required  
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Judge ID:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Judge ID"
                  onChange={(e) => setJudge(e.target.value)}
                  required  
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Lawyer 1 ID:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Lawyer ID"
                  onChange={(e) => setLawyer1(e.target.value)}
                  required  
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Lawyer 2 ID:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Lawyer ID"
                  onChange={(e) => setLawyer2(e.target.value)}
                  required  
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Case Description:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Case Description"
                  onChange={(e) => setDesc(e.target.value)}
                  required  
                />
              </Form.Group>

              <Button variant="dark" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
        </div>
      </div>
    </>
  );
}

export default AddCase;
