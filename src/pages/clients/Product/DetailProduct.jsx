import { Table } from "flowbite-react";
import { useTranslation } from "react-i18next";

const DetailProduct = ({ book }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white border border-gray-200 mt-4">
      <div className="text-[#505050] text-[14px] font-bold uppercase border-b border-[#ebebeb] p-4">
        {t("text-46")}
      </div>
      <div className="p-4">
        <Table className="border" hoverable>
          <Table.Body className="divide-y">
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                {t("text-47")}
              </Table.Cell>
              <Table.Cell className="p-2">{book.distributorName}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                {t("text-48")}
              </Table.Cell>
              <Table.Cell className="p-2">{book.year_publisher}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                {t("text-49")}
              </Table.Cell>
              <Table.Cell className="p-2">{book.size}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                {t("text-50")}
              </Table.Cell>
              <Table.Cell className="p-2">{book.page_number}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                {t("text-51")}
              </Table.Cell>
              <Table.Cell className="p-2">{book.author}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                {t("text-52")}
              </Table.Cell>
              <Table.Cell className="p-2">{book.publisherName}</Table.Cell>
            </Table.Row>
            <Table.Row className="bg-white">
              <Table.Cell className="w-[180px] text-[#0a0a0a] font-medium border p-2">
                {t("text-53")}
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
