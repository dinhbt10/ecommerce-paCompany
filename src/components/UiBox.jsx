import { BsBox2 } from "react-icons/bs";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { GoCreditCard } from "react-icons/go";
import { TfiCup } from "react-icons/tfi";

const UiBox = () => {
  return (
    <div className="grid grid-cols-4 bg-white my-3 border">
      <div className="col-span-1">
        <div className="flex items-center border-r gap-3 m-4">
          <div className="pl-3">
            <BsBox2 className="text-2xl" />
          </div>
          <div className="">
            <div className="uppercase text-[14px]">Vận chuyển nhanh</div>
            <div className="uppercase text-[12px] text-[#5F6C72]">
              Giao hàng trong 24h
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
            <div className="uppercase text-[14px]">24h trả lại</div>
            <div className="uppercase text-[12px] text-[#5F6C72]">
              Hoàn 100% giá trị
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
            <div className="uppercase text-[14px]">Thanh toán an toàn</div>
            <div className="uppercase text-[12px] text-[#5F6C72]">
              Tiền của bạn được đảm bảo
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
            <div className="uppercase text-[14px]">Hỗ trợ 24/7</div>
            <div className="uppercase text-[12px] text-[#5F6C72]">
              Liên hệ/tin nhắn trực tiếp
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UiBox;
