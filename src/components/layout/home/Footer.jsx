import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="bg-white border-t">
      <div className="max-w-[1100px] mx-auto">
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
                <div className="font-medium">{t("text-135")}</div>
                <div
                  className="text-sm text-gray-700 mt-5 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  {t("text-136")}
                </div>
                <div
                  className="text-sm text-gray-700 mt-5 cursor-pointer"
                  onClick={() => navigate("/product")}
                >
                  {t("text-137")}
                </div>
                <div
                  className="text-sm text-gray-700 mt-5 cursor-pointer"
                  onClick={() => navigate("/about")}
                >
                  {t("text-138")}
                </div>
                <div
                  className="text-sm text-gray-700 mt-5 cursor-pointer"
                  onClick={() => navigate("/contact")}
                >
                  {t("text-139")}
                </div>
              </div>
              <div className="col-span-1">
                <div className="font-medium">{t("text-140")}</div>
                <div className="text-sm text-gray-700 mt-5">
                  {t("text-141")}
                </div>
                <div className="text-sm text-gray-700 mt-5">
                  {t("text-142")}
                </div>
                <div className="text-sm text-gray-700 mt-5">
                  {t("text-143")}
                </div>
                <div className="text-sm text-gray-700 mt-5">
                  {t("text-144")}
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 pl-[50px]">
            <div className="font-medium mb-4">{t("text-145")}</div>
            <div className="flex items-center gap-2">
              <input
                className="flex-1 rounded border outline-none"
                id="email1"
                type="email"
                placeholder={t("text-146")}
                required
              />
              <button className="min-w-[60px] outline-none bg-red-600 text-white rounded h-[40px] px-2">
                {t("text-147")}
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
