import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { useState } from "react";
import axios from "axios";
// import { image } from "../Images/images.jpg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import LoadingPage from "../Components/LoadingPage";
// import { ReactComponent as Logo } from '../Images/judge.jpg';
function Login() {
  localStorage.clear();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { userId: user, password: pass };
    try {
      const res = await axios.post("http://localhost:4000/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.data.user_id != undefined) {
        if(res.data.role =='admin') {
          localStorage.setItem("role",res.data.role);
          window.location = '/admin'
        }
        else{

          localStorage.setItem("User", res.data.user_id);
          window.location = "/dashboard";
        }
      }
      else{
        localStorage.clear();
      }
    } catch (e) {
      alert(e);
    }
  };
  return (
    <>
      <div className="container-fluid homepage-bgimage">
        <div className="login-body">
        <Card>
          <Card.Body>
            <Form noValidate 
              validated={false} >
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>User ID:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setUser(e.target.value)}
                  required  
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
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

export default Login;
