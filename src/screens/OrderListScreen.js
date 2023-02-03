import React from 'react'
import { useEffect} from "react";
import {Button, Table, ButtonGroup} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message'
import Loader from '../components/Loader';
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';
import {ListOrders} from '../actions/OrderActions'

export default function OrderListScreen() {
  const dispatch = useDispatch();

    const navigate = useNavigate();

    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;

    const orderLists = useSelector(state => state.orderList);
    const {loading, error, orders} = orderLists

    useEffect(()=> {
        if(userInfo && userInfo.isAdmin){
            dispatch(ListOrders())
        }else{
            navigate('/login')
        }
    }, [dispatch, userInfo, navigate ])

  return (

      <div>
          <h1>Orders Page </h1>
  
          {loading ? <Loader/> 
          : error ? <Message variant="danger">{error}</Message> 
          : <Table  bordered hover responsive className='table-sm'>
              <thead>
                  <tr>
                      <th>ID</th>
                      <th>USER</th>
                      <th>DATE</th>
                      <th>PRICE</th>
                      <th>PAID</th>
                      <th>DELIVERED</th>
                      <th>Actions</th>
                  </tr>
              </thead>
  
              <tbody>
                 {orders &&  orders.map(order => 
                 <tr key={order._id}>
                      <td>{order._id}</td> 
                      <td>{order.user && order.user.name}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td> 

                      <td>{order.isPaid ? order.paidAt.substring(0,10) : <p className='fas fas-check' style={{'color': 'red'}}>Not Paid</p>}</td>
                      <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : <p className='fas fas-check' style={{'color': 'red'}}>Not Delivered</p>}</td>
                      <td>
                      <ButtonGroup style={{'fontSize': '1rem'}}>
                             <LinkContainer to={`/orders/${order._id}`}  >
                             <Button 
                                      className='btn-sm' 
                                      variant='info' 
                                      type='button'> Details
                             </Button>
                             
                             </LinkContainer>

                          </ButtonGroup>
                      </td>
                  </tr>)}
              </tbody>
            </Table>}
        
      </div>
    )
}



