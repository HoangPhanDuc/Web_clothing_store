import { React, useEffect, useState } from "react";
// import { objProducts } from "../config/product.data";
import { currencyUSD } from "../config/product.config";
import Aos from "aos";
import "../assets/css/products.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase.config";

export default function Products() {
  const [product, SetProduct] = useState([]);
  const dataProduct = collection(db, "Product");

  const getDataProduct = async () => {
    try {
      const data = await getDocs(dataProduct);
      // console.log(data);
      const dataDoc = data.docs.map((data) => ({
        ...data.data(),
        id: data.id,
      }));
      SetProduct(dataDoc);
      // console.log(product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Aos.init({ duration: 1000 });
    Aos.refresh();
    getDataProduct();
  }, [product]);

  return (
    <div data-aos="slide-up" className="container w-100 mt-4 mb-4 w__products">
      <div className="h5 ms-3 title__lastest text-uppercase">
        lastest products
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {product.map((item) => (
          <div
            key={item.id}
            // onClick={() => handleOfClick(`/product-detail/${item.id}`)}
            className="col contain__products text-center m-0 mt-3 mb-3 p-0 pt-1 pb-1 w__products"
          >
            <div className="position-relative overflow-hidden">
              <img className="img-fluid" src={item.image} alt={item.name} />
              <div className="position-absolute btn__cart">
                <button className="border border-0 text-white bg-black">
                  {item.quantity > 0 ? "In stock" : "Out of stock"}
                </button>
              </div>
            </div>
            <div className="m-0 mt-1 p-0">
              <div>{item.name}</div>
              <div>{currencyUSD.format(item.price)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
