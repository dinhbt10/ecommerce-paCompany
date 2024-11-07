import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatNumber, getDateIfWithin7Days } from "../utils/common";
import { useTranslation } from "react-i18next";

const CarouselProd = ({ data, autoPlay = false, interval = 2000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = 4;
  const maxIndex = data.length - visibleSlides;
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Xử lý tự động chạy nếu `autoPlay` được bật
  useEffect(() => {
    if (autoPlay) {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex < maxIndex ? prevIndex + 1 : 0
        );
      }, interval);
      return () => clearInterval(timer); // Dọn dẹp interval khi component bị huỷ
    }
  }, [autoPlay, interval, maxIndex]);

  // Chuyển sang slide tiếp theo
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex < maxIndex ? prevIndex + 1 : 0));
  };

  // Quay lại slide trước
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : maxIndex));
  };

  return (
    <div className="relative w-full overflow-hidden bg-white py-3 shadow-lg border-t-2">
      {data.length > 3 && (
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 p-1 bg-white border rounded-full hover:bg-slate-100 z-10"
        >
          <ChevronLeft color="black" />
        </button>
      )}

      {data.length > 3 && (
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-1 bg-white border rounded-full hover:bg-slate-100 z-10"
        >
          <ChevronRight color="black" />
        </button>
      )}

      <div
        className="flex transition-transform duration-500 ease-in-out px-4"
        style={{
          transform: `translateX(-${(currentIndex * 100) / visibleSlides}%)`,
        }}
      >
        {data.slice(0, 10).map((item, index) => (
          <div
            key={index}
            className="w-1/4 p-2 flex-shrink-0 cursor-pointer"
            onClick={() => navigate(`/product/${item.id}`)}
          >
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4 relative">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-[230px] object-contain mb-2 rounded"
              />
              <div className="text-center font-semibold text-gray-700 truncate">
                {item.name}
              </div>
              <span className="block text-center text-[#d71a00] font-semibold text-[16px]">
                {formatNumber(item.price)}
              </span>
              {getDateIfWithin7Days(item?.createAt) && (
                <div className="absolute top-2 left-2 w-10 h-6 bg-red-500 flex justify-center items-center rounded-sm text-sm text-white">
                  {t("text-21")}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselProd;
