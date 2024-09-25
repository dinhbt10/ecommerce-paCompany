import { Button } from "flowbite-react";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { getBook } from "../../../apis/product";
import { useNavigate } from "react-router-dom";

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
    id: "3",
    name: "Tác giả",
  },
  {
    id: "4",
    name: "Nhà xuất bản",
  },
  {
    id: "5",
    name: "Giá",
  },
  {
    id: "6",
    name: "Số lượng",
  },
  {
    id: "7",
    name: "Thể loại",
  },
  {
    id: "8",
    name: "Nhà sản xuất",
  },
];

const Product = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const getProductList = async () => {
    const res = await getBook();
    setBooks(res.data.data ? res.data.data.books : []);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Sản phẩm</h1>
        <div className="flex justify-center gap-2">
          <Button color="light">Xuất Excel</Button>
          <Button
            className="outline-none"
            onClick={() => navigate("/admin/products/create")}
          >
            + Thêm sản phẩm
          </Button>
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
          {books?.map((item) => (
            <Table.Row
              key={item.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>
                <img
                  src={item.imageUrls[0]}
                  alt={item.imageUrls}
                  className="w-[100px] h-[80px] object-cover rounded-md"
                />
              </Table.Cell>
              <Table.Cell>{item.nameBook}</Table.Cell>
              <Table.Cell>{item.author}</Table.Cell>
              <Table.Cell>{item.publisherName}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.price}</Table.Cell>
              <Table.Cell>{item.categoryName}</Table.Cell>
              <Table.Cell>{item.publisherName}</Table.Cell>
              <Table.Cell>
                <div className="flex justify-center items-center gap-2 cursor-pointer">
                  <RiEdit2Fill fontSize={20} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
          {books?.length === 0 && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell colSpan={8}>
                <div className="flex justify-center items-center h-[300px]">
                  Không có dữ liệu
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default Product;
