import "../assets/css/loading-compoment.css";

export default function LoadingComponent() {
  const baseClass = "skeleton-base";

  return (
    <div style={{ height: "90vh" }}>
      <div
        className={baseClass}
        style={{ width: "100%", height: "100%", borderRadius: "12px" }}
      />
    </div>
  );
}
