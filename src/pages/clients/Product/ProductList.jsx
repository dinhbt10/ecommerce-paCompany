import { useEffect, useState } from "react";
import { getBook } from "../../../apis/product";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const getProductList = async () => {
    const res = await getBook();
    setBooks(res.data.data.books);
  };

  useEffect(() => {
    getProductList();
  }, []);
  return (
    <div className="grid grid-cols-4 gap-3 mx-5">
      {books.map((item, index) => (
        <div
          className="col-span-1 bg-[#F4F5F7] rounded-sm cursor-pointer"
          key={index}
          onClick={() => navigate(`/product/${item.idBook}`)}
        >
          <img
            src={item.imageUrls[0]}
            alt={item.nameBook}
            className="object-cover h-[300px] w-full"
          />
          <div className="flex flex-col p-2 pb-4">
            <span className="font-bold text-[#3A3A3A]">{item.nameBook}</span>
            <span className="text-[#898989] text-sm">{item.author}</span>
            <span className="text-[#3A3A3A] text-md">100.000 VND</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
