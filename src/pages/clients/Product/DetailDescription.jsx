const DetailDescription = ({ description }) => {
  return (
    <div className="bg-white border border-gray-200 mt-4">
      <div className="text-[#505050] text-[14px] font-bold uppercase border-b border-[#ebebeb] p-4">
        Mô tả sản phẩm
      </div>
      <div className="p-4">{description}</div>
    </div>
  );
};

export default DetailDescription;
