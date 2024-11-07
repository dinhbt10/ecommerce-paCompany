import { useEffect, useState } from "react";
import { getBook } from "../../../apis/product";
import { useTranslation } from "react-i18next";
import Card from "../../../components/Card";
import CarouselProd from "../../../components/CarouselProd";

const CategoryDetail = ({ categoryName, idBook }) => {
  const [books, setBooks] = useState([]);
  const { t } = useTranslation();

  const getProductList = async () => {
    const res = await getBook();
    setBooks(res.data.data ? res.data.data.books : []);
  };

  const data = books.filter(
    (item) => item.categoryName === categoryName && item.idBook !== idBook
  );

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div className="mt-4 mb-2">
      {data.length > 0 && (
        <Card title={t("text-43")}>
          <CarouselProd
            data={data?.map((item) => ({
              image: item.imageUrls[0],
              name: item.nameBook,
              id: item.idBook,
              price: item.price,
            }))}
          />
        </Card>
      )}
      {data.length === 0 && (
        <Card title={t("text-44")}>
          <CarouselProd
            data={books
              .filter((item) => item.idBook !== idBook)
              ?.map((item) => ({
                image: item.imageUrls[0],
                name: item.nameBook,
                id: item.idBook,
                price: item.price,
              }))}
          />
        </Card>
      )}
    </div>
  );
};

export default CategoryDetail;
