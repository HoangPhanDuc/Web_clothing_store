import Products from "../products/products";
import { useNavigate } from "react-router-dom";
import { React, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import image from "../../images/z4565776997543_f3cf877e67bd209a09c33499be8247d6.jpg";
import imgleft from "../../images/winter_clothes_google_ppt_templates_676232.jpg";
import imgright from "../../images/pritika-swarup-wearing-a-brown-blusa-white-shoes-and-black-news-photo-1672741251.jpg";

const Home = () => {
  const handleOfClick = useNavigate();

  useEffect(() => {
    Aos.init({ duration: 1500 });
    Aos.refresh();
  }, []);

  return (
    <div className="container-fluid mb-3">
      <div className="w-100 d-none d-md-block position-relative overflow-hidden">
        <div
          data-aos="fade-up"
          className="position-absolute top-0 end-0 m-1 mt-3 me-4"
        >
          <button
            onClick={() => handleOfClick("/login")}
            className="border border-0 border-black bg-dark text-white rounded-4 m-2 p-1 ps-3 pe-3"
          >
            Login
          </button>
          <button
            onClick={() => handleOfClick("/sign-up")}
            className="border border-0 border-black bg-dark text-white rounded-4 m-2 p-1 ps-3 pe-3"
          >
            Sign up
          </button>
        </div>
        <div
          data-aos="fade-up"
          className="position-absolute top-50 start-50 translate-middle"
        >
          <div className="text-uppercase text-white mb-3 h3 text-center">
            clothes shop
          </div>
          <div className="text-center">
            <button
              onClick={() => handleOfClick("/products")}
              className="text-uppercase text-white bg-black border border-0 p-2 ps-4 pe-4"
            >
              shop now
            </button>
          </div>
        </div>
        <div className="object-fit-cover home__silder">
          <img className="img-fluid" src={image} alt="" />
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-2 m-3 mt-3 mt-sm-5 mb-5">
        <div className="col mt-0 mt-sm-0" data-aos="fade-up-left">
          <div className="w-100">
            <div className="h3 float-start">Fashionable</div>
          </div>
          <div className="w-100 d-flex align-items-center flex-row">
            <div className="round__homeimage">
              <img src={imgleft} alt="" />
            </div>
            <div className="ms-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              repellat, non nulla expedita perspiciatis asperiores sunt delectus
              accusantium numquam laboriosam?
            </div>
          </div>
        </div>
        <div className="col mt-3 mt-sm-0" data-aos="fade-up-right">
          <div className="w-100">
            <div className="h3 float-end">Professional</div>
          </div>
          <div className="w-100 d-flex align-items-center flex-row-reverse">
            <div className="float-end round__homeimage">
              <img src={imgright} alt="" />
            </div>
            <div className="ms-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
              repellat, non nulla expedita perspiciatis asperiores sunt delectus
              accusantium numquam laboriosam?
            </div>
          </div>
        </div>
      </div>
      <Products />
    </div>
  );
};

export default Home;
