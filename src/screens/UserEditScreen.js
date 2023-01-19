import React  from 'react'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Form, Button} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useDispatch, useSelector} from "react-redux";
import {GetUserDetails, UpdateUser} from '../actions/UserActions';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import FormContainer from "../components/FormContainer";
import {USER_UPDATE_RESET} from '../constants/UserConstants'


const UserEditScreen = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const userId = useParams().id;


    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user} = userDetails;

    const userUpdate = useSelector(state => state.updateUser);
    const {loading: updateUserLoading, updateUserError, success: updateUserSuccess} = userUpdate;


    useEffect(() => {
      if(updateUserSuccess){
        dispatch({type: USER_UPDATE_RESET})
        navigate('/admin/userlist')
      }else{

        if(!user.name || user._id !== Number(userId)){
          dispatch(GetUserDetails(userId))
        }else{
          setName(user.name)
          setEmail(user.email)
          setIsAdmin(user.isAdmin)
        }
      }
      
    }, [user, dispatch, setName, setEmail, setIsAdmin, navigate, userId, updateUserSuccess])

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
        dispatch(UpdateUser({_id: user._id, name, email, isAdmin})) 
    }

  return ( 

    <div>
      <Link to='/admin/userlist'><Button variant="light" className='btn-sm bg-light text-dark' >Go Back</Button></Link>
      <FormContainer>
    <h1>Edit User</h1>
    {updateUserLoading && <Loader/>}
    {updateUserError && <Message variant="danger">{updateUserError}</Message>}
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