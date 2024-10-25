import { useEffect, useState } from "react";
import { getBook } from "../../../apis/product";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../utils/common";

const OurProduct = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const getProductList = async () => {
    const res = await getBook();
    setBooks(res.data.data.books || []);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="mt-5 max-w-[1100px] mx-auto">
      <span className="flex justify-center text-[#3A3A3A] font-bold text-3xl mb-5">
        Sản phẩm của chúng tôi
      </span>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 gap-4 bg-white p-4">
        {books?.map((item, index) => (
          <div className="col-span-1 border p-3" key={index}>
            <div
              className="h-[300px] flex justify-center flex-col gap-1 cursor-pointer"
              onClick={() => navigate(`/product/${item.idBook}`)}
            >
              <img
                src={item.imageUrls[0]}
                alt={item.nameBook}
                className="object-contain  h-2/3 rounded"
              />
              <div className="bg-[#F4F5F7] py-5 h-1/3">
                <span className="block text-center text-[#333333] font-semibold text-sm px-1 line-clamp-2">
                  {item.nameBook}
                </span>
                <span className="block text-center text-[#333333] font-semibold text-[16px]">
                  {formatNumber(item.price)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProduct;
