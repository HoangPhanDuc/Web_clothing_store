import React from "react";
import "../assets/css/footer.css"

export default function Footer() {
  return (
    <div className="container-fluid border border-1 border-black border-opacity-50 border-start-0 border-bottom-0 border-end-0">
      <div className="row row-cols-2 row-cols-sm-2 row-cols-lg-3">
        <div className="col p-3 ps-5">
          <div className="h6">CUSTOMER SERVICE</div>
          <ul className="list-unstyled ms-1 footer">
            <li>
              <a href="..">Shipping</a>
            </li>
            <li>
              <a href="..">Returns</a>
            </li>
            <li>
              <a href="..">Contact</a>
            </li>
          </ul>
        </div>
        <div className="col p-3 ps-5">
          <div className="h6">SHOPPING ONLINE</div>
          <ul className="list-unstyled ms-1 footer">
            <li>
              <a href="..">Privacy policy</a>
            </li>
            <li>
              <a href="..">Terms of service</a>
            </li>
            <li>
              <a href="..">Refund policy</a>
            </li>
          </ul>
        </div>
        <div className="col p-3 ps-5">
          <div className="h6">CONTACT</div>
          <ul className="list-unstyled ms-1 footer">
            <li>Email: hoangpd.21it@vku.udn.vn</li>
            <li>Call: +84 123456789</li>
          </ul>
        </div>
      </div>
      <div className="row text-center m-0 mt-1 mb-4">
        <div className="col">&copy; 2021-2023, C-Shop.com, Inc.</div>
      </div>
    </div>
  );
}
