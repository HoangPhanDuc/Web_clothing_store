import { Route, Routes } from "react-router-dom";
import Home from "../components/home/home";
import Login from "../components/login/login";
import SignUp from "../components/sign-up/sign.up";
import Cart from "../components/cart/cart";
import ProductDetail from "../components/product.detail/product.detail";
import Products from "../components/products/products";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product-detail/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default App;
