import { useState } from "react";
import { currencyUSD } from "../../config/product.config";
import image from "../../images/ao-so-mi-den-tron-774x1024.jpg";
import "./cart.css";

const Cart = () => {
  const [cartNumber, setCartNumber] = useState(1);

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

  return (
    <div className="container w-100 mt-4 mb-4 contain__cart">
      <div className="h5 m-3 mt-4 mb-4">My cart</div>
      <div className="row row-cols-2 row-cols-sm-4 mt-2 mb-2 d-flex justify-content-around text-center align-items-center">
        <div className="col img__cart d-flex align-items-center">
          <img className="img-fluid" src={image} alt="" />
          <div className="fw-bold">T-shirt men</div>
        </div>
        <div className="col button__cart remove__product">
          <i onClick={decreaseQuantity} className="fa-solid fa-minus me-1"></i>
          <input
            className="border border-1 border-black"
            type="number"
            onChange={handleChange}
            value={cartNumber}
          />
          <i onClick={increaseQuantity} className="fa-solid fa-plus ms-1"></i>
          {console.log(cartNumber)}
        </div>
        <div className="col">{currencyUSD.format(1234)}</div>
        <div className="col remove__product">
          <i className="fa-solid fa-x"></i>
        </div>
      </div>
    </div>
  );
};

export default Cart;
