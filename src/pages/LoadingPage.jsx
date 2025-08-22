export default function LoadingPage() {
  return (
    <div
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center bg-light"
    >
      <div className="text-center">
        <div
          className="spinner-border text-primary mb-3"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mb-0">Loading, please wait...</p>
      </div>
    </div>
  );
}
