import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { useNavigate } from "react-router-dom";
import useWindowSize from "../../../hook/useSize";
import { useTranslation } from "react-i18next";

const CheckoutSuccess = () => {
  const [isConfettiVisible, setIsConfettiVisible] = useState(true);
  const { width, height } = useWindowSize();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConfettiVisible(false);
    }, 50000);

    return () => clearTimeout(timer);
  }, []);

  const handleContinueShopping = () => {
    navigate("/");
  };

  return (
    <div className="min-h-[450px] flex flex-col items-center justify-center bg-gray-100">
      {isConfettiVisible && <Confetti width={width} height={height} />}
      <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-lg mx-auto">
        <h1 className="text-4xl font-bold text-[#cd5f5f] mb-4">
          {t("text-164")}
        </h1>
        <p className="text-xl text-gray-600 mb-6">{t("text-165")}</p>
        <button
          onClick={handleContinueShopping}
          className="bg-[#cd5f5f] text-white px-6 py-3 rounded-lg text-lg hover:bg-[#cd5f5f] transition"
        >
          {t("text-166")}
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
