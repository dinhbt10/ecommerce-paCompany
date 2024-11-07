import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Carousel = ({ data, autoPlay = true, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleSlides = 4;
  const maxIndex = data.length - visibleSlides;
  const navigate = useNavigate();

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
    <div className="relative w-full overflow-hidden bg-gray-100 py-6 rounded-lg shadow-lg border-t-2">
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 z-10"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 z-10"
      >
        <ChevronRight />
      </button>

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
            onClick={() => navigate(`/product?categoryName=${item.name}`)}
          >
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <div className="text-center font-semibold text-gray-700">
                {item.name}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
