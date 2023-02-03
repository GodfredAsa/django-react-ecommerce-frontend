import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Image, Card, ListGroup, Button } from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {GetOrderDetails, DeliverOrder, PayOrder} from '../actions/OrderActions';
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../constants/OrderConstants'

const OrderScreen = () => {
    const orderId = useParams().id;
    const dispatch = useDispatch();
    const [sdkReady, setSdkReady] = useState(false);
    const shippingInfo = JSON.parse(localStorage.getItem('myOrders'))[22].shippingAddress;
    const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));

    const navigate = useNavigate();
    
    const orderDetails = useSelector(state => state.orderDetails);
    const {error, loading, order } = orderDetails

    const orderpay = useSelector(state => state.orderPay);
    const {loading: loadingPay, success: successPay} = orderpay
    
    const orderDeliver = useSelector(state => state.orderDeliver);
    const {loading: loadingDeliver, success: successDeliver, error: errorDeliver} = orderDeliver

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin


    useEffect(()=>{

        if(!userInfo){
            navigate('/login')
        }else{
            if(!order || successPay || order._id !== Number(orderId) || successDeliver){
                dispatch(GetOrderDetails(orderId));
                dispatch({type: ORDER_PAY_RESET});
                dispatch({type: ORDER_DELIVER_RESET})
            }else if(!order.isPaid){
                if(!window.paypay){
                    addPayPalScript()
                }else{
                    setSdkReady(true)
                }

        }
       
}
   }, [order, orderId, dispatch, successPay, successDeliver, navigate, userInfo])

// replace sb with the client id created from paypal
const addPayPalScript = () => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://www.paypal.com/sdk/js?client-id=sb';
    script.async = true;
    script.onload = () => {
        setSdkReady(true);
    }
    document.body.appendChild(script)
}

// the paymentResult is what paypal returns
    const successPaymentHandler = (paymentResult) => {
        dispatch(PayOrder(orderId, paymentResult))
    }

    const deliverOrderHandler = () => {
        dispatch(DeliverOrder(order))
    }

    const orderProcessHandler = () => {
        navigate('/profile')
    }

  return ( <div>

        <h1>Order: {orderId}</h1>

        <Row>
            {loading && <Loader/>}
            {error && <Message variant="danger">{error}</Message>}
            <Col md={8}>
                <ListGroup>
                    {order && <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p> <b>Name:  </b>{order.user.name} </p>
                        <p> <b>Email:  </b><a href={`mailto:${order.user.email}`} >{order.user.email}</a> </p>
                        <p><b>Shipping: </b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.country} </p>

                        {order.isDelivered ? <Message variant="success">Delivered at: {order.paidAt.substring(0,10)} </Message> 
                                     : <Message variant="warning">Not Delivered</Message>
                        }
                    </ListGroup.Item>}

                   {order &&  <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p><b>Method: </b>{paymentMethod} </p>
                       {order.isPaid ? <Message variant="success">Paid at: {order.paidAt.substring(0,10)} </Message> 
                                     : <Message variant="warning">Not Paid</Message>
                        }
                    </ListGroup.Item>}

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                       {order && <ListGroup variant="flush">
                                {order.orderItems.map((item, index ) => <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}><Image src={item.image} alt={item.name} fluid rounded/></Col>
                                        <Col md={4}>{item.qty} X ${item.price} = ${(item.qty * item.price).toFixed(2)}</Col>
                                    </Row>
                                </ListGroup.Item>)}
                            </ListGroup>
                            }
                    </ListGroup.Item>

                </ListGroup>

            </Col>
            <Col md={4}>
                <Card>
                    <ListGroup  variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items: </Col>
                                <Col>${order && order.orderItems.reduce((acc, item) => acc + Number(item.price )* item.qty, 0).toFixed(2)}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                           {order &&  <Row>
                                <Col>Shipping: </Col>
                                <Col>${order.shippingPrice}</Col>
                            </Row>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                           {order &&  <Row>
                                <Col>Tax: </Col>
                                <Col>${order.taxPrice}</Col>
                            </Row>}
                        </ListGroup.Item>

                        <ListGroup.Item>
                           {order &&  <Row>
                                <Col>Total Price: </Col>
                                <Col>${order.totalPrice}</Col>
                            </Row>}
                        </ListGroup.Item>

                        
                    
                     
                    </ListGroup>

                    {/* Enter paypal component */}
                    {order && !order.isPaid &&  <>
                        <Button className="mt-3 btn-warning w-100" onClick={orderProcessHandler}>Paypal</Button>
                                <Button className="my-1 btn-danger w-100">Paypal</Button>
                                <Button className="my-1 btn-success w-100">Paypal</Button>
                    </>}


                    {loadingDeliver && <Loader/> }
                    {errorDeliver && <Message>{errorDeliver}</Message>}

                        { order && userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && 
                        <ListGroup.Item>
                            <Button 
                                type="button"

                                // className="my-1 btn-success w-100" 
                                className="my-3 py-3 btn btn-block" 
                                onClick={deliverOrderHandler}>Mark As Delivered</Button>
                        </ListGroup.Item>
                        }
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default React.memo(OrderScreen);