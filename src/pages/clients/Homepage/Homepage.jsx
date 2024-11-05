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
      <div className="max-w-[1100px] mx-auto mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d75108.16140731037!2d105.72108734616423!3d21.0178107407836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313454a1080e72f3%3A0xb08bae358d43e397!2zTmFtIFThu6sgTGnDqm0sIEhhbm9pLCBWaWV0bmFt!5e1!3m2!1sen!2s!4v1730790743326!5m2!1sen!2s"
          className="w-full"
          height={450}
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default Homepage;
