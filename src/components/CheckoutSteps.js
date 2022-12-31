import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({step1, step2, step3, step4}) => {
  return ( 
    <Nav className='justify-content-center mb-4' 
    style={{'backgroundColor': 'blue', 'borderRadius':'10px', 'height':'2.5rem'}}
    >

      {/* <CheckoutStage disabled={true}><Link  to='/login' ><span style={{'color': 'white'}}>Login</span> </Link></CheckoutStage>
      <CheckoutStage disabled={false}><Link  to='/shipping'><span style={{'color': 'white'}}>Shipping</span></Link></CheckoutStage>
      <CheckoutStage disabled={false}><Link  to='/payment'><span style={{'color': 'white'}}>Payment</span></Link></CheckoutStage>
      <CheckoutStage disabled={false}><Link  to='/placeorder'>Place Order</Link></CheckoutStage> */}
        <Nav.Item>
           {step1 ? ( <LinkContainer to='/login'>  <Nav.Link>Login</Nav.Link></LinkContainer>): 
                    (<Nav.Link disabled style={{'color': 'white'}}>Login</Nav.Link>)}
        </Nav.Item>

        <Nav.Item>
           {step2 ? ( <LinkContainer to='/shipping'> <Nav.Link style={{'color': 'white'}}>Shipping</Nav.Link></LinkContainer>) : 
                    (<Nav.Link disabled style={{'color': 'white'}}>shipping</Nav.Link>)}
        </Nav.Item>

        <Nav.Item>
           {step3 ? ( <LinkContainer to='/payment'> <Nav.Link>Payment</Nav.Link></LinkContainer>): 
                    (<Nav.Link disabled style={{'color': 'white'}}>payment</Nav.Link>)}
        </Nav.Item>

        <Nav.Item> 
            {step4 ? ( <LinkContainer to='/placeorder'> <Nav.Link>Place Order</Nav.Link> </LinkContainer>): 
            (<Nav.Link disabled ={false} style={{'color': 'white'}} to="/placeorder">Place Order</Nav.Link>)}
        </Nav.Item>
    </Nav>
   );
}
 
export default CheckoutSteps;