import { useState } from "react";

const TabItem = ({ title, active, onClick, icons }) => {
  return (
    <button
      className={`flex items-center gap-2 p-3 text-md font-medium w-full text-left ${
        active ? "text-[#cd5f5f]" : "text-gray-500"
      }`}
      onClick={onClick}
    >
      {icons}
      {title}
    </button>
  );
};

const Tabs = ({ tabs, active }) => {
  const [activeTab, setActiveTab] = useState(active ? Number(active) : 0);
  return (
    <div className="flex">
      <div className="flex flex-col pr-4">
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            title={tab.title}
            active={activeTab === index}
            icons={tab.icons}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>

      <div className="p-4 flex-1">{tabs[activeTab].content}</div>
    </div>
  );
};

export default Tabs;
