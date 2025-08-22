import { useNavigate } from "react-router-dom";
import { currencyUSD } from "../utils/feature.common";

export default function Product (props) {
  const navigate = useNavigate();

  const handleClickButton = async () => {
    navigate(`/product-detail/${props.id}`);
  };

  return (
    <div
      onClick={handleClickButton}
      className="col text-center m-0 mt-3 mb-3 p-0 pt-1 pb-1 contain__products w__products"
    >
      <div className="position-relative overflow-hidden">
        <img className="img-fluid" src={props.image} alt={props.name} />
        <div className="position-absolute btn__cart">
          <button className="border border-0 text-white bg-black">
            {props.quantity > 0 ? "In stock" : "Out of stock"}
          </button>
        </div>
      </div>
      <div className="m-0 mt-1 p-0">
        <div>{props.name}</div>
        <div>{currencyUSD.format(props.price)}</div>
      </div>
    </div>
  );
}
