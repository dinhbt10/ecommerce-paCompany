import Tabs from "./Tabs";
import { CgProfile } from "react-icons/cg";
import { MdOutlineEventNote } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import CartStatus from "./CartStatus";

const tabData = [
  {
    title: "Tài khoản của tôi",
    content: <div>Đây là nội dung của Profile.</div>,
    icons: <CgProfile />,
  },
  {
    title: "Đơn mua",
    content: <CartStatus />,
    icons: <MdOutlineEventNote />,
  },
];

const User = () => {
  const [searchParams] = useSearchParams();
  const active = searchParams.get("active");

  return (
    <div className="max-w-[1100px] mx-auto pt-5">
      <Tabs tabs={tabData} active={active} />
    </div>
  );
};

export default User;
