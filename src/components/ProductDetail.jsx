import { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { currencyUSD } from "../utils/feature.common";
import { useSelector } from "react-redux";
import { addToCartAPI } from "../services/cartService";
import { toast } from "react-toastify";
import { getOneProductAPI } from "../services/productService";

export default function ProductDetail() {
  const { id } = useParams();
  const [oneProductsData, SetOneProductsData] = useState({});
  const userId = useSelector((state) => state.userStore.id);
  const [myCartData, setMyCartData] = useState({});
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userStore?.accessToken);

  const getOneProductDetail = async () => {
    try {
      const oneProduct = await getOneProductAPI(id);
      SetOneProductsData(oneProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    try {
      if (!userData) {
        return navigate("/login");
      }
      const addToCart = await addToCartAPI(oneProductsData, userId);
      if (addToCart) {
        toast.success("Added to cart successful!");
      }
    } catch (error) {
      toast.error("Added to cart failed!");
      console.log(error);
    }
  };

  useEffect(() => {
    getOneProductDetail();
  }, []);

  return (
    <div className="container mt-3 mb-3">
      <div className="row row-cols-1 row-cols-md-2 ms-3 me-3">
        <div className="col mt-0">
          <img className="img-fluid" src={oneProductsData.image} alt="" />
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
