import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useDispatch, useSelector} from "react-redux";
import {Register} from '../actions/UserActions'
import FormContainer from "../components/FormContainer";


const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [cartItems] = useState(localStorage.getItem('cartItems'));

    const userRegister = useSelector(state => state.userRegister);
    const { loading, error, userInfo} = userRegister;


    useEffect(() => {
        if(userInfo){
            navigate('/cart')
        }
      
    }, [userInfo, navigate ])

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
            dispatch(Register(name, email, password));
        }
    }

  return ( <FormContainer>
    <h1>Register</h1>
    <p>{message && <Message variant="danger">{message}</Message>}</p>
    {error && <Message variant="danger">{error}</Message>}
    {loading && <Loader/>}
    <Form onSubmit={submitHandler}>

    <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
                required
                value={name} 
                type="name"
                placeholder="Enter Name"
                onChange={nameChangeHandler}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
                required
                value={email} 
                type="email"
                placeholder="Enter Email"
                onChange={emailChangeHandler}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control 
                required
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={passwordChangeHandler}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirmed" className="my-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control 
                required
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={confirmPasswordChangeHandler}
            ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="info" className="my-3 w-100 ">Register</Button>

    </Form>

    <Row className="py-3">
        <Col> Have an Account? <Link to='/login'><span style={{'color': 'blue'}}>Sign In</span></Link></Col>
        {/* <Col> New Customer? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>Register</Link></Col> */}
    </Row>
</FormContainer>)
};

export default RegisterScreen;
