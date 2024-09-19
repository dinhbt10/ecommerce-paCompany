import ProductList from "./ProductList";

const Product = () => {
  return (
    <>
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3"
          className="w-full h-[300px] object-cover opacity-80"
        />
        <div className="uppercase text-3xl font-medium text-black absolute top-[50%] left-[45%]">
          Cửa hàng
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto mt-5">
        <ProductList />
      </div>
    </>
  );
};

export default Product;
