import React from 'react'
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useDispatch, useSelector} from "react-redux";
import {GetUserDetails} from '../actions/UserActions'


const  ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [cartItems] = useState(localStorage.getItem('cartItems'));

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user} = userDetails;

    // used to check if user is logged in NB: User must be logged in before seeing the profile 
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;


    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            // check user information 
            if(!user || !user.name){
                dispatch(GetUserDetails('profile'))
                console.log("User Details ===>>>")
            }else{
                setName(user.name);
                setEmail(user.email);
            }
        }
      
    }, [userInfo, user, dispatch, navigate ])

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const confirmPasswordChangeHandler = (e) =>{
        setConfirmPassword(e.target.value)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setMessage('Passwords Do Not Match')
        }else{
            // dispatch(Register(name, email, password));
            console.log("Updating user details")
        }
    }




  return (
    <Row>
        <Col md={3}>
            <h2>User Profile</h2>
            <p>{message && <Message variant="danger">{message}</Message>}</p>
    {error && <Message variant="danger">{error}</Message>}
    {loading && <Loader/>}
    <Form onSubmit={submitHandler}>

    <Form.Group controlId="name" className='my-2'>
            {/* <Form.Label>Name</Form.Label> */}
            <Form.Control
                required
                value={name} 
                type="name"
                placeholder="Enter Name"
                onChange={nameChangeHandler}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className='my-2'>
            {/* <Form.Label>Email Address</Form.Label> */}
            <Form.Control
                required
                value={email} 
                type="email"
                placeholder="Enter Email"
                onChange={emailChangeHandler}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className='my-2'>
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control 
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={passwordChangeHandler}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirmed" className="my-3">
            {/* <Form.Label>Confirm Password</Form.Label> */}
            <Form.Control 
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={confirmPasswordChangeHandler}
            ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="info" className="my-1 w-100 "> Update Profile</Button>

    </Form>
        </Col>

        <Col md={9}>
            <h2>My Orders</h2>
        </Col>
    </Row>
  )
}

export default ProfileScreen