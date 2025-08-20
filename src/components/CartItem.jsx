import { useEffect, useState } from "react";
import { currencyUSD } from "../utils/feature.common";
import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  setQuantity,
  updateQuantityThunk,
} from "../redux/slice/cartSlice";

export default function CartItem(props) {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState(props.quantity);

  const handleBlurUpdateCart = (e) => {
    const q = parseInt(e.target.value) || 1;
    dispatch(updateQuantityThunk({ id: props.id, quantity: q }));
  };

  const handleIncrease = () => {
    const newQuantity = inputValue + 1;
    setInputValue(newQuantity);
    dispatch(increaseQuantity(props.id));
    dispatch(updateQuantityThunk({ id: props.id, quantity: newQuantity }));
  };

  const handleDecrease = () => {
    if (inputValue > 1) {
      const newQuantity = inputValue - 1;
      setInputValue(newQuantity);
      dispatch(decreaseQuantity(props.id));
      dispatch(updateQuantityThunk({ id: props.id, quantity: newQuantity }));
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setInputValue(value);
    dispatch(setQuantity({ id: props.id, quantity: value }));
  };

  useEffect(() => {
    setInputValue(props.quantity);
  }, [props.quantity]);

  return (
    <div className="table-responsive mt-2 mb-2">
      <table className="table text-center align-middle mb-0">
        <tbody>
          <tr>
            <td className="d-flex align-items-center justify-content-center flex-wrap">
              <img
                className="img-fluid me-2 mb-1"
                src={props.image}
                alt="cartItem"
                style={{ maxWidth: "50px", maxHeight: "50px" }}
              />
              <span className="fw-bold">{props.name}</span>
            </td>
            <td>
              <i
                onClick={handleDecrease}
                className="fa-solid fa-minus me-2"
                role="button"
              ></i>
              <input
                className="border border-1 border-black text-center"
                type="number"
                value={inputValue}
                min={1}
                style={{ width: "60px" }}
                onChange={handleChange}
                onBlur={handleBlurUpdateCart}
              />
              <i
                onClick={handleIncrease}
                className="fa-solid fa-plus ms-2"
                role="button"
              ></i>
            </td>
            <td>{currencyUSD.format(props.price)}</td>
            <td>
              <i
                className="fa-solid fa-trash text-danger"
                role="button"
                onClick={props.removeProduct}
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
