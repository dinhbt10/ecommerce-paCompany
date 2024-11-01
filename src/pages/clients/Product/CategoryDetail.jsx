import { useEffect, useState } from "react";
import { getBook } from "../../../apis/product";
import { formatNumber } from "../../../utils/common";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CategoryDetail = ({ categoryName, idBook }) => {
  const [books, setBooks] = useState([]);
  const { t } = useTranslation();
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
            {t("text-43")}
          </div>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-3">
              {data.map((item, key) => {
                return (
                  <div className="col-span-1 border" key={key}>
                    <div
                      className="flex flex-col items-center cursor-pointer p-2"
                      onClick={() => navigate(`/product/${item.idBook}`)}
                    >
                      <img
                        src={item.imageUrls[0]}
                        alt="anh"
                        className="w-full h-[250px] object-contain"
                      />
                      <div className="text-[15px] mt-1 text-wrap">
                        {item.nameBook}
                      </div>
                      <div className="text-[15px] text-[#d71a00] font-semibold">
                        {formatNumber(item.price)}
                      </div>
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
            {t("text-44")}
          </div>
          <div className="p-4">
            <div className="grid grid-cols-4 gap-3">
              {books
                .filter((item) => item.idBook !== idBook)
                .map((item, key) => {
                  return (
                    <div className="col-span-1 border" key={key}>
                      <div
                        className="flex flex-col items-center cursor-pointer p-2"
                        onClick={() => navigate(`/product/${item.idBook}`)}
                      >
                        <img
                          src={item.imageUrls[0]}
                          alt="anh"
                          className="w-full h-[250px] object-contain"
                        />
                        <div className="text-[15px] mt-1 text-wrap">
                          {item.nameBook}
                        </div>
                        <div className="text-[15px] text-[#d71a00] font-semibold">
                          {formatNumber(item.price)}
                        </div>
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
