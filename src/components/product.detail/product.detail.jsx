import { useParams } from "react-router-dom";
import { currencyUSD } from "../../config/product.config";
import { objProducts } from "../../config/product.data";

const ProductDetail = () => {
  const { id } = useParams();
  let temp = id - 1;
  const data = [objProducts[temp]];

  return (
    <div className="container mt-3 mb-3">
      {data.map((item) => (
        <div className="row row-cols-1 row-cols-md-2 ms-3 me-3">
          <div className="col mt-0">
            <img className="img-fluid" src={item.image} alt="" />
          </div>
          <div className="col mt-0 mt-lg-2 p-3">
            <div className="h5 m-1 mt-4 mb-4 text-uppercase">{item.name}</div>
            <div className="h6 m-1 mt-4 mb-4">
              {currencyUSD.format(item.price)}
            </div>
            <div className="m-1 mt-4 mb-4 w-100 btn__opacity">
              <button className="w-100 p-2 border-1 border-black text-bg-dark">
                Add to cart
              </button>
            </div>
            <div className="m-1 mt-4 mb-4">
              <div className="h6 text-uppercase">decription</div>
              <div>{item.decription}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductDetail;
