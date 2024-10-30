import UiBox from "../../../components/UiBox";
import Category from "./Category";
import OurProduct from "./OurProduct";
import Banner from "../../../../public/BookStore (1).png";

const Homepage = () => {
  return (
    <div>
      <img
        src={Banner}
        className="max-w-[1100px] w-full h-[400px] mx-auto mt-5"
      />
      <div className="max-w-[1100px] mx-auto mt-10">
        <UiBox />
      </div>
      <Category />
      <OurProduct />
    </div>
  );
};

export default Homepage;
