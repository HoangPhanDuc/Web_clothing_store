import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { currencyUSD } from "../utils/feature.common";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase.config";

export default function ProductDetail() {
  const { id } = useParams();
  const [oneProductsData, SetOneProductsData] = useState({});
  const oneProductCollectionRef = doc(db, "Product", id);

  const getOneProductDetail = async () => {
    try {
      const getOneProduct = await getDoc(oneProductCollectionRef);
      SetOneProductsData({ id: getOneProduct.id, ...getOneProduct.data() });
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async () => {
    try {
    } catch (error) {
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
          <div className="h6 m-1 mt-4 mb-4">
            {currencyUSD.format(oneProductsData.price)}
          </div>
          <div className="m-1 mt-4 mb-4 w-100 btn__opacity">
            <button className="w-100 p-2 border-1 border-black text-bg-dark">
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
