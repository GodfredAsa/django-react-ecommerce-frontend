import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import ListProducts from "../actions/ProductActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(ListProducts());
  }, []);

  return (
    <div>
      <h1 className="text-center my-3">Latest Products</h1>

      {/* Same as below */}
      {/* {loading ? <h2>Loading...</h2>
      
      : error ? <h2>{error}</h2>
      : <Row>
      {products.map((product) => (
        <Col sm="12" md="6" lg="4" xl="3" key={product._id}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
    } */}

      {loading && <Loader/>}
      {error && <Message variant="danger">{error}</Message>}
      {products && (
        <Row>
          {products.map((product) => (
            <Col sm="12" md="6" lg="4" xl="3" key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
