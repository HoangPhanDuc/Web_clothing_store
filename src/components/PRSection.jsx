import "../assets/css/prsection.css";

export default function PRSection({ title, image, content, reverse }) {
  return (
    <div className={`pr-section ${reverse ? "reverse" : ""}`}>
      <div
        className={`pr-image ${reverse ? "right" : "left"}`}
        data-aos={reverse ? "fade-left" : "fade-right"}
        data-aos-delay="100"
      >
        <img src={image} alt={title} />
      </div>
      <div className="pr-content" data-aos="fade-up" data-aos-delay="300">
        <h3 className="text-uppercase fw-bold">{title}</h3>
        <p>{content}</p>
      </div>
    </div>
  );
}
