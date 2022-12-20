import Footer from "./components/Footer";
import Header from "./components/Header";
import HomeScreen from "./screens/HomeScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import { Container } from "react-bootstrap";
import CartScreen from "./screens/CartScreen";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen />} exact />
            <Route path="/product/:id" element={<ProductScreen />} />
            {/* pattern /cart/:id means the id is optional  */}
            {/* implements multiple routes in a nested format */}
            <Route path="/">
              <Route path="cart/:id" element={<CartScreen />} />
              <Route path="cart" element={<CartScreen />} />
            </Route>

          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
