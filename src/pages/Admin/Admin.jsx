import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  addProductAdminAPI,
  deleteProductAdminAPI,
  fetchProductsAPI,
  updateProductAdminAPI,
} from "../../api/product.api";
import FormProduct from "../../components/FormProduct";
import { currencyUSD } from "../../utils/feature.common";

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const getDataProduct = async () => {
    try {
      const data = await fetchProductsAPI();
      setProducts(data);
    } catch (error) {
      toast.error("Error when loading data!");
    }
  };

  const deleteProductData = async (id) => {
    try {
      const deleted = await deleteProductAdminAPI(id);
      if (deleted) {
        toast.success("Deleted product seccessfully!");
        setProducts((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (error) {
      toast.error("Error deleted product!");
    }
  };

  useEffect(() => {
    getDataProduct();
  }, []);

  return (
    <div className="container-fluid">
      <div className="h3 text-center mt-3 mb-2">Admin</div>
      <div className="text-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => {
            setSelectedProduct(null);
            setShowForm(true);
          }}
        >
          + Add Product
        </button>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-bordered flex-wrap">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Feature</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item.id}>
                    <td className="d-flex align-items-center">
                      <img
                        className="img-fluid"
                        src={item.image}
                        alt="image"
                        style={{ width: "50px", height: "50px" }}
                      />
                      <div className="ms-3">{item.name}</div>
                    </td>
                    <td className="align-middle">{item.quantity}</td>
                    <td className="align-middle">
                      {currencyUSD.format(item.price)}
                    </td>
                    <td className="align-middle">
                      <button
                        className="btn btn-primary btn-sm me-1"
                        onClick={() => {
                          setSelectedProduct(item);
                          setShowForm(true);
                        }}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteProductData(item.id)}
                        className="btn btn-danger btn-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal Add / Update Product */}
      {showForm && (
        <FormProduct
          onClose={() => setShowForm(false)}
          initialData={selectedProduct}
          onSubmit={async (values, image, resetForm) => {
            try {
              if (selectedProduct) {
                const updated = await updateProductAdminAPI(
                  selectedProduct.id,
                  values,
                  image
                );
                toast.success("Product updated!");
                setProducts((prev) =>
                  prev.map((p) =>
                    p.id === selectedProduct.id
                      ? { ...p, ...values, image: updated.image || p.image }
                      : p
                  )
                );
              } else {
                const added = await addProductAdminAPI(values, image);
                toast.success("Product added!");
                setProducts((prev) => [...prev, added]);
              }
              resetForm();
              setShowForm(false);
              getDataProduct();
            } catch (error) {
              toast.error("Error something!");
            }
          }}
        />
      )}
    </div>
  );
}
