import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch} from "react-redux";
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from "../components/FormContainer";
import {savePaymentMethod} from '../actions/CartActions'


const  PaymentScreen = () => {
    
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const [setPage] = useState('');


    const shippingInfo = JSON.parse(localStorage.getItem('shippingAddress'));

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const paymentChangeHandler = (e) => {
        setPaymentMethod(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');

    }


  return (
    <FormContainer>
        <CheckoutSteps/>
        <Form onSubmit={submitHandler}>

            <Form.Group>
                <Form.Label>Select Payment Method</Form.Label>
                <Col>
                    <Form.Check 
                        type="radio"
                        label="PayPal or Credit Card"
                        id="paypal"
                        name="paymentMethod"
                        checked
                        onChange={paymentChangeHandler}
                        >

                    </Form.Check>
                </Col>
            </Form.Group>

            <Button type="submit" variant="info">Continue</Button>

        </Form>
    </FormContainer>
  )
}

export default PaymentScreen