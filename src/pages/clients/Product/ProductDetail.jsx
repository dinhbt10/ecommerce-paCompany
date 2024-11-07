import { Link, useNavigate, useParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getDetailBook } from "../../../apis/product";
import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdLocalShipping } from "react-icons/md";
import { formatNumber, getUserInfoLocalStorage } from "../../../utils/common";
import { FaCartPlus } from "react-icons/fa";
import DetailDescription from "./DetailDescription";
import DetailProduct from "./DetailProduct";
import CategoryDetail from "./CategoryDetail";
import UiBox from "../../../components/UiBox";
import instance from "../../../utils/http";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Rating } from "flowbite-react";

const ProductDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});
  const [urlBook, setUrlBook] = useState();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const userInfo = getUserInfoLocalStorage();
  const { t } = useTranslation();
  const [comments, setComments] = useState([]);

  const getProductDetailApi = async (id) => {
    const res = await getDetailBook(id);
    setBook(res.data);
    setUrlBook(res.data.imageUrls[0]);
    setComments(res.data.feedbacks.map((item) => item));
  };

  const handleAddProduct = async () => {
    if (!userInfo) {
      toast.error(t("text-154"), {
        autoClose: 1000,
        position: "bottom-right",
      });
      return;
    }
    const res = await instance.post("/cart/add", undefined, {
      params: { bookId: book.idBook, quantity, userId: userInfo.idUser },
    });

    const { success, data } = res.data;

    if (success) {
      toast.success(t("text-62"), {
        autoClose: 1000,
        position: "bottom-right",
      });
    } else {
      toast.error(data, {
        autoClose: 1000,
        position: "bottom-right",
      });
    }
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
          {t("text-13")}
        </Link>
        <MdKeyboardArrowRight />
        <Link className="text-sm text-gray-700" to="/product">
          {t("text-14")}
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
              <div className="text-[15px] text-[#757575]">{t("text-11")}:</div>
              <div
                className="text-[15px] text-[#2a87cd] cursor-pointer"
                onClick={() =>
                  navigate(`/product?categoryName=${book.categoryName}`)
                }
              >
                {book.categoryName}
              </div>
            </div>
            <div className="my-4 text-[#757575] text-[15px] flex items-center gap-[60px]">
              <div className="">{t("text-23")}:</div>{" "}
              <div className="text-[#d71a00] font-semibold text-xl">
                {formatNumber(book.price)}
              </div>
            </div>

            <div className="flex items-center gap-[30px]">
              <div className="text-[15px] text-[#757575]">{t("text-24")}:</div>
              <div className="text-[14px] flex items-center gap-1">
                <img
                  src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/d9e992985b18d96aab90.png"
                  alt="anh"
                  className="w-[30px]"
                />
                {t("text-25")}
              </div>
            </div>
            <div
              className="flex items-center gap-[70px] my-5"
              style={{
                placeItems: "start",
              }}
            >
              <div className="text-[15px] text-[#757575] min-w-[43px]">
                {t("text-26")}:
              </div>
              <div
                className="text-[14px] flex items-center"
                style={{ textAlign: "justify" }}
              >
                {book.description_short}
              </div>
            </div>
            <div className="text-[15px] text-[#757575] flex justify-start items-center">
              <span className="inline-block mr-[50px]">{t("text-27")}: </span>{" "}
              <div className="flex justify-center items-center mr-6">
                <div
                  className="border px-3 py-1 cursor-pointer"
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </div>
                <div className="border px-5 py-1 w-[80px] text-center">
                  {quantity}
                </div>
                <div
                  className="border px-3 py-1 cursor-pointer"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </div>
              </div>
            </div>
            <div className="my-4 text-[#757575] text-[15px] flex items-center gap-[50px]">
              <div className="">{t("text-28")}:</div>{" "}
              <div className="text-[14px]">
                {book.quantity > 0 ? (
                  <>
                    <span className="font-semibold text-black mr-3">
                      {book.quantity}
                    </span>{" "}
                    {t("text-29")}
                  </>
                ) : (
                  <>{t("text-30")}</>
                )}
              </div>
            </div>
            <div className="flex justify-start items-center gap-[45px] mt-4 mb-2">
              <div className="text-[15px] text-[#757575] min-w-[43px]">
                {t("text-31")}:
              </div>
              <button
                className="bg-red-600 hover:bg-red-600 rounded px-3 text-white text-[15px] w-1/2 h-[45px] flex justify-center items-center gap-2"
                onClick={handleAddProduct}
              >
                <FaCartPlus />
                {t("text-32")}
              </button>
            </div>
          </div>
          <div className="mt-4 text-[14px] text-[#505050]">{t("text-33")}</div>
          <div className="flex justify-start flex-col bg-white p-3 text-[14px] border border-gray-200">
            <div className="flex justify-start items-center mb-1 gap-1">
              <img src="https://newshop.vn/public/uploads/hot.gif" alt="anh" />
              <span className="text-[#323232] text-[15px] font-bold">
                {t("text-34")}
              </span>
            </div>
            <div className="">✅ {t("text-35")}</div>
            <div className="">✅ {t("text-36")}</div>
            <div className="">
              ✅ {t("text-37")}{" "}
              <div className="inline font-bold text-red-500">0123456789</div>
            </div>
            <div className="">✅ {t("text-38")}</div>
          </div>
        </div>
        <div className="col-span-3">
          <div className="bg-white border border-gray-200">
            <div className="flex items-center gap-2 bg-[#cd5f5f] px-4 py-2">
              <img
                src="https://newshop.vn/public/assets/frontend/img/shipping.png"
                alt="abc"
              />
              <div className="text-white text-[14px]">{t("text-39")}</div>
            </div>
            <div className="flex flex-col gap-3 p-3">
              <div className="flex items-center gap-1">
                <div className="bg-[#ff9c00] min-w-[40px] h-[40px] rounded-[50%] flex items-center justify-center">
                  <IoLocationSharp className="text-white text-[18px]" />
                </div>
                <div className="text-[#828282] text-[14px]">
                  {t("text-40")}
                  <div className="font-bold inline ml-1">BookStore</div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-[#92bd2a] min-w-[40px] h-[40px] rounded-[50%] flex items-center justify-center">
                  <MdLocalShipping className="text-white text-[18px]" />
                </div>
                <div className="text-[#828282] text-[14px]">{t("text-41")}</div>
              </div>
              <div className="flex items-center gap-1">
                <div className="bg-[#92bd2a] min-w-[40px] h-[40px] rounded-[50%] flex items-center justify-center">
                  <IoLocationSharp className="text-white text-[18px]" />
                </div>
                <div className="text-[#828282] text-[14px]">{t("text-42")}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DetailDescription description={book.description_long} />
      {comments.length > 0 && (
        <div className="bg-white max-w-[1100px] mx-auto mt-5 p-5">
          <div className="mb-3">{t("text-152")}</div>
          <div className="flex flex-col gap-3 overflow-auto max-h-[300px]">
            {comments.map((comment, index) => (
              <div key={index} className="border p-3 rounded">
                <div className="flex items-center justify-start gap-2">
                  <div className="text-[16px]">{comment.username}</div>
                  <Rating>
                    {Array(comment.rating)
                      .fill(0)
                      .map((_item, key) => (
                        <Rating.Star key={key} />
                      ))}
                  </Rating>
                </div>
                <div className="flex flex-col gap-1 justify-start">
                  {comment.comment}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <DetailProduct book={book} />
      <CategoryDetail categoryName={book.categoryName} idBook={book.idBook} />
      <UiBox />
    </div>
  );
};

export default ProductDetail;
