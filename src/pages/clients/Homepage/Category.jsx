import { useEffect, useState } from "react";
import { getCategory } from "../../../apis/category";

const Category = () => {
  const [category, setCategory] = useState([]);
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
        <span className="font-bold text-[30px]">Danh mục</span>
        <span className="text-[#666666] text-[18px]">
          Những loại sách phổ biến nhất
        </span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 lg:gap-4 sm:gap-2 mx-16 px-20">
        {category.map((item, index) => {
          if (index > 2) return;
          return (
            <div className="col-span-1" key={index}>
              <div className="h-[250px] flex justify-center flex-col overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.nameCategory}
                  className="h-full object-cover w-full rounded-lg transform transition duration-200 hover:scale-110"
                />
              </div>
              <span className="block text-center text-[#333333] font-semibold mt-1">
                {item.nameCategory}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Category;
