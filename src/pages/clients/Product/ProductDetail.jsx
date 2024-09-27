import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getDetailBook } from "../../../apis/product";
import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";
import { formatNumber } from "../../../utils/common";
import { FaCartPlus } from "react-icons/fa";
import DetailDescription from "./DetailDescription";
import DetailProduct from "./DetailProduct";
import CategoryDetail from "./CategoryDetail";
import UiBox from "../../../components/UiBox";

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
    <div className="max-w-[1100px] mx-auto mt-6">
      <div className="h-10 flex items-center gap-3 justify-start bg-white mb-4 px-2 border">
        <Link className="text-sm text-gray-700" to="/">
          Trang chủ
        </Link>
        <MdKeyboardArrowRight />
        <Link className="text-sm text-gray-700" to="/product">
          Cửa hàng
        </Link>
        <MdKeyboardArrowRight />
        <span className="text-sm text-black border-l-2 border-[#9F9F9F] font-medium pl-4">
          {book?.nameBook}
        </span>
      </div>
      <div className="grid grid-cols-10 gap-2">
        <div className="col-span-3">
          <div className="flex flex-col gap-3 bg-white p-4 border border-gray-200">
            <img
              src={urlBook}
              className="object-cover h-[400px] w-[400px] rounded"
            />
            <div className="flex justify-start items-center gap-2 overflow-auto">
              {book?.imageUrls?.map((item, key) => {
                const activeBorder = item === urlBook;
                return (
                  <div
                    className={
                      activeBorder
                        ? "p-1 border border-red-500 min-w-[85px]"
                        : "p-1 min-w-[85px]"
                    }
                    key={key}
                  >
                    <img
                      onClick={() => setUrlBook(item)}
                      src={item}
                      className="h-[80px] w-[80px] object-cover rounded-md cursor-pointer"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="col-span-4">
          <div className="flex flex-col bg-white p-4 pt-1 border border-gray-200">
            <span
              className="text-[#323232] uppercase text-[18px] mt-2 mb-4"
              style={{
                fontFamily: "inherit",
                fontWeight: 600,
              }}
            >
              {book.nameBook}
            </span>
            <div className="flex items-center gap-[45px]">
              <div className="text-[15px] text-[#757575]">Danh mục:</div>
              <div className="text-[15px] text-[#2a87cd] cursor-pointer">
                {book.categoryName}
              </div>
            </div>
            <div className="my-4 text-[#757575] text-[15px] flex items-center gap-[60px]">
              <div className="">Giá tiền:</div>{" "}
              <div className="text-[#d71a00] font-semibold text-xl">
                {formatNumber(book.price)}
              </div>
            </div>

            <div className="flex items-center gap-[30px]">
              <div className="text-[15px] text-[#757575]">Vận chuyển:</div>
              <div className="text-[14px] flex items-center gap-1">
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/d9e992985b18d96aab90.png"
                  alt="anh"
                  className="w-[30px]"
                />
                Miễn phí vận chuyển
              </div>
            </div>
            <div
              className="flex items-center gap-[70px] my-5"
              style={{
                placeItems: "start",
              }}
            >
              <div className="text-[15px] text-[#757575] min-w-[43px]">
                Mô tả:
              </div>
              <div
                className="text-[14px] flex items-center"
                style={{ textAlign: "justify" }}
              >
                {book.description_short}
              </div>
            </div>
            <div className="text-[15px] text-[#757575] flex justify-start items-center">
              <span className="inline-block mr-[50px]">Số lượng: </span>{" "}
              <div className="flex justify-center items-center mr-6">
                <div className="border px-3 py-1 cursor-pointer">-</div>
                <div className="border px-5 py-1 w-[80px] text-center">1</div>
                <div className="border px-3 py-1 cursor-pointer">+</div>
              </div>
            </div>
            <div className="my-4 text-[#757575] text-[15px] flex items-center gap-[50px]">
              <div className="">Kho còn lại:</div>{" "}
              <div className="text-[14px]">
                {book.quantity > 0 ? (
                  <>
                    <span className="font-semibold text-black mr-3">
                      {book.quantity}
                    </span>{" "}
                    sản phẩm
                  </>
                ) : (
                  <>Hết hàng</>
                )}
              </div>
            </div>
            <div className="flex justify-start items-center gap-[45px] mt-4 mb-2">
              <div className="text-[15px] text-[#757575] min-w-[43px]">
                Đặt hàng:
              </div>
              <button className="bg-red-600 hover:bg-red-600 rounded px-3 text-white text-[15px] w-1/2 h-[45px] flex justify-center items-center gap-2">
                <FaCartPlus />
                Thêm Vào Giỏ Hàng
              </button>
            </div>
          </div>
          <div className="mt-4 text-[14px] text-[#505050]">
            THÔNG TIN & KHUYẾN MÃI
          </div>
          <div className="flex justify-start flex-col bg-white p-3 text-[14px] border border-gray-200">
            <div className="flex justify-start items-center mb-1 gap-1">
              <img src="https://newshop.vn/public/uploads/hot.gif" alt="anh" />
              <span className="text-[#323232] text-[15px] font-bold">
                Nhiều sản phẩm độc quyền chỉ có tại BookStore
              </span>
            </div>
            <div className="">
              ✅ Được kiểm tra hàng và Thanh toán khi nhận hàng.
            </div>
            <div className="">✅ Giao hàng trên Toàn Quốc</div>
            <div className="">
              ✅ Đặt online hoặc gọi ngay{" "}
              <div className="inline font-bold text-red-500">0123456789</div>
            </div>
            <div className="">
              ✅ Chiết khấu cao cho các đại lý và khách đặt sỉ
            </div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="bg-white border border-gray-200">
            <div className="flex items-center gap-2 bg-[#cd5f5f] px-4 py-2">
              <img
                src="https://newshop.vn/public/assets/frontend/img/shipping.png"
                alt="abc"
              />
              <div className="text-white text-[14px]">
                Sale Bạt Ngàn, Đón Hè Sang Với Nhiều Ưu Đãi Hấp Dẫn Cùng
                BookStore
              </div>
            </div>
            <div className="flex flex-col gap-3 p-3">
              <div className="flex items-center gap-1">
                <div className="bg-[#ff9c00] min-w-[40px] h-[40px] rounded-[50%] flex items-center justify-center">
                  <IoLocationSharp className="text-white text-[18px]" />
                </div>
                <div className="text-[#828282] text-[14px]">
                  Giao hàng bởi Công Ty TNHH Trực Tuyến
                  <div className="font-bold inline ml-1">BookStore</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-[#92bd2a] min-w-[40px] h-[40px] rounded-[50%] flex items-center justify-center">
                  <MdLocalShipping className="text-white text-[18px]" />
                </div>
                <div className="text-[#828282] text-[14px]">
                  Giao hàng trên toàn Quốc
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-[#92bd2a] min-w-[40px] h-[40px] rounded-[50%] flex items-center justify-center">
                  <IoLocationSharp className="text-white text-[18px]" />
                </div>
                <div className="text-[#828282] text-[14px]">
                  Nhận hàng rồi mới thanh toán tiền ( COD )
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CategoryDetail categoryName={book.categoryName} idBook={book.idBook} />
      <DetailDescription description={book.description_long} />
      <DetailProduct book={book} />
      <UiBox />
    </div>
  );
};

export default ProductDetail;
