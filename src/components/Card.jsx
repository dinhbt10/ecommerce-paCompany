const Card = ({ title, children }) => {
  return (
    <div className="flex flex-col rounded">
      <div className="border-t border-x px-4 py-3 font-semibold text-lg uppercase bg-white">
        {title}
      </div>
      <div className="border-x border-b">{children}</div>
    </div>
  );
};

export default Card;
