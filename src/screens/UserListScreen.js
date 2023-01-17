import React from 'react'
import { useEffect} from "react";
import {Button, Table, ButtonGroup} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader';
import {useDispatch, useSelector} from "react-redux";
import {ListUsers, DeleteUser} from '../actions/UserActions';
import { useNavigate } from 'react-router-dom';

export default function UserListScreen() {
    const dispatch = useDispatch();
    const userLists = useSelector(state => state.userList);
    const {loading, users, error} = userLists;
    const navigate = useNavigate();
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const delUser = useSelector(state => state.deleteUser);
    const {success: successDelete} = delUser

    useEffect(()=> {
        if(userInfo && userInfo.isAdmin){
            dispatch(ListUsers())
        }else{
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate, successDelete])

    const deleteUserHandler = (id) => {
        if(window.confirm("Delete User")){
            dispatch(DeleteUser(id))
        }
    }



  return (
    <div>

        <h1>Users Page </h1>

        {loading ? <Loader/> 
        : error ? <Message variant="danger">{error}</Message> 
        : <Table  bordered hover responsive className='table-sm'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>STATUS</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
               {users &&  users.map(user => 
               <tr key={user._id}>
                    <td>{user._id}</td> 
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? <p className='fas fas-check' style={{'color': 'green'}}>Admin</p> : <p>Not Admin</p>}</td>
                    <td>
                    <ButtonGroup style={{'fontSize': '1rem'}}>
                           <LinkContainer to={`/user/${user._id}/edit`}  >
                                <Button 
                                    className='btn-sm' 
                                    variant='success' 
                                    type='button'> Edit
                                </Button>
                           
                           </LinkContainer>
                           <Button 
                                    className='btn-sm' 
                                    variant='info' 
                                    type='button'> View
                           </Button>
                            <Button 
                                className='btn-sm' 
                                variant='danger' 
                                type='button'
                                onClick={() => deleteUserHandler(user._id)}
                                >Delete
                            </Button>
                        </ButtonGroup>
                    </td>
                </tr>)}
            </tbody>
          </Table>}

          {/* <Button 
                className='btn-sm float-right' 
                variant='light' 
                type='button'
                // onClick={() => deleteUserHandler(user._id)}
                >Add User
            </Button> */}
      
    </div>
  )
}

