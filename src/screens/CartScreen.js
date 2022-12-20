import { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import Message from "../components/Message";
import {AddToCart, RemoveFromCart} from "../actions/CartActions";


const CartScreen = () => {
  const productId = useParams().id;
  const qty = localStorage.getItem("qty");
  const navigate = useNavigate();

  const dispatch = useDispatch();
  //    get cartItems set in local storage from the store
  const cart = useSelector((state) => state.cart);
  //    destructuring cartItems to obtain the items in the cart
  const { cartItems } = cart;

  useEffect(() => {
    if(productId) {
      dispatch(AddToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

    const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price) *  Number(item.qty), 0).toFixed(2);
    const numberOfItems = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);

  const removeFromCartHandler = (id) => {
   dispatch(RemoveFromCart(id));
  };

  const proceedToCheckoutHandler = () =>{
    // redirecting to the shipping page 
    navigate('/login?redirect=shipping')
    console.log("checking out ")
  }

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message variant="info">
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>

                    <Image
                      src={item.image}
                      alt={item.name}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
   
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={1}> ${item.price}</Col>

                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(AddToCart(item.product, e.target.value))
                      }
                      // my approach below
                      // onChange={(e) => addingItemToCartHandler(item.product, e)}
                    >
                      {/* display qty based of number in stock  */}

                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>

                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>


      <Col md={4}>
        <Card>
            <ListGroup variant="flush">
                <ListGroup.Item>
                    <h2 style={{"padding": "0.5rem 0"}}>Subtotal: {numberOfItems} items</h2>
                    <h2 style={{"padding": "0.5rem 0", "fontSize": "1.5rem"}}>Cost: <span style={{"color": "cornflowerblue"}}>${totalPrice}</span></h2>
                </ListGroup.Item>

                <ListGroup.Item>
                    <Button 
                        type="button" 
                        style={{"width": "100%"}}
                        disabled={cartItems.length === 0} 
                        onClick={proceedToCheckoutHandler}>Proceed to Checkout
                    </Button>
                </ListGroup.Item>

            </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
