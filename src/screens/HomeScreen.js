import { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Product from "../components/Product";
import {ListProducts} from "../actions/ProductActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useLocation } from "react-router-dom";
import Paginate from "../components/Paginate";
import ProductCarousal from "../components/ProductCarousal";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const keyword  = useLocation().search

  const productList = useSelector((state) => state.productList);
  const { error, loading, products, page, pages } = productList;

  useEffect(() => {
    dispatch(ListProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <div>
      {!keyword && <ProductCarousal/>}
      <h1 className="text-center my-3">Latest Products</h1>


      {loading ? <Loader/>
      
      : error ? <Message>{error}</Message>
      : 
      
     <div>
       <Row>
      {products.map((product) => (
        <Col sm="12" md="6" lg="4" xl="3" key={product._id}>
          <Product product={product} />
        </Col>
      ))}
    </Row>
    <Paginate page={page} pages={pages} keyword={keyword}/>
     </div>
    }
{/* 
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

      {products.length === 0 && <Container className="text-center my-5"><h3>No Products Available </h3></Container>} */}
    </div>
  );
};

export default HomeScreen;
