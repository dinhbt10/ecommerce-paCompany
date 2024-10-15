import { Carousel } from "flowbite-react";
import { customTheme } from "./config";

const SlideBanner = () => {
  return (
    <div
      className="h-[300px] sm:h-64 xl:h-80 2xl:h-96 rounded-none"
      style={{ height: "400px" }}
    >
      <Carousel theme={customTheme}>
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
          alt="..."
          className="object-fill rounded-none"
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
          alt="..."
          className="object-fill rounded-none"
        />
        <img
          src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
          alt="..."
          className="object-fill rounded-none"
        />
      </Carousel>
    </div>
  );
};

export default SlideBanner;
