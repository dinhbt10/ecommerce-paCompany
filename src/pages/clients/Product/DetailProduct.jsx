import { Table } from "flowbite-react";

const DetailProduct = ({ book }) => {
  return (
    <div className="bg-white border border-gray-200 mt-4">
      <div className="text-[#505050] text-[14px] font-bold uppercase border-b border-[#ebebeb] p-4">
        Thông tin chi tiết
      </div>
      <div className="p-4">
        <Table className="border" hoverable>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                Công ty phát hành
              </Table.Cell>
              <Table.Cell className="p-2">{book.distributorName}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                Năm Xuất Bản
              </Table.Cell>
              <Table.Cell className="p-2">{book.year_publisher}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                Kích Thước
              </Table.Cell>
              <Table.Cell className="p-2">{book.size}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                Số Trang
              </Table.Cell>
              <Table.Cell className="p-2">{book.page_number}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                Tác Giả
              </Table.Cell>
              <Table.Cell className="p-2">{book.author}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                Nhà Xuất bản
              </Table.Cell>
              <Table.Cell className="p-2">{book.publisherName}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                Barcode
              </Table.Cell>
              <Table.Cell className="p-2">{book.barcode}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default DetailProduct;
