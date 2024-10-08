import { FaCartShopping } from "react-icons/fa6";

const Cart = () => {
  return (
    <div className="">
      <div className="bg-white">
        <div className="flex justify-between items-center max-w-[1100px] mx-auto py-5">
          <div className="text-xl text-[#cd5f5f] font-semibold">
            Giỏ hàng <FaCartShopping className="inline-block mx-1" />
            (10)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
