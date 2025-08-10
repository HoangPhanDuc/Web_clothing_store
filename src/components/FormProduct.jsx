import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { setDoc, doc, collection } from "firebase/firestore";
import { db, imageDB } from "../config/firebase.config";
import { toast } from "react-toastify";

export default function FormProduct({ onClose, refreshData }) {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const dataProduct = collection(db, "Product");

  const handleAddProduct = async (values, resetForm) => {
    if (!image) {
      toast.warn("Please select an image.");
      return;
    }

    try {
      const imagePath = `images/${image.name}`;
      const imageRef = ref(imageDB, imagePath);
      await uploadBytes(imageRef, image);
      const imageURL = await getDownloadURL(imageRef);

      const dataWithImage = {
        ...values,
        image: imageURL,
        imagePath: imagePath,
      };

      await setDoc(doc(dataProduct), dataWithImage);
      toast.success("Product added successfully.");
      resetForm();
      setImage(null);
      setPreviewImage(null);
      refreshData();
      onClose();
    } catch (error) {
      toast.error("Failed to add product. Please try again.");
    }
  };

  // Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      quantity: "",
      decription: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required."),
      price: Yup.number()
        .typeError("Price must be a number.")
        .min(1, "Price must be greater than 0.")
        .required("Price is required."),
      quantity: Yup.number()
        .typeError("Quantity must be a number.")
        .min(1, "Quantity must be at least 1.")
        .required("Quantity is required."),
      decription: Yup.string().required("Description is required."),
    }),
    onSubmit: async (values, { resetForm }) => {
      await handleAddProduct(values, resetForm);
    },
  });

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
      style={{ zIndex: 1050 }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>
        <h5 className="text-center mb-3">Add Product</h5>
        <form onSubmit={formik.handleSubmit}>
          {["name", "price", "quantity", "decription"].map((field) => (
            <div className="mb-2" key={field}>
              <label className="form-label text-capitalize">{field}</label>
              <input
                type={
                  field === "price" || field === "quantity" ? "number" : "text"
                }
                name={field}
                min={field === "price" || field === "quantity" ? 1 : undefined}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values[field]}
                className={`form-control ${
                  formik.touched[field] && formik.errors[field]
                    ? "is-invalid"
                    : ""
                }`}
                placeholder={field}
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="invalid-feedback">{formik.errors[field]}</div>
              )}
            </div>
          ))}

          <div className="mb-3">
            <label className="form-label">Image</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setImage(file);
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
            />
          </div>

          {previewImage && (
            <div className="text-center mb-3">
              <img
                src={previewImage}
                alt="Preview"
                className="img-fluid"
                style={{ maxHeight: "90px", objectFit: "contain" }}
              />
            </div>
          )}

          <div className="d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setImage(null);
                setPreviewImage(null);
                onClose();
              }}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
