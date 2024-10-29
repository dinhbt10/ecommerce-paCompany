import { BsBox2 } from "react-icons/bs";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GoCreditCard } from "react-icons/go";
import { TfiCup } from "react-icons/tfi";
import { useTranslation } from "react-i18next";

const UiBox = () => {
  const { t } = useTranslation();

  return (
    <div className="grid grid-cols-4 bg-white my-3 border">
      <div className="col-span-1">
        <div className="flex items-center border-r gap-3 m-4">
          <div className="pl-3">
            <BsBox2 className="text-2xl" />
          </div>
          <div className="">
            <div className="uppercase text-[14px]">{t("text-54")}</div>
            <div className="uppercase text-[12px] text-[#5F6C72]">
              {t("text-55")}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex items-center border-r gap-3 m-4">
          <div className="pl-3">
            <TfiCup className="text-2xl" />
          </div>
          <div className="">
            <div className="uppercase text-[14px]">{t("text-56")}</div>
            <div className="uppercase text-[12px] text-[#5F6C72]">
              {t("text-57")}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex items-center border-r gap-3 m-4">
          <div className="pl-3">
            <GoCreditCard className="text-2xl" />
          </div>
          <div className="">
            <div className="uppercase text-[14px]">{t("text-58")}</div>
            <div className="uppercase text-[12px] text-[#5F6C72]">
              {t("text-59")}
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-1">
        <div className="flex items-center gap-3 m-4">
          <div className="pl-3">
            <TfiHeadphoneAlt className="text-2xl" />
          </div>
          <div className="">
            <div className="uppercase text-[14px]">{t("text-60")}</div>
            <div className="uppercase text-[12px] text-[#5F6C72]">
              {t("text-61")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UiBox;
