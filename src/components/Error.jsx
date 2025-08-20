export default function Error() {
  return (
    <div
      style={{ height: "90vh" }}
      className="d-flex justify-content-center align-items-center bg-light"
    >
      <div
        className="alert alert-danger shadow-lg text-center p-4"
        style={{ maxWidth: "500px", width: "100%" }}
      >
        <h2 className="mb-3">Oops! Something went wrong</h2>
        <p className="mb-4">Please try again later or contact support.</p>
        <a href="/" className="btn btn-danger">
          Go Home
        </a>
      </div>
    </div>
  );
}
