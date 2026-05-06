export const currencyUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatDateVN = (timestamp) => {
  if (!timestamp) return "";

  const date =
    typeof timestamp.toDate === "function"
      ? timestamp.toDate()
      : new Date(timestamp);

  const formatted = date.toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  return `${formatted} UTC+7`;
};
