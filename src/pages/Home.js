import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Products from "../components/Products";
import Aos from "aos";
import image from "../assets/images/z4565776997543_f3cf877e67bd209a09c33499be8247d6.jpg";
import imgleft from "../assets/images/winter_clothes_google_ppt_templates_676232.jpg";
import imgright from "../assets/images/pritika-swarup-wearing-a-brown-blusa-white-shoes-and-black-news-photo-1672741251.jpg";

export default function Home() {
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
}
