import { useNavigate } from "react-router-dom";
import { objProducts } from "../../config/product.data";
import { currencyUSD } from "../../config/product.config";
import { React, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import "./products.css";

const Products = () => {
  const handleOfClick = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1000 });
    Aos.refresh();
  }, []);

  return (
    <div data-aos="slide-up" className="container w-100 mt-4 mb-4 w__products">
      <div className="h5 ms-3 title__lastest text-uppercase">
        lastest products
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {objProducts.map((item) => (
          <div
            key={item.id}
            onClick={() => handleOfClick(`/product-detail/${item.id}`)}
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
};

export default Products;
