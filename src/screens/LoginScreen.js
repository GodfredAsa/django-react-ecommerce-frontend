import {useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {Form, Button, Row, Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useDispatch, useSelector} from "react-redux";
import Login from "../actions/UserActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cartItems] = useState(localStorage.getItem('cartItems'));

    const userLogin = useSelector(state => state.userLogin);
    const { loading, error, userInfo} = userLogin;
    console.log(userInfo)
// TODO THIS SECTION OF THE CODE MUST BE CORRECTED 
    // if(userInfo) {
    //     navigate('/cart')
    // }else if(!userInfo){
    //     navigate('/login')
    // }

    // useEffect(() => {
    //     if(userInfo && cartItems.length >=1) {
    //         navigate('/cart')
    //     }else{
    //         navigate('/products')
    //     }
    // }, [userInfo, navigate, cartItems])

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(Login(email, password));
    }

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        value={email} 
                        type="email"
                        placeholder="Enter Email"
                        onChange={emailChangeHandler}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={passwordChangeHandler}
                    ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="info" className="my-3 w-100 ">Sign in</Button>

            </Form>

            <Row className="py-3">
                <Col> New Customer? <Link to='/register'><span style={{'color': 'blue'}}>Register</span></Link></Col>
                {/* <Col> New Customer? <Link to={redirect ? `/register?redirect=${redirect}`: '/register'}>Register</Link></Col> */}
            </Row>
        </FormContainer>
      );
}
 
export default LoginScreen;