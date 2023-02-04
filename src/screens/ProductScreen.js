import { useEffect, useState } from "react";

import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Review from "../components/Review";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetails } from "../actions/ProductDetailsAction";
import { CreateProductReview } from "../actions/ProductActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/ProductConstants" ;


const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productId = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createProductReview = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingProductReview,
    error: errorProductReview,
    success: successProductReview,
  } = createProductReview;

  useEffect(() => {
    if(successProductReview){
      setRating(0);
      setComment("");
      dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
    }
    dispatch(ProductDetails(productId));
  }, [dispatch, productId, successProductReview]);

  const addToCartHandler = () => {
    localStorage.setItem("qty", qty);
    navigate(`/cart/${productId}?qty=${qty}`);
  };
  const qtyChangeHandler = (e) => {
    setQty(e.target.value);
  };

  const ratingChangeHandler = e => {
    setRating(e.target.value) 
  }

  const commentChangeHandler = e =>{
    setComment(e.target.value);
  }

  const addProductReviewSubmitHandler = e =>{
    e.preventDefault();
   dispatch(CreateProductReview(
       productId,
        {rating,
        comment}
    ))
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {product && (
        <div>
        <Row>
          <Col md={3}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={5}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Review
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                  color={"#f8e825"}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              Description: {product.description}
              <ListGroup.Item></ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price: </Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status: </Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col xs="auto" className="my-1">
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={qtyChangeHandler}
                        >
                          {/* display qty based of number in stock  */}

                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option value={x + 1} key={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        {/* Product Review Row  */}

        <Row>

          <Col md={6}>
            <h4>Reviews</h4>
            {product.reviews.length === 0 && <Message variant="info">No Reviews</Message>}
           
            <ListGroup variant="flush">
              {product.reviews.map((review) => 
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Review value={review.rating} color='#f8e825'/>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.commnet}</p>
                  </ListGroup.Item>
              )}

              <ListGroup.Item>

                <h4>Add a review </h4>

                {loadingProductReview && <Loader/>}
                {successProductReview && <Message variant="success">Review Submitted</Message>}
                {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}

                { userInfo ? <Form onSubmit={addProductReviewSubmitHandler}>

                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control 
                        as='select'
                        value={rating}
                        className = 'py-2 mb-3'
                        onChange={ratingChangeHandler}
                        >
                          <option value="">Select Rating</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option> 
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group controlId="comment">
                    <Form.Label>Review</Form.Label>
                    <Form.Control
                        as='textarea'
                        rows="3"
                        placeholder="pls write your comment"
                        value={comment}
                        onChange = {commentChangeHandler}
                    >

                    </Form.Control>
                  </Form.Group>

                  <Button 
                      type="submit"
                      className="my-4 w-100"
                      disabled = {loadingProductReview}
                      >Submit</Button>

                </Form> : 
                <Message variant="info">Please <Link to='/login'>Login</Link> to Write a Review </Message>}
              </ListGroup.Item>
            </ListGroup>
          </Col> 

        </Row>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
