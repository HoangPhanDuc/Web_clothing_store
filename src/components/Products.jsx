import { React, useEffect } from "react";
import "../assets/css/products.css";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase.config";
import Product from "./Product";
import { useDispatch, useSelector } from "react-redux";
import { setProductsList } from "../redux/slice/productsSlice";

export default function Products() {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.productStore);
  const productCollectionRef = collection(db, "Product");

  const getDataProduct = async () => {
    try {
      const queryProducts = await getDocs(productCollectionRef);
      const productData = queryProducts.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(setProductsList(productData));
    } catch (error) {
      console.log("Errol get data products: ", error);
    }
  };

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <div className="container w-100 mt-4 mb-4 w__products">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {product.map((value, index) => (
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
