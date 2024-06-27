import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db, imageDB } from "../config/firebase.config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Admin() {
  const [dataAddProduct, setDataAddProduct] = useState({});
  const dataProduct = collection(db, "Product");
  const [image, setImage] = useState(null);
  const [product, SetProduct] = useState([]);

  const takeDataFromForm = (e) => {
    const { name, value } = e.target;
    setDataAddProduct((prev) => ({ ...prev, [name]: value }));
  };

  const takeImageFromForm = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const getDataProduct = async () => {
    try {
      const data = await getDocs(dataProduct);
      const dataDoc = data.docs.map((data) => ({
        ...data.data(),
        id: data.id,
      }));
      SetProduct(dataDoc);
    } catch (error) {
      console.log(error);
    }
  };

  const submitDataToFirebase = async (e) => {
    e.preventDefault();
    if (!image) {
      alert("Please select an image!");
      return;
    }
    try {
      const imageRef = ref(imageDB, `${image.name}`);
      await uploadBytes(imageRef, image);
      // get url image
      const urlImage = await getDownloadURL(imageRef);
      const dataWithImage = { ...dataAddProduct, image: urlImage };
      await setDoc(doc(dataProduct), dataWithImage);
      alert("Add product successful!");
    } catch (error) {
      console.error(error);
      alert("Failed to add product!");
    }
  };

  const deleteDataFirebase = (id) => {
    const item = doc(db, "Product", id);
    deleteDoc(item);
  };

  useEffect(() => {
    getDataProduct();
  }, [product]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-8">
          <div className="table-responsive">
            <table className="table table-striped table-hover table-borderless table-primary align-middle">
              <thead className="table-light">
                <tr>
                  <th>name</th>
                  <th>feature</th>
                </tr>
              </thead>
              <tbody>
                {product.map((item, index) => (
                  <tr className="table-primary">
                    <td>{item.name}</td>
                    <td>
                      <button
                        onClick={() => deleteDataFirebase(item.id)}
                        className="btn btn-danger"
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
        <div className="col-4">
          <h4 className="text-center">Add product</h4>
          <form onSubmit={submitDataToFirebase}>
            <div className="box-input">
              <label htmlFor="">Name</label>
              <input
                onChange={(e) => takeDataFromForm(e)}
                type="text"
                name="name"
                placeholder="name"
              />
            </div>
            <div className="box-input">
              <label htmlFor="">Price</label>
              <input
                onChange={(e) => takeDataFromForm(e)}
                type="number"
                name="price"
                placeholder="price"
              />
            </div>
            <div className="box-input">
              <label htmlFor="">Quantity</label>
              <input
                onChange={(e) => takeDataFromForm(e)}
                type="number"
                name="quantity"
                placeholder="quantity"
              />
            </div>
            <div className="box-input">
              <label htmlFor="">Decription</label>
              <input
                onChange={(e) => takeDataFromForm(e)}
                type="text"
                name="decription"
                placeholder="decription"
              />
            </div>
            {/* add image */}
            <div className="">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={takeImageFromForm}
              />
            </div>
            <div className="text-center">
              <button type="submit">Add product</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
