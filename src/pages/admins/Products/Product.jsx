import { Table, Button, Pagination } from "flowbite-react";
import { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { getBook } from "../../../apis/product";
import { useNavigate } from "react-router-dom";
import { formatNumber } from "../../../utils/common";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const tableHead = [
  {
    id: 1,
    name: "STT",
  },
  {
    id: "1",
    name: "Ảnh",
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
    name: "NXB",
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
    name: "NSX",
  },
];

const Product = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);

  const onPageChange = (page) => setCurrentPage(page - 1);

  const getProductList = async () => {
    const res = await getBook();
    if (res.data.data.totalPages) {
      setTotalPage(res.data.data.totalPages);
    }

    setBooks(res.data.data ? res.data.data.books : []);
  };

  const exportToExcel = () => {
    // Tạo worksheet từ dữ liệu JSON
    const worksheet = XLSX.utils.json_to_sheet(books);

    // Tạo workbook và thêm worksheet vào workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Xuất workbook thành file Excel
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, `products.xlsx`);
  };

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div>
      <div className="flex mb-4 justify-between items-center">
        <h1 className="text-2xl font-semibold">Sản phẩm</h1>
        <div className="flex justify-center gap-2">
          <Button color="light" onClick={exportToExcel}>
            Xuất Excel
          </Button>
          <button
            className="outline-none bg-[#d76e6e] px-4 rounded text-white"
            onClick={() => navigate("/admin/products/create")}
          >
            + Thêm sản phẩm
          </button>
        </div>
      </div>
      <Table hoverable>
        <Table.Head>
          {tableHead.map((item) => (
            <Table.HeadCell className="text-[14px]" key={item.id}>
              {item.name}
            </Table.HeadCell>
          ))}
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {books?.map((item, index) => (
            <Table.Row
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>
                <div className="pl-1">
                  {(currentPage + 1 - 1) * 10 + index + 1}
                </div>
              </Table.Cell>
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
              <Table.Cell>{formatNumber(item.price)}</Table.Cell>
              <Table.Cell>{item.quantity}</Table.Cell>
              <Table.Cell>{item.categoryName}</Table.Cell>
              <Table.Cell>{item.publisherName}</Table.Cell>
              <Table.Cell>
                <div
                  className="flex justify-center items-center gap-2 cursor-pointer"
                  onClick={() => navigate(`/admin/products/${item.idBook}`)}
                >
                  <RiEdit2Fill fontSize={20} />
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
          {books?.length === 0 && (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell colSpan={9}>
                <div className="flex justify-center items-center h-[300px]">
                  Không có dữ liệu
                </div>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default Product;
