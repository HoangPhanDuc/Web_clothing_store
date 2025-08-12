import React, { useState } from "react";
import "../../assets/css/cart.css";
import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem";

export default function Cart() {
  const [cartNumber, setCartNumber] = useState(1);
  const cartList = useSelector((state) => state.cartStore?.items);

  const handleChange = (e) => {
    if (parseInt(e.target.value) < 0) {
      setCartNumber(0);
    } else if (parseInt(e.target.value) > 20) {
      setCartNumber(20);
    } else setCartNumber(parseInt(e.target.value));
  };

  const increaseQuantity = () => {
    if (cartNumber < 20) {
      setCartNumber((cartNumber) => cartNumber + 1);
    } else return alert("quantity no more than current quantities");
  };

  const decreaseQuantity = () => {
    if (cartNumber > 0) {
      setCartNumber((cartNumber) => cartNumber - 1);
    } else return alert("quantity no less than 0");
  };

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="container w-100 mt-4 mb-4 contain__cart">
      <div className="h5 m-3 mt-4 mb-4">My cart</div>
      {cartList.map((cartItem, index) => (
        <CartItem
          key={index}
          id={cartItem.data.id}
          name={cartItem.data.name}
          image={cartItem.data.image}
          quantity={cartItem.data.quantity}
          price={cartItem.data.price}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          handleChange={handleChange}
        />
      ))}
      <div className="">Total price: </div>
      <div>
        <button className="btn btn-dark">Orders</button>
      </div>
    </div>
  );
}
