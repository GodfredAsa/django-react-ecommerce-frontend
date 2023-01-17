import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {Button, Row, Col, Image, Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector} from "react-redux";
import CheckoutSteps from '../components/CheckoutSteps';
import Message from "../components/Message";
import {CreateOrder} from '../actions/OrderActions'
import {ORDER_CREATE_RESET} from '../constants/OrderConstants'


const  PlaceOrderScreen = () => {
    const orderCreate = useSelector(state => state.orderCreate);
    const {order, error, success} = orderCreate

    const shippingInfo = JSON.parse(localStorage.getItem('shippingAddress'));
    const paymentMethod = JSON.parse(localStorage.getItem('paymentMethod'));
   
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    cart.itemsPrice = cart.cartItems.reduce((acc, item)=> acc + item.price * item.qty, 0);
    cart.shippingPrice = cart.shippingPrice = (cart.itemsPrice > 100 ? 10 : 0).toFixed(2);
    cart.taxPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty * 0.05, 0).toFixed(2);
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice);
    
    if(!paymentMethod){
        navigate('/payment')
    }

    useEffect(()=> {
        if(success){
            dispatch({type: ORDER_CREATE_RESET});
            navigate(`/orders/${order._id}`)
        }


    }, [success, navigate, order, dispatch])


    const placeOrderHandler = () => {
        const newOrder = {
            orderItems: cart.cartItems,
            shippingAddress: shippingInfo,
            paymentMethod: paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }
       dispatch(CreateOrder(newOrder))
    }

  return (
    <div>
        <CheckoutSteps/>
        <Row>
            <Col md={8}>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><b>Shipping: </b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.country} </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p><b>Method: </b>{paymentMethod} </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                       {cart.cartItems.length === 0 ? 
                            <Message variant="info">Your Cart is Empty </Message> : 
                            <ListGroup variant="flush">
                                {cart.cartItems.map((item, index ) => <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}><Image src={item.image} alt={item.name} fluid rounded/></Col>
                                        <Col><Link to={`/product/${item.product}`}>{item.name}</Link></Col>
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
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping: </Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax: </Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total Price: </Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item>

                        <ListGroup.Item>
                           <Button 
                                variant="info" 
                                className="w-100" type="button"
                                onClick={placeOrderHandler} 
                                disabled={cart.cartItems.length === 0}>Place Order
                            
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </div>
  )
}

export default PlaceOrderScreen