import React  from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Form, Button, Row, Col, Table, ButtonGroup} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useDispatch, useSelector} from "react-redux";
import {GetUserDetails, UpdateUserProfile} from '../actions/UserActions';
import {USER_UPDATE_PROFILE_RESET} from '../constants/UserConstants';
import {MyOrderedLists} from '../actions/OrderActions'

const  ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user} = userDetails;

    // used to check if user is logged in NB: User must be logged in before seeing the profile 
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success} = userUpdateProfile;
    
    const myOrderedList = useSelector(state => state.myOrderList);

    const {loading: loadingOrders, error: errorOrders } = myOrderedList;

    const orders = JSON.parse(localStorage.getItem('myOrders'));

    useEffect(()=> {
    if(!userInfo){
        dispatch({type: USER_UPDATE_PROFILE_RESET})
        dispatch(GetUserDetails('profile'));
        dispatch(MyOrderedLists())
    }
}, [dispatch, userInfo, orders])


    useEffect(() => {
        if(!userInfo){
            navigate('/login')
        }else{
            if(!orders || success || loading){ 
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(GetUserDetails('profile'));
                dispatch(MyOrderedLists())
            }else{
                setName(user.name);
                setEmail(user.email);
            }
        }
      
    }, [userInfo, orders, user, dispatch, navigate, success, loading])

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
            dispatch(UpdateUserProfile(
                {'_id': user._id,
                'name': name,
                'email': email,
                'password': password
            }));
            
            setMessage('')
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
            <Form.Control
                required
                value={name} 
                type="name"
                placeholder="Enter Name"
                onChange={nameChangeHandler}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className='my-2'>
            <Form.Control
                required
                value={email} 
                type="email"
                placeholder="Enter Email"
                onChange={emailChangeHandler}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className='my-2'>
            <Form.Control 
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={passwordChangeHandler}
            ></Form.Control>
        </Form.Group>

        <Form.Group controlId="passwordConfirmed" className="my-3">
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
            <h2>My Orders <span style=
            {{'color': 'white', 
            'fontSize': '1.5rem', 
            'padding': '5px 8px ',
            'borderRadius': '10px'
            }} className="bg-info">{orders && orders.length}</span></h2>
            {loadingOrders && <Loader/>}
            {errorOrders && <Message variant="danger">{errorOrders}</Message>}

          <Table striped responsive className='table-sm'>
            <thead>
                <tr>
                    <td>ID</td>
                    <td>Date</td>
                    <td>Total</td>
                    <td>Paid</td>
                    <td>Delivered</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
               {orders && orders.map( order =>  
               <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0,10)}</td>
                    <td>${order.totalPrice}</td>
                    <td>{order.isPaid === false ? 'xxxx-xx-xx' : order.paidAt.substring(0,10)}</td>
                    <td>{order.isDelivered === false ? 'xxxx-xx-xx' : order.deliveredAt.substring(0,10)}</td>
                    <td>
                        <ButtonGroup>
                           <LinkContainer to={``}>
                                <Button 
                                        className='btn-sm' 
                                        variant='danger' 
                                        type='button' 
                                        style={{'fontSize': '1rem'}}>Delete
                                </Button>
                           
                           </LinkContainer>
                           <LinkContainer to={`/orders/${order._id}`}>
                                <Button 
                                        className='btn-sm' 
                                        variant='info' 
                                        type='button' 
                                        style={{'fontSize': '1rem'}}>Details
                                    </Button>
                            </LinkContainer>
                        </ButtonGroup>
                    </td>
                </tr>) }
            </tbody>
          </Table>
            
        </Col>
    </Row>
  )
}

export default React.memo(ProfileScreen)