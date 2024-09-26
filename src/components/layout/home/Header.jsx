import { useNavigate } from "react-router-dom";
import { BsFillBagCheckFill } from "react-icons/bs";
import { useEffect, useRef, useState } from "react";
import { getBook } from "../../../apis/product";

function Header() {
  const [value, setValue] = useState("");
  const [books, setBooks] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const searchListRef = useRef(null);

  const navigate = useNavigate();

  const getProductList = async (value) => {
    const res = await getBook(value);

    if (res.data.data.books && res.data.data.books.length > 0) {
      setBooks(res.data.data.books);
    } else {
      setBooks([]);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleClickOutside = (event) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(event.target) &&
      searchListRef.current &&
      !searchListRef.current.contains(event.target)
    ) {
      setIsFocused(false);
      setValue("");
      setBooks([]);
    }
  };

  useEffect(() => {
    if (value && isFocused) {
      getProductList(value);
    }
    if (!value) {
      getProductList("");
    }
  }, [value, isFocused]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="max-w-[1100px] w-full mx-auto">
      <div className="flex justify-end items-center mt-3 text-white text-sm gap-3">
        <div
          className="flex justify-start items-center cursor-pointer gap-1"
          onClick={() => navigate("/register")}
        >
          Tạo tài khoản
        </div>
        <div
          className="flex justify-start items-center cursor-pointer gap-1"
          onClick={() => navigate("/login")}
        >
          Đăng nhập
        </div>
      </div>
      <div className="grid grid-cols-6 pb-8 pt-3 gap-3">
        <div
          className="col-span-1 text-xl font-semibold pt-1 text-white cursor-pointer"
          onClick={() => navigate("/")}
        >
          BookStore
        </div>
        <div className="col-span-3">
          <form action="">
            <div className="flex items-center relative z-[100000]">
              <input
                ref={inputRef}
                onFocus={handleFocus}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder="Nhập từ khoá tìm kiếm"
                className="flex-1 rounded-tl-[5px] rounded-bl-[5px] placeholder:text-[14px] h-[37px]"
              />
              <button className="bg-[#ff9c00] text-white h-[35px] rounded-tr-[5px] rounded-br-[5px] px-3">
                Tìm kiếm
              </button>
              {isFocused && (
                <>
                  {books.length > 0 && (
                    <div
                      ref={searchListRef}
                      className="flex flex-col absolute top-[36px] z-[1000] border bg-white rounded w-full p-2 gap-3 max-h-[400px] overflow-auto"
                    >
                      {books.map((item, key) => (
                        <div
                          key={key}
                          className="flex items-center justify-start gap-1 border-b pb-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setIsFocused(false);
                            setValue("");
                            setBooks([]);
                            navigate(`/product/${item.idBook}`);
                          }}
                        >
                          <img
                            src={item.imageUrls[0]}
                            className="h-[50px] w-[40px] object-cover"
                          />
                          <div className="">{item.nameBook}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </form>
        </div>
        <div className="col-span-2">
          <div className="flex gap-3">
            <div className="flex items-center border border-white w-4/7 h-[36px] rounded gap-1">
              <div className=" text-white font-bold uppercase text-[14px] h-full pt-[6px] pl-[10px] pr-[6px]">
                Hotline
              </div>
              <div className="text-[red] font-bold bg-white h-full pt-[6px] px-[4px]">
                0123456789
              </div>
            </div>
            <div className="flex items-center border border-white w-3/7 h-[36px] pt-[4px] pr-[2px] rounded gap-1 flex-1 justify-start">
              <div className="text-white text-[20px] uppercase pl-[10px] pr-1 pb-[5px]">
                <BsFillBagCheckFill />
              </div>
              <div className="text-white text-[12px] leading-[13px]">
                <div className="uppercase">Giỏ hàng</div>
                <div className="pb-1">0đ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
