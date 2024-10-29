import { useTranslation } from "react-i18next";

const DetailDescription = ({ description }) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white border border-gray-200 mt-4">
      <div className="text-[#505050] text-[14px] font-bold uppercase border-b border-[#ebebeb] p-4">
        {t("text-45")}
      </div>
      <div className="p-4">{description}</div>
    </div>
  );
};

export default DetailDescription;
