import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, imageDB } from "../../config/firebase.config";
import { ref, deleteObject } from "firebase/storage";
import { toast } from "react-toastify";
import FormProduct from "../../components/FormProduct";

export default function Admin() {
  const dataProduct = collection(db, "Product");
  const [product, setProduct] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  const getDataProduct = async () => {
    try {
      const data = await getDocs(dataProduct);
      const dataDoc = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setProduct(dataDoc);
    } catch (error) {
      toast.error("Lỗi khi tải dữ liệu!");
    }
  };

  const deleteProductData = async (id) => {
    try {
      const docRef = doc(db, "Product", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.imagePath) {
          const imageRef = ref(imageDB, data.imagePath);
          await deleteObject(imageRef);
        }
        await deleteDoc(docRef);
        toast.success("Đã xoá sản phẩm");
        getDataProduct();
      } else {
        toast.warn("Sản phẩm không tồn tại");
      }
    } catch (error) {
      toast.error("Lỗi khi xoá sản phẩm!");
    }
  };

  useEffect(() => {
    getDataProduct();
  }, [product]);

  return (
    <div className="container-fluid">
      <div className="h3 text-center mt-2 mb-3">Manage Products</div>
      <div className="text-end mb-3">
        <button
          className="btn btn-success"
          onClick={() => setShowAddForm(true)}
        >
          + Add Product
        </button>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Feature</th>
                </tr>
              </thead>
              <tbody>
                {product.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button className="btn btn-primary btn-sm me-1">
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

      {/* Modal Add Product */}
      {showAddForm && (
        <FormProduct
          onClose={() => setShowAddForm(false)}
          refreshData={getDataProduct}
        />
      )}
    </div>
  );
}
