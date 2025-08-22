import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCartAPI } from "../../api/cart.api";
import { getOneProductAPI } from "../../api/product.api";
import QuantityControl from "../../components/QuantityControl";
import { currencyUSD } from "../../utils/feature.common";

export default function ProductDetail() {
  const { id } = useParams();
  const [oneProductsData, SetOneProductsData] = useState({});
  const userId = useSelector((state) => state.userStore.id);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userStore?.accessToken);

  const getOneProductDetail = async () => {
    try {
      const oneProduct = await getOneProductAPI(id);
      SetOneProductsData(oneProduct);
    } catch (error) {
      toast.error("Error get product!");
    }
  };

  const addToCart = async () => {
    try {
      if (!userData) {
        return navigate("/login");
      }
      const cartData = { ...oneProductsData, quantity: quantity };
      const addToCart = await addToCartAPI(cartData, userId);
      if (addToCart) {
        toast.success("Added to cart successful!");
      }
    } catch (error) {
      toast.error("Added to cart failed!");
    }
  };

  const handleIncreaseQuantity = () => {
    if (quantity < oneProductsData.quantity) {
      setQuantity((prev) => prev + 1);
    } else toast.error("Quantity no more than quantity of product!");
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    } else toast.error("Quantity no less than 1!");
  };

  useEffect(() => {
    getOneProductDetail();
  }, []);

  return (
    <div className="container mt-3 mb-3 vh-100">
      <div className="row row-cols-1 row-cols-md-2 ms-3 me-3">
        <div className="col mt-0">
          <img
            className="img-fluid"
            src={oneProductsData.image}
            alt="product"
          />
        </div>
        <div className="col mt-0 mt-lg-2 p-3">
          <div className="h5 m-1 mt-4 mb-4 text-uppercase">
            {oneProductsData.name}
          </div>
          <div className="col h6 m-1 mt-4 mb-4">
            Price: {currencyUSD.format(oneProductsData.price)}
          </div>
          <div className="m-1 mt-4 mb-4 w-100">
            In stock: {oneProductsData.quantity}
          </div>
          <div className="m-1 mt-4">
            <QuantityControl
              value={quantity}
              onIncrease={handleIncreaseQuantity}
              onDecrease={handleDecreaseQuantity}
            />
          </div>
          <div className="m-1 mt-4 mb-4 w-100 btn__opacity">
            <button
              onClick={() => addToCart()}
              className="w-100 p-2 border-1 border-black text-bg-dark"
            >
              Add to cart
            </button>
          </div>
          <div className="m-1 mt-4 mb-4">
            <div className="h6 text-uppercase">decription</div>
            <div>{oneProductsData.decription}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
