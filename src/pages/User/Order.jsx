import { useSelector } from "react-redux";
import OrderItem from "../../components/OrderItem";
import { formatDateVN } from "../../utils/feature.common";
import LoadingComponent from "../../components/LoadingComponent";

export default function Order() {
  const ordersList = useSelector((state) => state.ordersStore?.ordersItems);
  const loading = useSelector((state) => state.ordersStore?.loading);

  if (loading === true) return <LoadingComponent />;
  if (!loading && ordersList.lenght === 0) {
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <span className="h3">No items in orders</span>
    </div>;
  }

  return (
    <div style={{ minHeight: "90vh" }}>
      {ordersList.map((orderItem) =>
        orderItem.items.map((value, index) => (
          <OrderItem
            key={index}
            name={value.product.name}
            image={value.product.image}
            quantity={value.quantity}
            ordersAt={formatDateVN(orderItem.ordersAt)}
            status={orderItem.status}
            price={orderItem.totalPriceAddAt}
          />
        ))
      )}
    </div>
  );
}
