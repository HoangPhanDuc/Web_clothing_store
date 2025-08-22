export default function QuantityControl({
  value,
  min = 1,
  onIncrease,
  onDecrease,
  onChange,
  onBlur,
}) {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <button
        className="btn btn-outline-dark p-0"
        style={{
          width: "32px",
          height: "26px",
          lineHeight: "24px",
          fontSize: "14px",
        }}
        onClick={onDecrease}
      >
        -
      </button>
      <input
        className="text-center mx-2 border border-1 border-dark rounded-1"
        type="number"
        value={value}
        min={min}
        style={{ width: "60px", height: "26px", fontSize: "14px" }}
        onChange={onChange}
        onBlur={onBlur}
      />
      <button
        className="btn btn-outline-dark p-0"
        style={{
          width: "32px",
          height: "26px",
          lineHeight: "24px",
          fontSize: "14px",
        }}
        onClick={onIncrease}
      >
        +
      </button>
    </div>
  );
}
