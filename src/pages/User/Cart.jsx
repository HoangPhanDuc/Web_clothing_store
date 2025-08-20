import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem";
import Loading from "../../components/Loading";
import { checkoutAPI } from "../../services/cartService";
import { toast } from "react-toastify";

export default function Cart() {
  const cartList = useSelector((state) => state.cartStore?.items);
  const loading = useSelector((state) => state.cartStore?.loading);
  const userId = useSelector((state) => state.userStore?.id);

  const checkout = async () => {
    try {
      const dataCheckout = {
        userId: userId,
        ordersAt: new Date(),
        totalPriceAddAt: 123,
        status: "pending",
        items: cartList.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };
      const checkoutData = await checkoutAPI(dataCheckout);
      if (checkoutData) {
        toast.success("Checkout successfully!");
      }
    } catch (error) {
      toast.error("Chekout failed!");
      console.log(error);
    }
  };

  if (loading === "loading") return <Loading />;
  // if (error) return <Error />;

  return (
    <div className="container w-100 mt-4 mb-4" style={{ minHeight: "90vh" }}>
      <div className="h5 m-3 mt-4 mb-4">My cart</div>
      {cartList.map((cartItem, index) => (
        <CartItem
          key={index}
          id={cartItem.id}
          name={cartItem.product.name}
          image={cartItem.product.image}
          quantity={cartItem.quantity}
          price={cartItem.priceAddAt}
          userId={cartItem.userId}
        />
      ))}
      <div className="me-3 me-sm-5 d-flex flex-column align-items-end">
        <div className="mb-2">Total price: {}</div>
        <div>
          <button
            onClick={() => checkout()}
            className="btn btn-dark text-uppercase"
          >
            checkout
          </button>
        </div>
      </div>
    </div>
  );
}
