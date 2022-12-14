import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Review from "../components/Review";
import sendProducts from "../products";

const ProductScreen = () => {
  const param = useParams();

  const product = sendProducts().find((p) => p._id === param.id);
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>

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
                    text={`${product.numReviews} reviews`} color={'#f8e825'} 
                />
            </ListGroup.Item>

            <ListGroup.Item>
                Price: ${product.price}
            </ListGroup.Item>
                Description: {product.description}
            <ListGroup.Item>
               
            </ListGroup.Item>


          </ListGroup>
        </Col>

        <Col md={3}>
            <Card>

                <ListGroup variant="flush">

                    <ListGroup.Item>
                        <Row>
                            <Col>Price: </Col>
                            <Col><strong>${product.price}</strong> </Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col>Status: </Col>
                            <Col>{ product.countInStock>0 ? 'In Stock': 'Out of Stock'}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Button className="btn-block" type="button" disabled={product.countInStock === 0}>Add to Cart</Button>
                    </ListGroup.Item>

                </ListGroup>

            </Card>
          
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
