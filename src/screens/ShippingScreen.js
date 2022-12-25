import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch} from "react-redux";
import {saveShippingAddress} from '../actions/CartActions'
import FormContainer from "../components/FormContainer";

const ShippingScreen = () => {

  const shippingInfo = JSON.parse(localStorage.getItem('shippingAdress'));

  const [address, setAddress] = useState(shippingInfo ? shippingInfo.address : '');
  const [city, setCity] = useState(shippingInfo ? shippingInfo.city : '');
  const [postalCode, setPostalCode] = useState(shippingInfo ? shippingInfo.postalCode : '');
  const [country, setCountry] = useState(shippingInfo ? shippingInfo.country : '');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addressChangeHandler = (e) => {
    setAddress(e.target.value);
  }

  const cityChangeHandler = (e) => {
    setCity(e.target.value);
  }

  const postalCodeChangeHandler = (e) => {
    setPostalCode(e.target.value);
  }

  const countryChangeHandler = (e) => {
    setCountry(e.target.value);
  }

  const submitHandler = (e) => {
    e.preventDefault();

    const shippingData = {
      address,
      city,
      postalCode,
      country
    }
        dispatch(saveShippingAddress(shippingData));
        navigate('/payment')
  }

  return (
        <FormContainer>
            <h1>Shipping Information </h1>
            <Form onSubmit={submitHandler}>

            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control
                    required
                    value={address} 
                    type="text"
                    placeholder="Enter Address"
                    onChange={addressChangeHandler}>   
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control
                    required
                    value={city} 
                    type="text"
                    placeholder="Enter City"
                    onChange={cityChangeHandler}>   
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="postalCode">
                <Form.Label>Postal Code </Form.Label>
                <Form.Control
                    required
                    value={postalCode} 
                    type="text"
                    placeholder="Enter Postal Code "
                    onChange={postalCodeChangeHandler}>   
                </Form.Control>
            </Form.Group>

            <Form.Group controlId="country">
                <Form.Label>Country</Form.Label>
                <Form.Control
                    required
                    value={country} 
                    type="text"
                    placeholder="Enter Country "
                    onChange={countryChangeHandler}>   
                </Form.Control>
            </Form.Group>

            <Button type="submit" className=" w-100 my-3" variant="info">Continue</Button>


            </Form>

        </FormContainer>
    );
};

export default ShippingScreen;
