import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div>
        <div className="h1">404 - Page Not Found</div>
        <div className="text-center">
          <Link to="/" className="text-decoration-none h5 text-info">
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
