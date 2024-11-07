import { useEffect, useState } from "react";
import { getBook } from "../../../apis/product";
import { useTranslation } from "react-i18next";
import Card from "../../../components/Card";
import CarouselProd from "../../../components/CarouselProd";
import instance from "../../../utils/http";

const OurProduct = () => {
  const [books, setBooks] = useState([]);
  const [bookSales, setBookSales] = useState([]);
  const { t } = useTranslation();

  const getProductList = async () => {
    const res = await getBook();
    setBooks(res.data.data.books || []);
  };
  const getProductPrice = async () => {
    const res = await instance.get("/book/books-sales");
    setBookSales(res.data.data || []);
  };

  useEffect(() => {
    getProductList();
    getProductPrice();
  }, []);

  return (
    <div className="mt-5 max-w-[1100px] mx-auto">
      <div className="flex flex-col gap-6">
        <Card title={t("text-157")}>
          <CarouselProd
            data={bookSales?.map((item) => ({
              image: item.imageUrls[0],
              name: item.bookName,
              id: item.bookId,
              price: item.bookPrice,
            }))}
          />
        </Card>
        <Card title={t("text-158")}>
          <CarouselProd
            data={books
              ?.map((item) => ({
                image: item.imageUrls[0],
                name: item.nameBook,
                id: item.idBook,
                price: item.price,
                createAt: item.createAt,
              }))
              .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))}
          />
        </Card>
        <Card title={t("text-159")}>
          <CarouselProd
            data={books?.map((item) => ({
              image: item.imageUrls[0],
              name: item.nameBook,
              id: item.idBook,
              price: item.price,
              createAt: item.createAt,
            }))}
          />
        </Card>
      </div>
    </div>
  );
};

export default OurProduct;
