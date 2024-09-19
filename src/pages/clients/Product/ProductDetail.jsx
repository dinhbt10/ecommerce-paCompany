import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getDetailBook } from "../../../apis/product";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [urlBook, setUrlBook] = useState();

  const getProductDetailApi = async (id) => {
    const res = await getDetailBook(id);
    setBook(res.data);
    setUrlBook(res.data.imageUrls[0]);
  };

  useEffect(() => {
    if (id) {
      getProductDetailApi(id);
    }
  }, [id]);

  return (
    <div>
      <div className="bg-[#F9F1E7] h-14 flex items-center gap-3 justify-start pl-[8%]">
        <Link className="text-sm text-[#9F9F9F]" to="/">
          Trang chủ
        </Link>
        <MdKeyboardArrowRight />
        <Link className="text-sm text-[#9F9F9F]" to="/product">
          Cửa hàng
        </Link>
        <MdKeyboardArrowRight />
        <span className="text-sm text-black border-l-2 border-[#9F9F9F] pl-4">
          {book?.nameBook}
        </span>
      </div>
      <div className="max-w-[1200px] mx-auto mt-6">
        <div className="grid grid-cols-7 gap-6">
          <div className="col-span-3">
            <div className="grid grid-cols-6 gap-3">
              <div className="col-span-1">
                <div className="flex flex-col gap-3">
                  {book?.imageUrls?.map((item, key) => (
                    <img
                      onClick={() => setUrlBook(item)}
                      key={key}
                      src={item}
                      className="h-[80px] w-[80px] object-cover rounded-md cursor-pointer"
                    />
                  ))}
                </div>
              </div>
              <div className="col-span-5">
                <img
                  src={urlBook}
                  className="object-cover h-[500px] w-[400px] rounded"
                />
              </div>
            </div>
          </div>
          <div className="col-span-4">
            <div className="flex flex-col">
              <span
                className="text-[36px]"
                style={{
                  fontFamily: "Poppins",
                  fontWeight: 400,
                }}
              >
                {book.nameBook}
              </span>
              <span className="text-[24px] text-[#9F9F9F]">100.000 VND</span>
              <span className="text-[20px] text-[#000000]">
                {book.description}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
