import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  decreaseQuantity,
  deleteCartThunk,
  increaseQuantity,
  setQuantity,
  updateQuantityThunk,
} from "../redux/slice/cartSlice";
import { currencyUSD } from "../utils/feature.common";
import QuantityControl from "./QuantityControl";

export default function CartItem(props) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(props.quantity);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleBlurUpdateCart = (e) => {
    const q = parseInt(e.target.value) || 1;
    dispatch(updateQuantityThunk({ id: props.id, quantity: q }));
  };

  const handleIncrease = () => {
    if (condition) {
      const newQuantity = inputValue + 1;
      setInputValue(newQuantity);
      dispatch(increaseQuantity(props.id));
      dispatch(updateQuantityThunk({ id: props.id, quantity: newQuantity }));
    }
  };

  const handleDecrease = () => {
    if (inputValue > 1) {
      const newQuantity = inputValue - 1;
      setInputValue(newQuantity);
      dispatch(decreaseQuantity(props.id));
      dispatch(updateQuantityThunk({ id: props.id, quantity: newQuantity }));
    } else toast.error("Quantity no less than 1!");
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setInputValue(value);
    dispatch(setQuantity({ id: props.id, quantity: value }));
  };

  const handleDeleteItem = () => {
    dispatch(deleteCartThunk(props.id));
  };

  useEffect(() => {
    setInputValue(props.quantity);
  }, [props.quantity]);

  return (
    <div className="table-responsive mt-2 mb-2">
      <table className="table text-center align-middle">
        <tbody>
          <tr>
            <td className="d-flex align-items-center justify-content-center flex-wrap">
              <div
                className="position-relative"
                style={{ width: "50px", height: "50px" }}
              >
                {!imgLoaded && (
                  <div className="bg-secondary w-100 h-100 placeholder-glow" />
                )}
                <img
                  className="img-fluid me-2 mb-1"
                  src={props.image}
                  alt="cartItem"
                  style={{
                    maxWidth: "50px",
                    maxHeight: "50px",
                    display: imgLoaded ? "block" : "none",
                  }}
                  onLoad={() => setImgLoaded(true)}
                />
              </div>
              <span className="fw-bold ms-2">{props.name}</span>
            </td>
            <td>
              <QuantityControl
                value={inputValue}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onChange={handleChange}
                onBlur={handleBlurUpdateCart}
              />
            </td>
            <td>{currencyUSD.format(props.price)}</td>
            <td>
              <i
                className="fa-solid fa-trash text-danger"
                role="button"
                onClick={handleDeleteItem}
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
