import React from "react";
import { useSelector } from "react-redux";
import OrderItem from "../../components/OrderItem";
import { formatDateVN } from "../../utils/feature.common";

export default function Order() {
  const ordersList = useSelector((state) => state.ordersStore?.ordersItems);

  return (
    <div style={{ minHeight: "95vh" }}>
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
