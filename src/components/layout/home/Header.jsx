import { useNavigate } from "react-router-dom";
import { BsFillBagCheckFill } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { getBook } from "../../../apis/product";
import { formatNumber } from "../../../utils/common";
import { FaUserAlt } from "react-icons/fa";
import { Popover } from "flowbite-react";
import { CiLogout } from "react-icons/ci";
import { MdOutlineDashboard } from "react-icons/md";
// import { LuUserSquare2 } from "react-icons/lu";
import instance from "../../../utils/http";
import FlagEN from "../../../../public/english.png";
import FlagVN from "../../../../public/vietnam.png";
import { useTranslation } from "react-i18next";
import { MdKeyboardVoice } from "react-icons/md";
import { AppContext } from "../../../context/app";

function Header() {
  const [value, setValue] = useState("");
  const [books, setBooks] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const searchListRef = useRef(null);
  const { userInfo, logout, refreshUserInfo } = useContext(AppContext);
  const [total, setTotal] = useState(0);
  const { t, i18n } = useTranslation();
  const [isListening, setIsListening] = useState(false);

  const navigate = useNavigate();

  const getProductList = async (value) => {
    const res = await getBook({ nameBook: value });

    if (res.data.data?.books && res.data.data.books.length > 0) {
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

  const handleOnkyDown = (e) => {
    if (e.key === "Delete" || e.key === "Backspace") {
      if (value && value.length > 1) {
        getProductList(value);
      } else {
        setBooks([]);
      }
    }
  };

  const handleLogout = () => {
    setTotal(0);
    logout();
    navigate("/");
  };

  const handleGetListCart = async () => {
    try {
      if (!userInfo) return;
      const res = await instance.get(`/cart/list?userId=${userInfo.idUser}`);
      const { data } = res.data;
      if (data.cartItems.length !== 0) {
        setTotal(
          data.cartItems.length > 1
            ? data.cartItems.reduce(
                (a, b) => a.price * a.quantity + b.price * b.quantity
              )
            : data.cartItems[0]?.total
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Thay đổi ngôn ngữ
    localStorage.setItem("lang", lng);
  };

  useEffect(() => {
    handleGetListCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshUserInfo]);

  useEffect(() => {
    if (value && isFocused) {
      getProductList(value);
    }
  }, [value, isFocused]);

  useEffect(() => {
    document.addEventListener("mousedown", handleOnkyDown);

    return () => {
      document.removeEventListener("mousedown", handleOnkyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "vi-VN";

      let silenceTimeout;

      // Khi nhận kết quả từ giọng nói
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setValue(transcript);

        // Xóa timer hiện tại và đặt lại để kiểm tra 3 giây im lặng
        clearTimeout(silenceTimeout);
        silenceTimeout = setTimeout(() => {
          setIsListening(false);
        }, 1000);
      };

      // Dừng ghi âm khi hết thời gian im lặng
      recognition.onend = () => setIsListening(false);

      // Bắt đầu hoặc dừng ghi âm dựa trên isListening
      if (isListening) {
        recognition.start();
      } else {
        recognition.stop();
        clearTimeout(silenceTimeout); // Xóa timer khi dừng ghi âm
      }

      return () => {
        recognition.stop();
        clearTimeout(silenceTimeout);
      };
    } else {
      console.warn("Trình duyệt của bạn không hỗ trợ Web Speech API.");
    }
  }, [isListening]);

  return (
    <div className="max-w-[1100px] w-full mx-auto">
      <div className="flex justify-between items-center mb-2">
        <div className="text-white text-sm">{t("text-1")}</div>
        {userInfo && (
          <div className="flex items-center gap-4 justify-end">
            <div className="flex justify-center items-center gap-1">
              <img
                src={FlagEN}
                width="25px"
                className="cursor-pointer"
                onClick={() => changeLanguage("en")}
              />
              <img
                src={FlagVN}
                width="28px"
                className="cursor-pointer"
                onClick={() => changeLanguage("vi")}
              />
            </div>
            <Popover
              trigger="hover"
              content={
                <div className="flex flex-col bg-white min-w-[200px] w-full justify-start cursor-pointer">
                  <div
                    className="flex justify-start items-center gap-1 hover:bg-slate-200 px-5 py-2"
                    onClick={() => navigate("/user")}
                  >
                    {/* <LuUserSquare2 /> {t("text-2")} */}
                    {t("text-2")}
                  </div>
                  {userInfo?.roles[0].name !== "ROLE_USER" && (
                    <div
                      className="flex justify-start items-center gap-1 hover:bg-slate-200 px-5 py-2"
                      onClick={() => {
                        if (userInfo?.roles[0].name === "ROLE_ADMIN") {
                          navigate("/admin");
                        } else {
                          navigate("/admin/categories");
                        }
                      }}
                    >
                      <MdOutlineDashboard /> {t("text-3")}
                    </div>
                  )}
                  <div
                    className="flex justify-start items-center gap-1 hover:bg-slate-200 px-5 py-2"
                    onClick={handleLogout}
                  >
                    <CiLogout /> {t("text-4")}
                  </div>
                </div>
              }
            >
              <div className="flex justify-end items-center mt-3 text-white text-sm gap-3 mb-3">
                <div className="flex justify-start items-center cursor-pointer gap-1">
                  <FaUserAlt /> {userInfo.fullname}
                </div>
              </div>
            </Popover>
          </div>
        )}
        {!userInfo && (
          <div className="flex justify-end items-center mt-3 text-white text-sm gap-3 mb-3">
            <div className="flex justify-center items-center gap-1">
              <img
                src={FlagEN}
                width="25px"
                className="cursor-pointer"
                onClick={() => changeLanguage("en")}
              />
              <img
                src={FlagVN}
                width="28px"
                className="cursor-pointer"
                onClick={() => changeLanguage("vi")}
              />
            </div>
            <div
              className="flex justify-start items-center cursor-pointer gap-1"
              onClick={() => navigate("/register")}
            >
              {t("text-5")}
            </div>
            <div
              className="flex justify-start items-center cursor-pointer gap-1"
              onClick={() => navigate("/login")}
            >
              {t("text-6")}
            </div>
          </div>
        )}
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
                onKeyDown={handleOnkyDown}
                ref={inputRef}
                onFocus={handleFocus}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type="text"
                placeholder={t("text-9")}
                className="flex-1 rounded-tl-[5px] rounded-bl-[5px] placeholder:text-[14px] h-[37px]"
              />
              <button
                className="bg-[#ff9c00] text-white h-[35px] rounded-tr-[5px] rounded-br-[5px] px-3"
                type="button"
              >
                {isListening ? (
                  <div className="recording-indicator">
                    <div className="recording-dot"></div>
                    <span className="recording-text">{t("text-155")}...</span>
                  </div>
                ) : (
                  <MdKeyboardVoice
                    onClick={() => {
                      setValue("");
                      setIsListening(true);
                    }}
                  />
                )}
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
            {userInfo?.roles[0].name === "ROLE_USER" && (
              <div
                onClick={() => navigate("/cart")}
                className="flex items-center border border-white w-3/7 h-[36px] pt-[4px] pr-[2px] rounded gap-1 flex-1 justify-start cursor-pointer"
              >
                <div className="text-white text-[20px] uppercase pl-[10px] pr-1 pb-[5px]">
                  <BsFillBagCheckFill />
                </div>
                <div className="text-white text-[12px] leading-[13px]">
                  <div className="uppercase"> {t("text-8")}</div>
                  <div className="pb-1">{formatNumber(total)}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
