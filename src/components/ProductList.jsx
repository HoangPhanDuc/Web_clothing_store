import Product from "./Product";

export default function ProductsList({ list }) {

  return (
    <div className="container w-100">
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
        {list.map((value, index) => (
          <Product
            key={index}
            id={value.id}
            name={value.name}
            image={value.image}
            quantity={value.quantity}
            price={value.price}
          />
        ))}
      </div>
    </div>
  );
}
