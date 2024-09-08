const category = [
  {
    url: "https://i.pinimg.com/564x/ae/f2/31/aef2313b29299b238c5a574606c7d92f.jpg",
    title: "Sách giáo khoa",
  },
  {
    url: "https://i.pinimg.com/564x/2e/8a/6f/2e8a6fda7863efa1a2cbfdca0ef091bb.jpg",
    title: "Sách giáo khoa",
  },
  {
    url: "https://i.pinimg.com/564x/18/f4/c5/18f4c5922c8dea23caf9656328a1f573.jpg",
    title: "Sách giáo khoa",
  },
];

const Category = () => {
  return (
    <>
      <div className="flex w-full my-5 items-center justify-center flex-col">
        <span className="font-bold text-[30px]">Danh mục</span>
        <span className="text-[#666666] text-[18px]">
          Những loại sách phổ biến nhất
        </span>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-1 lg:gap-4 sm:gap-2 mx-16 px-20">
        {category.map((item, index) => (
          <div className="col-span-1" key={index}>
            <div className="h-[400px] flex justify-center flex-col overflow-hidden">
              <img
                src={item.url}
                alt={item.title}
                className="h-full object-cover w-full rounded-lg transform transition duration-200 hover:scale-110"
              />
            </div>
            <span className="block text-center text-[#333333] font-semibold mt-1">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
