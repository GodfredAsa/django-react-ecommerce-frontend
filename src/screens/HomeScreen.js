import { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import ListProducts from "../actions/ProductActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  useEffect(() => {
    dispatch(ListProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Latest Products</h1>
      {loading && <h2>Loading...</h2>}

      {error && <p>{error}</p>}
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
