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
            {/* Qtn mark ? behind the id makes the ID option incase cart is clicked directly */}
            <Route path="/cart/:id?" element={<CartScreen/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
