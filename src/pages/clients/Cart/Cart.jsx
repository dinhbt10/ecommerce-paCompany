import { FaCartShopping } from "react-icons/fa6";
import instance from "../../../utils/http";
import { formatNumber, getUserInfoLocalStorage } from "../../../utils/common";
import { useEffect, useState } from "react";
import { Checkbox } from "flowbite-react";
import classNames from "classnames";
import { toast } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const userInfo = getUserInfoLocalStorage();
  const navigate = useNavigate();
  const getCart = async (idUser) => {
    const res = await instance.get(`/cart/list?userId=${idUser}`);
    const { data } = res.data;
    setCarts(
      data.cartItems.map((item) => ({
        ...item,
        checked: false,
      }))
    );
  };

  const handleChangCount = async (type, cart, index) => {
    try {
      let cloneDateCart = [...carts];
      const res = await instance.put(
        `/cart/update-quantity?bookId=${cart.bookId}&userId=${userInfo.idUser}&operation=${type}`
      );
      const { success } = res.data;
      if (success) {
        const payload = {
          ...cloneDateCart[index],
          quantity:
            cloneDateCart[index].quantity + (type === "increase" ? 1 : -1),
        };
        cloneDateCart[index] = payload;
        setCarts(cloneDateCart);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeStatus = (index) => {
    let cloneDateCart = [...carts];
    const payload = {
      ...cloneDateCart[index],
      checked: !cloneDateCart[index].checked,
    };
    cloneDateCart[index] = payload;
    setCarts(cloneDateCart);
  };

  const handleDeleteBookInCart = async (idBook) => {
    try {
      const res = await instance.delete("/cart/delete", {
        params: {
          idBook,
          userId: userInfo.idUser,
        },
      });
      const { success } = res.data;
      if (success) {
        getCart(userInfo.idUser);
        toast.success("Xoá sản phẩm thành công", {
          autoClose: 1500,
          position: "bottom-right",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    const isEmtyProduct = carts.every((item) => !item.checked);
    const isChecked = carts.filter((item) => item.checked);
    if (isEmtyProduct) {
      return toast.error("Bạn chưa chọn sản phẩm nào để đặt hàng", {
        autoClose: 1500,
        position: "bottom-right",
      });
    }
    navigate("/checkout", { state: { data: isChecked } });
  };

  useEffect(() => {
    if (userInfo.idUser) {
      getCart(userInfo.idUser);
    }
  }, [userInfo.idUser]);

  useEffect(() => {
    const handleIsCheckedAll = () => {
      const cloneDataCart = [...carts];
      cloneDataCart.forEach((item) => {
        item.checked = isCheckedAll;
      });
      setCarts(cloneDataCart);
    };
    handleIsCheckedAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheckedAll]);

  return (
    <div className="">
      <div className="bg-white">
        <div className="flex justify-between items-center max-w-[1100px] mx-auto py-5">
          <div className="text-2xl text-[#cd5f5f] font-semibold">
            Giỏ hàng <FaCartShopping className="inline-block mx-1" />(
            {carts.length})
          </div>
        </div>
      </div>
      <div className="max-w-[1100px] mx-auto w-full pt-5 relative">
        <div className="grid bg-white grid-cols-2 py-3 px-10">
          <div className="col-span-1">
            <span className="text-sm flex items-center gap-3 justify-start">
              <Checkbox
                checked={isCheckedAll}
                onChange={() => setIsCheckedAll(!isCheckedAll)}
              />
              Sản Phẩm
            </span>
          </div>
          <div className="col-span-1">
            <div className="grid grid-cols-5">
              <div className="col-span-1 flex justify-center items-center">
                Đơn Giá
              </div>
              <div className="col-span-2 flex justify-center items-center">
                Số Lượng
              </div>
              <div className="col-span-1 flex justify-center items-center">
                Số Tiền
              </div>
              <div className="col-span-1 flex justify-center items-center">
                Thao Tác
              </div>
            </div>
          </div>
        </div>
        {carts &&
          carts.length > 0 &&
          carts.map((cart, index) => (
            <div
              className="grid bg-white grid-cols-2 py-3 px-10 mt-5"
              key={index}
            >
              <div className="col-span-1">
                <span className="text-sm flex items-center gap-3 justify-start">
                  <Checkbox
                    checked={cart.checked}
                    onChange={() => handleChangeStatus(index)}
                  />
                  <div className="flex justify-start items-center gap-2">
                    <div className="bg-black rounded">
                      <img
                        src={cart.imageUrls[0]}
                        alt="anh"
                        className="min-w-[80px] min-h-[80px] max-w-[80px] max-h-[80px] w-full h-full object-contain"
                      />
                    </div>
                    <div className="">{cart.title}</div>
                  </div>
                </span>
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-5 h-full">
                  <div className="col-span-1 flex justify-center items-center">
                    {formatNumber(cart.price)}
                  </div>
                  <div className="col-span-2 flex justify-center items-center">
                    <div className="flex justify-center items-center">
                      <div
                        className={classNames("border px-3 py-1", {
                          "cursor-not-allowed": cart.quantity === 1,
                          "cursor-pointer": !!(cart.quantity > 1),
                        })}
                        onClick={() => {
                          if (cart.quantity === 1) return;
                          handleChangCount("decrease", cart, index);
                        }}
                      >
                        -
                      </div>
                      <div className="border px-5 py-1 w-[80px] text-center">
                        {cart.quantity}
                      </div>
                      <div
                        className="border px-3 py-1 cursor-pointer"
                        onClick={() =>
                          handleChangCount("increase", cart, index)
                        }
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="col-span-1 flex justify-center items-center text-[#cd5f5f] font-medium">
                    {formatNumber(cart.price * cart.quantity)}
                  </div>
                  <div
                    className="col-span-1 flex justify-center items-center cursor-pointer"
                    onClick={() => handleDeleteBookInCart(cart.bookId)}
                  >
                    Xóa
                  </div>
                </div>
              </div>
            </div>
          ))}
        {carts && carts.length > 0 && (
          <div className="flex bg-white justify-between items-center py-3 px-5 mt-3 sticky bottom-0 rounded border">
            <div className="flex justify-start items-center gap-3">
              <Checkbox
                checked={isCheckedAll}
                onChange={() => setIsCheckedAll(!isCheckedAll)}
              />
              <div className="">Chọn tất cả ({carts.length})</div>
            </div>
            <div className="flex items-center justify-start gap-3">
              <div className="">
                Tổng thanh toán ({carts.filter((item) => item.checked).length}{" "}
                Sản phẩm):{" "}
                <span className="text-lg text-[#cd5f5f]">
                  {carts.filter((item) => item.checked).length > 0
                    ? formatNumber(
                        carts.filter((item) => item.checked).length === 1
                          ? carts.filter((item) => item.checked)[0].quantity *
                              carts.filter((item) => item.checked)[0].price
                          : carts
                              .filter((item) => item.checked)
                              .reduce(
                                (a, b) =>
                                  a.price * a.quantity + b.price * b.quantity
                              )
                      )
                    : carts.filter((item) => item.checked).length}
                </span>
              </div>
              <button
                className="px-10 bg-[#cd5f5f] text-sm text-white rounded py-2"
                onClick={handleSubmit}
              >
                Mua hàng
              </button>
            </div>
          </div>
        )}

        {carts.length === 0 && (
          <div className="flex w-full min-h-[300px] flex-col mt-3 bg-white justify-center items-center gap-1">
            <FiShoppingCart className="text-[40px]" />
            <div className="text-lg font-semibold">Giỏ hàng trống</div>
            <div className="text-sm text-gray-500">
              Có vẻ như bạn vẫn chưa đưa ra lựa chọn của mình
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
