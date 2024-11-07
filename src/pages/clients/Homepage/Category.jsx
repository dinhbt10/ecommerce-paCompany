import { useEffect, useState } from "react";
import { getCategory } from "../../../apis/category";
import { useTranslation } from "react-i18next";
import Carousel from "../../../components/Carousel";

const Category = () => {
  const [category, setCategory] = useState([]);
  const { t } = useTranslation();
  const getCategoryApi = async () => {
    const res = await getCategory();
    setCategory(res.data.data.categories);
  };

  useEffect(() => {
    getCategoryApi();
  }, []);

  return (
    <>
      <div className="flex w-full my-5 items-center justify-center flex-col">
        <span className="font-bold text-[26px]"> {t("text-153")}</span>
      </div>
      <div className="max-w-[1100px] mx-auto">
        <Carousel
          data={category.map((item) => ({
            image: item.imageUrl,
            name: item.nameCategory,
          }))}
        />
      </div>
    </>
  );
};

export default Category;
