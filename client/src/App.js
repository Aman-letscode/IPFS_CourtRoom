import React from "react";
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

import "./index.css";
import Home from "./Home/Home";
import Dashboard from "./Home/Dashboard";
import AdminDashboard from "./Home/AdminDashboard";
import AddCase from "./Components/AddCase";
import Login from "./Login/Login";
import ChatRoom from "./ChatRoom/ChatRoom";

function App() {
  return (
    // <Router>
    //   <Switch>
    //     <Route exact path="/" component={Login} />
    //     <Route exact path="/home" component={Dashboard} />
    //     <Route exact path="/:roomId" component={ChatRoom} />
    //   </Switch>
    // </Router>
    <>
    <Router>
      <Routes>
      <Route exact path='/' element={< Login />}></Route>
      <Route exact path='/dashboard' element={< Dashboard />}></Route>
      <Route exact path='/admin' element={< AdminDashboard />}></Route>
      <Route exact path='/addCase' element={< AddCase />}></Route>
      <Route exact path='/home' element={< Home />}></Route>
      <Route exact path='/:roomId' element={< ChatRoom />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
