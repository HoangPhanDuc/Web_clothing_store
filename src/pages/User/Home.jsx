import { useNavigate } from "react-router-dom";
import imgRight from "../../assets/images/pritika-swarup-wearing-a-brown-blusa-white-shoes-and-black-news-photo-1672741251.jpg";
import imgLeft from "../../assets/images/winter_clothes_google_ppt_templates_676232.jpg";
import image from "../../assets/images/z4565776997543_f3cf877e67bd209a09c33499be8247d6.jpg";
import Products from "../../components/Products";
import PRSection from "../../components/PRSection";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid p-0">
      {/* Banner */}
      <div className="w-100 d-none d-md-block position-relative overflow-hidden home-banner">
        <div className="position-absolute top-50 start-50 translate-middle text-center text-white">
          <div
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="0"
            className="h3 text-uppercase mb-3"
          >
            clothes shop
          </div>
          <button
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            onClick={() => navigate("/products")}
            className="btn btn-dark text-uppercase px-4 py-2"
          >
            Shop now
          </button>
        </div>
        <img className="img-fluid w-100" src={image} alt="main banner" />
      </div>

      {/* PR Sections */}
      <div className="vh-100">
        <PRSection
          title="Fashionable"
          image={imgLeft}
          content="Modern fashion, suitable for all styles and ages."
          reverse={false}
        />
      </div>
      <div className="vh-100">
        <PRSection
          title="Professional"
          image={imgRight}
          content="Product and service quality is guaranteed at the highest level."
          reverse={true}
        />
      </div>

      {/* Product list */}
      <div className="mt-4 mb-4">
        <div className="h4 ms-2 ms-sm-5" data-aos="zoom-in-right">
          New products
        </div>
        <div data-aos="fade-down-right">
          <Products />
        </div>
      </div>
    </div>
  );
}
