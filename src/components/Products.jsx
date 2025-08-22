import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/products.css";
import { fetchProducts } from "../redux/slice/productsSlice";
import LoadingComponent from "./LoadingComponent";
import Product from "./Product";

export default function Products() {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector((state) => state.productStore);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  if (loading) return <LoadingComponent />;
  if (error) return <Error />;

  return (
    <div className="container w-100">
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
