import { useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkoutAPI } from "../../api/cart.api";
import CartItem from "../../components/CartItem";
import LoadingComponent from "../../components/LoadingComponent";
import { currencyUSD } from "../../utils/feature.common";

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
    }
  };

  const totalPrice = useMemo(() => {
    return cartList.reduce((total, item) => {
      return total + item.priceAddAt * item.quantity;
    }, 0);
  }, [cartList]);

  if (loading === true) return <LoadingComponent />;
  if (cartList.length === 0)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "90vh" }}
      >
        <span className="h3">No items in cart</span>
      </div>
    );

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
        <div className="mb-2">
          Total price: {currencyUSD.format(totalPrice)}
        </div>
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
