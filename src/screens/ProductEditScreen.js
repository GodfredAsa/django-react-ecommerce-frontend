
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetails } from "../actions/ProductDetailsAction";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import {Updateroduct} from '../actions/ProductActions'
import {PRODUCT_UPDATE_RESET} from '../constants/ProductConstants'

const ProductEditScreen = () => {
  const productId = useParams().id;
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [countInStock, setCountInStock] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.updateProduct);
  const { loading: updateLoading, error: updateError, updateSuccess } = productUpdate;

  useEffect(() => {
    if(updateSuccess){
      dispatch({type: PRODUCT_UPDATE_RESET})
      navigate('/admin/productlist')
    }else{
      if (!product.name || product._id !== Number(productId)) {
        dispatch(ProductDetails(productId));
      } else {
        setName(product.name);
        setBrand(product.brand);
        setPrice(product.price);
        setCategory(product.category);
        setDescription(product.description);
        setImage(product.image);
        setCountInStock(product.countInStock);
      }

    }
  
  }, [dispatch, setName, navigate, product, productId, updateSuccess]);

  const priceChangeHandler = (e) => {
    setPrice(e.target.value);
  };
  const categoryChangeHandler = (e) => {
    setCategory(e.target.value);
  };

  const brandChangeHandler = (e) => {
    setBrand(e.target.value);
  };

  const imageChangeHandler = (e) => {
    setImage(e.target.value);
  };

  const countInStockChangeHandler = (e) => {
    setCountInStock(e.target.value);
  };

  const nameChangeHandler = (e) => {
    setName(e.target.value);
  };

  const descriptionChangeHandler = (e) => {
    setDescription(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const updatedProduct = {
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
      }
    dispatch(Updateroduct(updatedProduct))
    navigate('/admin/productlist')




  };
  return (
    <div>
      <Link to="/admin/productlist">
        <Button variant="light" className="btn-sm bg-light text-dark">
          Go Back
        </Button>
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {updateLoading && <Loader/>}
        {updateError && <Message variant='danger'>{updateError}</Message>}
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {productId && (
          <Form onSubmit={submitHandler} className="my-5">
            <Form.Group controlId="name" className="my-5">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={name}
                type="name"
                placeholder="Enter Name"
                onChange={nameChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="price" className="my-5">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={price}
                type="number"
                placeholder="Enter price"
                onChange={priceChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="my-5">
              <Form.Label>Image</Form.Label>
              <Form.Control
                value={image}
                type="text"
                placeholder="Select image"
                onChange={imageChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category" className="my-5">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={category}
                type="text"
                placeholder="Enter category"
                onChange={categoryChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand" className="my-5">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                value={brand}
                type="text"
                placeholder="Enter brand"
                onChange={brandChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="countInStock" className="my-5">
              <Form.Label>Count in Stock</Form.Label>
              <Form.Control
                value={countInStock}
                type="number"
                placeholder="Enter count In Stock"
                onChange={countInStockChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="my-5">
              <Form.Label>Description</Form.Label>
              <Form.Control
                value={description}
                type="texarea"
                placeholder="Enter Brief Product Description"
                onChange={descriptionChangeHandler}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="info" className="my-3 w-100 ">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </div>
  );
};

export default ProductEditScreen;

