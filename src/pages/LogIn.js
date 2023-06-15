import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const LogIn = () => {
    const [adminName, setAdminName] = useState("");
    const [adminPass, setAdminPass] = useState("");
    const navigator = useNavigate();

    useEffect(() => {
      handleLogOut();
    }, [])

    //first make sure user is loged out
    const handleLogOut = () => {
      fetch('https://bellaitaliaa.com/api/log_out.php')
        .then(response => response.json())
        .then(data => {
          if(data.success === true) {
           console.log(data)
          }
        })
        .catch(error => {
          console.log(error);
        })
    }
    

    //Login function that uses php
    const handleLogin = async () => {
      try {
        const response = await fetch('https://bellaitaliaa.com/api/logInEngine.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ adminName, adminPass }),
        });
  
        const data = await response.json();
  
        if (data) {
          // Login successful, perform desired actions
          console.log('Login successful');
          navigator('/adminShop');
        } else {
          // Login failed, display error message
          //console.log("Error:", data.error);
          alert('Sie haben falsche Admin Name oder Password eingegeben, versuchen Sie nochmal. Wenn Sie weiter Probleme haben, kontaktieren Sie ihre Developer: gengraphicservices@gmail.com');
        }
      } catch (error) {
        console.error('An error occurred:', error);
        alert('Sie haben falsche Admin Name oder Password eingegeben, versuchen Sie nochmal. Wenn Sie weiter Probleme haben, kontaktieren Sie ihre Developer: gengraphicservices@gmail.com');
      }
    };


  return (
    <Container className='my-5'>
        <Row>
            <Col className='d-flex justify-content-center'>
                <img src={require('../images/logo.png')} alt='Logo' width={200}/> 
            </Col>
        </Row>

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Admin Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Admin Name" onChange={(text) => setAdminName(text.target.value)}/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={(text) => setAdminPass(text.target.value)}/>
          </Form.Group>

          <Button variant="primary" onClick={handleLogin}>
            Submit
          </Button>
        </Form>
    </Container>
  )
}

export default LogIn
