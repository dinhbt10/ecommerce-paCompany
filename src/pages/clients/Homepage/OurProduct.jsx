const data = Array.from({ length: 8 }).fill({
  src: "https://i.pinimg.com/564x/e5/5c/fc/e55cfcd4872ba593d189c82d6a642f6f.jpg",
  title: "Sách giáo khoa",
  price: "100.000 VND",
});

const OurProduct = () => {
  return (
    <div className="mt-10">
      <span className="flex justify-center text-[#3A3A3A] font-bold text-3xl mb-5">
        Sản phẩm của chúng tôi
      </span>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 sm:grid-cols-1 gap-4 mx-16">
        {data.map((item, index) => (
          <div className="col-span-1" key={index}>
            <div className="h-[300px] flex justify-center flex-col gap-1">
              <img
                src={item.src}
                alt={item.title}
                className="h-[70%] object-cover w-full"
              />
              <div className="bg-[#F4F5F7] py-5">
                <span className="block text-center text-[#333333] font-semibold text-[20px]">
                  {item.title}
                </span>
                <span className="block text-center text-[#333333] font-semibold text-[16px]">
                  {item.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurProduct;
