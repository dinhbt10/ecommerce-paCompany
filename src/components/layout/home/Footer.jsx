import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white border-t">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-3 py-10 border-b">
          <div className="col-span-1">
            <div className="text-[20px] font-semibold text-black mb-3">
              BookStore
            </div>
            <div className="text-[14px] text-gray-700">
              Nam Tu Liem, Ha noi, Vietnam
            </div>
          </div>
          <div className="col-span-1">
            <div className="grid grid-cols-2">
              <div className="col-span-1">
                <div className="font-medium">Liên kết</div>
                <div
                  className="text-sm text-gray-700 mt-5 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  Trang chủ
                </div>
                <div
                  className="text-sm text-gray-700 mt-5 cursor-pointer"
                  onClick={() => navigate("/product")}
                >
                  Cửa hàng
                </div>
                <div
                  className="text-sm text-gray-700 mt-5 cursor-pointer"
                  onClick={() => navigate("/about")}
                >
                  Về chúng tôi
                </div>
                <div
                  className="text-sm text-gray-700 mt-5 cursor-pointer"
                  onClick={() => navigate("/contact")}
                >
                  Liên hệ
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-medium">Hỗ trợ</div>
                <div className="text-sm text-gray-700 mt-5">
                  Chăm sóc khách hàng
                </div>
                <div className="text-sm text-gray-700 mt-5">Hỗ trợ 24/7</div>
                <div className="text-sm text-gray-700 mt-5">Chính sách</div>
                <div className="text-sm text-gray-700 mt-5">
                  Liên hệ trực tiếp
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 pl-[50px]">
            <div className="font-medium mb-4">Nhận hỗ trợ</div>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 rounded border outline-none"
                id="email1"
                type="email"
                placeholder="Nhập email để được hỗ trợ"
                required
              />
              <button className="min-w-[60px] outline-none bg-red-600 text-white rounded h-[40px]">
                Gửi
              </button>
            </div>
          </div>
        </div>
        <div className="my-5 text-gray-700 text-sm">
          2024 BookStore. All rights reverved
        </div>
      </div>
    </div>
  );
};

export default Footer;
