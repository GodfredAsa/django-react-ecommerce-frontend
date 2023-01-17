import React  from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Form, Button} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useDispatch, useSelector} from "react-redux";
import {GetUserDetails} from '../actions/UserActions';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FormContainer from "../components/FormContainer";


const UserEditScreen = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const userId = useParams().id;


    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user} = userDetails;


    useEffect(() => {
      if(!user.name || user._id !== Number(userId)){
        dispatch(GetUserDetails(userId))
      }else{
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
      
    }, [user, dispatch, setName, setEmail, setIsAdmin])

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const nameChangeHandler = (e) => {
        setName(e.target.value);
    }

    const isAdminChangeHandler = (e) => {
      setIsAdmin(e.target.checked)
    }

    const submitHandler = (e) => {
        e.preventDefault();
       
    }

  return ( 

    <div>
      <Link to='/admin/userlist'>Go Back</Link>
      <FormContainer>
    <h1>Edit User</h1>
    {loading ?  <Loader/> : 
    error ? <Message variant="danger">{error}</Message> : 
        <Form onSubmit={submitHandler}  className='my-5'>
        <Form.Group controlId="name"  className='my-5'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    value={name} 
                    type="name"
                    placeholder="Enter Name"
                    onChange={nameChangeHandler}
                ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    value={email} 
                    type="email"
                    placeholder="Enter Email"
                    onChange={emailChangeHandler}
                ></Form.Control>
            </Form.Group>
    
            <Form.Group controlId="isAdmin"  className='my-3'>
                <Form.Check 
                    type="checkbox"
                    label="isAdmin"
                    checked ={isAdmin}
                    onChange={isAdminChangeHandler}
                ></Form.Check>
            </Form.Group>
    
            <Button type="submit" variant="info" className="my-3 w-100 ">Update</Button> 
        </Form>}
  
</FormContainer>
    </div>
)
};

export default UserEditScreen;