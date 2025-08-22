import { useState } from "react";
import { currencyUSD } from "../utils/feature.common";

export default function OrderItem(props) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="table-responsive mt-2 mb-2">
      <table className="table table-borderless text-center align-middle">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Order Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
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
              <span className="fw-bold">{props.name}</span>
            </td>
            <td>{props.quantity}</td>
            <td>{currencyUSD.format(props.price)}</td>
            <td>{props.ordersAt}</td>
            <td>{props.status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
