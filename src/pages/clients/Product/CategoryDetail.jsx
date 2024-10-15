import { useEffect, useState } from "react";
import { getBook } from "../../../apis/product";
import { formatNumber } from "../../../utils/common";
import { useNavigate } from "react-router-dom";

const CategoryDetail = ({ categoryName, idBook }) => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const getProductList = async () => {
    const res = await getBook();
    setBooks(res.data.data ? res.data.data.books : []);
  };

  const data = books.filter(
    (item) => item.categoryName === categoryName && item.idBook !== idBook
  );

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <>
      {data.length > 0 && (
        <div className="bg-white border border-gray-200 mt-4">
          <div className="text-[#505050] text-[14px] font-bold uppercase border-b border-[#ebebeb] p-4">
            Sản phẩm liên quan
          </div>
          <div className="p-4">
            <div className="flex justify-start items-center gap-5 overflow-auto">
              {data.map((item, key) => {
                return (
                  <div
                    key={key}
                    className="flex flex-col items-start cursor-pointer"
                    onClick={() => navigate(`/product/${item.idBook}`)}
                  >
                    <img
                      src={item.imageUrls[0]}
                      alt="anh"
                      className="w-[200px] h-[250px] object-cover"
                    />
                    <div className="text-[15px] mt-1 truncate">
                      {item.nameBook}
                    </div>
                    <div className="text-[15px] text-[#d71a00] font-semibold">
                      {formatNumber(item.price)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {data.length === 0 && (
        <div className="bg-white border border-gray-200 mt-4">
          <div className="text-[#505050] text-[14px] font-bold uppercase border-b border-[#ebebeb] p-4">
            Sản phẩm khác
          </div>
          <div className="p-4">
            <div className="flex justify-start items-center gap-5 overflow-auto">
              {books
                .filter((item) => item.idBook !== idBook)
                .map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="flex flex-col items-start cursor-pointer"
                      onClick={() => navigate(`/product/${item.idBook}`)}
                    >
                      <img
                        src={item.imageUrls[0]}
                        alt="anh"
                        className="w-[200px] h-[250px] object-cover"
                      />
                      <div className="text-[15px] mt-1 truncate">
                        {item.nameBook}
                      </div>
                      <div className="text-[15px] text-[#d71a00] font-semibold">
                        {formatNumber(item.price)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryDetail;
