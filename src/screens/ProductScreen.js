import { useEffect, useState } from "react";

import { Row, Col, Image, ListGroup, Button, Card, Form } from "react-bootstrap";
import { Link, useNavigate, useParams} from "react-router-dom";
import Review from "../components/Review";
import { useDispatch, useSelector } from "react-redux";
import { ProductDetails } from "../actions/ProductDetailsAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const productId = useParams().id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  useEffect(() => {
    dispatch(ProductDetails(productId));
  }, [dispatch, productId]);
  
  const addToCartHandler = () =>{
    localStorage.setItem("qty", qty)
    navigate(`/cart/${productId}?qty=${qty}`)
  } 
  const qtyChangeHandler = (e) => {
    setQty(e.target.value) 
  }

  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {product && (
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

                {product.countInStock > 0 && <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col xs = "auto" className="my-1">
                      <Form.Control 
                                as="select" 
                                value={qty} 
                                onChange={qtyChangeHandler}
                                >

                                  {/* display qty based of number in stock  */}

                                  {[...Array(product.countInStock).keys()].map(x => 
                                  <option value={x+1} key = {x+1}>
                                    {x+1}
                                  </option>)}


                      </Form.Control>  
                    </Col>

                  </Row>
                  </ListGroup.Item>}

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
      )}
    </div>
  );
};

export default ProductScreen;
