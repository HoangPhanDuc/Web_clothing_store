import React from "react";

export default function OrderItem() {
  return (
    <div className="row row-cols-2 row-cols-sm-4 mt-2 mb-2 d-flex justify-content-around text-center align-items-center">
      <div className="col img__cart d-flex align-items-center">
        <img className="img-fluid" src={props.image} alt="cartItem" />
        <div className="fw-bold">{props.name}</div>
      </div>
      <div className="col button__cart remove__product">
        <i
          onClick={() => props.decreaseQuantity()}
          className="fa-solid fa-minus me-1"
        ></i>
        <input
          className="border border-1 border-black"
          type="number"
          onChange={props.handleChange}
          value={props.quantity}
        />
        <i
          onClick={() => props.increaseQuantity()}
          className="fa-solid fa-plus ms-1"
        ></i>
      </div>
      <div className="col">{currencyUSD.format(props.price)}</div>
      <div className="col remove__product">
        <i class="fa-solid fa-trash"></i>
      </div>
    </div>
  );
}
