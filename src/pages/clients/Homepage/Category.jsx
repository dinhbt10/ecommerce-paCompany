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
        <span className="text-[#666666] text-sm">
          Những loại sách phổ biến nhất
        </span>
      </div>
      <div className="flex flex-row w-full justify-center gap-10">
        {category.map((item, index) => (
          <div
            key={index}
            className="h-[400px] lg:w-[300px] md:w-[100%] flex justify-center flex-col gap-3"
          >
            <img
              src={item.url}
              alt={item.title}
              className="h-full object-fill w-full rounded-lg"
            />
            <span className="text-center text-[#333333] font-semibold">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Category;
