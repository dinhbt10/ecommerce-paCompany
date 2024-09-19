import { useEffect, useState } from "react";
import { getBook } from "../../../apis/product";

const OurProduct = () => {
  const [books, setBooks] = useState([]);
  const getProductList = async () => {
    const res = await getBook();
    setBooks(res.data.data.books);
  };

  useEffect(() => {
    getProductList();
  }, []);
  return (
    <div className="mt-5 px-20">
      <span className="flex justify-center text-[#3A3A3A] font-bold text-3xl mb-5">
        Sản phẩm của chúng tôi
      </span>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 gap-4 mx-16">
        {books.map((item, index) => (
          <div className="col-span-1" key={index}>
            <div className="h-[400px] flex justify-center flex-col gap-1">
              <img
                src={item.imageUrls[0]}
                alt={item.nameBook}
                className="h-[70%] object-cover w-full"
              />
              <div className="bg-[#F4F5F7] py-5">
                <span className="block text-center text-[#333333] font-semibold text-[20px]">
                  {item.nameBook}
                </span>
                <span className="block text-center text-[#333333] font-semibold text-[16px]">
                  100.000 VND
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
