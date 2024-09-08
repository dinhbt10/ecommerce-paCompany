import { Button } from "flowbite-react";

const data = [
  {
    id: "12",
    name: "Kinh doanh",
    imageURL: "https://img.lovepik.com/photo/40150/2973.jpg_wh860.jpg",
  },
  {
    id: "11",
    name: "Tâm lý học",
    imageURL: "https://images.unsplash.com/photo-1558478551-1a378f63328e",
  },

  {
    id: "2",
    name: "Phi hư cấu",
    imageURL: "https://images.unsplash.com/photo-1551434678-e076c223a692",
  },
  {
    id: "3",
    name: "Giả tưởng",
    imageURL:
      "https://t4.ftcdn.net/jpg/05/50/33/47/360_F_550334715_0d2cdaljV4Xd3x7yVUhRxfmLLEUyMdXr.jpg",
  },
  {
    id: "4",
    name: "Khoa học viễn tưởng",
    imageURL:
      "https://png.pngtree.com/background/20230401/original/pngtree-sci-fi-city-future-planet-background-picture-image_2252912.jpg",
  },
  {
    id: "5",
    name: "Trinh thám",
    imageURL: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
  },
  {
    id: "6",
    name: "Tiểu sử",
    imageURL: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
  },
  {
    id: "7",
    name: "Lịch sử hư cấu",
    imageURL: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
  },
  {
    id: "8",
    name: "Lãng mạn",
    imageURL:
      "https://c4.wallpaperflare.com/wallpaper/474/577/264/people-couples-sea-sunset-love-life-happiness-walking-photography-shadow-coupe-walking-along-sea-shore-under-sunset-wallpaper-preview.jpg",
  },
  {
    id: "9",
    name: "Kinh dị",
    imageURL:
      "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2024/04/anh-ma-kinh-di-thumb.jpg",
  },
  {
    id: "10",
    name: "Phát triển bản thân",
    imageURL: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
  },
  {
    id: "1",
    name: "Tiểu thuyết",
    imageURL: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
  },
];

const Categories = () => {
  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Danh mục</h1>
        <Button>+ Thêm danh mục</Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-md overflow-hidden"
          >
            <img
              src={item.imageURL}
              alt={item.name}
              className="w-full h-44 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
