import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { updateProfileUserAPI } from "../api/user.api";
import { getUser } from "../redux/slice/userSlice";

export default function FormProfile({ userProfile, onClose }) {
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(userProfile?.photo || "");

  const profileInitialValues = {
    name: userProfile?.name || "",
    photo: null,
  };

  const profileValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    photo: Yup.mixed()
      .nullable()
      .test("fileSize", "File too large", (value) =>
        value ? value.size <= 5 * 1024 * 1024 : true
      )
      .test("fileType", "Unsupported file type", (value) =>
        value
          ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          : true
      ),
  });

  const handleProfileSubmit = async (values) => {
    try {
      const res = await updateProfileUserAPI(values);
      dispatch(getUser(res));
      toast.success("Updated profile successfully!");
      onClose();
    } catch (error) {
      toast.error("Update profile failed!");
    }
  };

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
      style={{ background: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="bg-white p-4 rounded shadow" style={{ width: "400px" }}>
        <h4 className="mb-3">Update Profile</h4>
        <Formik
          initialValues={profileInitialValues}
          validationSchema={profileValidationSchema}
          onSubmit={handleProfileSubmit}
        >
          {({ setFieldValue }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Name</label>
                <Field name="name" className="form-control" />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="text-danger small"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Avatar</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    setFieldValue("photo", file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => setPreview(reader.result);
                      reader.readAsDataURL(file);
                    } else {
                      setPreview("");
                    }
                  }}
                />
                <ErrorMessage
                  name="photo"
                  component="div"
                  className="text-danger small"
                />
                {preview && (
                  <div className="mt-2 text-center">
                    <img
                      src={preview}
                      alt="preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="d-flex justify-content-end gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
