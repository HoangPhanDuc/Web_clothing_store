import { useState } from "react";
import { useSelector } from "react-redux";
import FormProfile from "../../components/FormProfile";

export default function MyProfile() {
  const userData = useSelector((state) => state.userStore);
  const [activeUpdate, setActiveUpdate] = useState(false);

  return (
    <>
      <div style={{ minHeight: "90vh" }} className="position-relative">
        <div className="h4 p-2 p-sm-4">My profile</div>
        <div className="position-absolute top-50 start-50 translate-middle">
          <div className="mt-2">Name: {userData.name}</div>
          <div className="mt-2">Email: {userData.email}</div>
          <div className="mt-2">
            Avatar:{" "}
            <img
              style={{ width: "95px", height: "95px" }}
              src={userData.photo}
              alt="avatar"
            />
          </div>
          <div className="mt-3 d-flex justify-content-end pe-2">
            <button
              onClick={() => setActiveUpdate(true)}
              className="btn btn-dark"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      {activeUpdate && (
        <FormProfile
          userProfile={userData}
          onClose={() => setActiveUpdate(false)}
        />
      )}
    </>
  );
}
