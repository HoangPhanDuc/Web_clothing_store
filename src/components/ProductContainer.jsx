import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slice/productsSlice";
import LoadingComponent from "./LoadingComponent";
import ProductsList from "./ProductList";

export default function ProductsContainer() {
  const dispatch = useDispatch();
  const { list, loading } = useSelector((state) => state.productStore);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <LoadingComponent />;

  if (!loading && list.length === 0) {
    return (
      <div
        style={{ minHeight: "inherit", width: "100%" }}
        className="d-flex justify-content-center align-items-center"
      >
        <span className="h3">Can not find products</span>
      </div>
    );
  }
  return <ProductsList list={list} />;
}
