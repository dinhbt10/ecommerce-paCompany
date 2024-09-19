import { Button } from "flowbite-react";
import { createCategory, getCategory } from "../../../apis/category";
import { useEffect, useState } from "react";
import { ModalComponents } from "../../../components/Modal";

const Categories = () => {
  const [category, setCategory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const getCategoryApi = async () => {
    const res = await getCategory();
    setCategory(res.data.data.categories);
  };

  useEffect(() => {
    getCategoryApi();
  }, []);

  const handleAddCategory = async (name, file) => {
    const formData = new FormData();
    formData.append("nameCategory", name);
    formData.append("image", file[0]);
    const res = await createCategory(formData);
    if (res.data.success) {
      setIsOpen(false);
      getCategoryApi();
    }
  };
  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Danh mục</h1>
        <Button className="outline-none" onClick={() => setIsOpen(true)}>
          + Thêm danh mục
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {category.map((item) => (
          <div
            key={item.idCategory}
            className="bg-white shadow-md rounded-md overflow-hidden"
          >
            <img
              src={item.imageUrl}
              alt={item.nameCategory}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.nameCategory}</h2>
            </div>
          </div>
        ))}
      </div>
      <ModalComponents
        openModal={isOpen}
        setOpenModal={setIsOpen}
        title="Thêm mới danh mục"
        handleAddCategory={handleAddCategory}
      />
    </div>
  );
};

export default Categories;
