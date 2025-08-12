import { useEffect } from "react";
import "../assets/css/products.css";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slice/productsSlice";
import Loading from "./Loading";

export default function Products() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.productStore);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <div className="container w-100 mt-4 mb-4 w_products">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {list.map((value, index) => (
          <Product
            key={index}
            id={value.id}
            name={value.name}
            image={value.image}
            quantity={value.quantity}
            price={value.price}
          />
        ))}
      </div>
    </div>
  );
}
