import { Button } from "flowbite-react";
import { Table } from "flowbite-react";
import { FaRegTrashAlt } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";

const tableHead = [
  {
    id: "1",
    name: "Ảnh sản phẩm",
  },
  {
    id: "2",
    name: "Tên sản phẩm",
  },
  {
    id: "5",
    name: "Giá",
  },
  {
    id: "3",
    name: "Số lượng",
  },
  {
    id: "4",
    name: "Thể loại",
  },
];

const data = [
  {
    id: "1",
    imageURL: "https://img.lovepik.com/photo/40150/2973.jpg_wh860.jpg",
    name: "Sách 1",
    price: 100000,
    quantity: 5,
    category: "Tiểu thuyết",
  },
  {
    id: "2",
    imageURL: "https://images.unsplash.com/photo-1558478551-1a378f63328e",
    name: "Sách 2",
    price: 105000,
    quantity: 15,
    category: "Phi hư cấu",
  },
  {
    id: "3",
    imageURL:
      "https://t4.ftcdn.net/jpg/05/50/33/47/360_F_550334715_0d2cdaljV4Xd3x7yVUhRxfmLLEUyMdXr.jpg",
    name: "Sách 3",
    price: 110000,
    quantity: 25,
    category: "Giả tưởng",
  },
  {
    id: "4",
    imageURL:
      "https://png.pngtree.com/background/20230401/original/pngtree-sci-fi-city-future-planet-background-picture-image_2252912.jpg",
    name: "Sách 4",
    price: 115000,
    quantity: 35,
    category: "Khoa học viễn tưởng",
  },
  {
    id: "5",
    imageURL: "https://images.unsplash.com/photo-1507842217343-583bb7270b66",
    name: "Sách 5",
    price: 120000,
    quantity: 45,
    category: "Trinh thám",
  },
  {
    id: "6",
    imageURL: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e",
    name: "Sách 6",
    price: 125000,
    quantity: 55,
    category: "Tiểu sử",
  },
  {
    id: "7",
    imageURL: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
    name: "Sách 7",
    price: 130000,
    quantity: 65,
    category: "Lịch sử hư cấu",
  },
  {
    id: "8",
    imageURL:
      "https://c4.wallpaperflare.com/wallpaper/474/577/264/people-couples-sea-sunset-love-life-happiness-walking-photography-shadow-coupe-walking-along-sea-shore-under-sunset-wallpaper-preview.jpg",
    name: "Sách 8",
    price: 135000,
    quantity: 75,
    category: "Lãng mạn",
  },
  {
    id: "9",
    imageURL:
      "https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2024/04/anh-ma-kinh-di-thumb.jpg",
    name: "Sách 9",
    price: 140000,
    quantity: 85,
    category: "Kinh dị",
  },
  {
    id: "10",
    imageURL: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    name: "Sách 10",
    price: 145000,
    quantity: 95,
    category: "Phát triển bản thân",
  },
];

const Product = () => {
  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Sản phẩm</h1>
        <div className="flex justify-center gap-2">
          <Button color="light">Xuất Excel</Button>
          <Button>+ Thêm sản phẩm</Button>
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          {tableHead.map((item) => (
            <Table.HeadCell key={item.id}>{item.name}</Table.HeadCell>
          ))}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>
                <img
                  src={item.imageURL}
                  alt={item.name}
                  className="w-[100px] h-[80px] object-cover rounded-md"
                />
              </Table.Cell>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.category}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-center items-center gap-2">
                  <RiEdit2Fill fontSize={20} />
                  <FaRegTrashAlt />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Product;
