import Tabs from "./Tabs";
import { CgProfile } from "react-icons/cg";
import { MdOutlineEventNote } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import CartStatus from "./CartStatus";
import Profile from "./Profile";
import { useTranslation } from "react-i18next";

const User = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const active = searchParams.get("active");
  const tabData = [
    {
      title: t("text-83"),
      content: <Profile />,
      icons: <CgProfile />,
      check: false,
    },
    {
      title: t("text-84"),
      content: <CartStatus />,
      icons: <MdOutlineEventNote />,
      check: true,
    },
  ];
  return (
    <div className="max-w-[1100px] mx-auto pt-5">
      <Tabs tabs={tabData} active={active} />
    </div>
  );
};

export default User;
