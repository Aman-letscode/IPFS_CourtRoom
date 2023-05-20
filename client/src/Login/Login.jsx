import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import './Login.css'
import { useState } from 'react';
import axios from 'axios'
function Login() {
    const [user,setUser]=useState("");
    const [pass,setPass]=useState("");
    const handleSubmit=async (e)=>{
        e.preventDefault();
        console.log(user);
        const data={userId:user,password:pass};
        localStorage.setItem('User', data.userId);
        try{
            const res= await axios.post('http://localhost:4000/api/login',data,{
              headers:{
                "Content-Type":"application/json"
              }
            })
           
            console.log(res)
            localStorage.setItem('User', res.data.user_id);
            window.location = '/dashboard'
        }
        catch(e){
            alert(e);
        }
    }
  return (
    <>
    <div className='login-body'>

     <Card>
      <Card.Body>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setUser(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>setPass(e.target.value)} />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
      </Card.Body>
    </Card>
    </div>
    </>
  );
}

export default Login;