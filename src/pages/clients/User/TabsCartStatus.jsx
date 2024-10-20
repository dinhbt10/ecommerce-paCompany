import { useState } from "react";

const TabItem = ({ title, active, onClick }) => {
  return (
    <button
      className={`py-3 px-5 text-sm font-medium ${
        active ? "text-[#cd5f5f] border-b-2 border-[#cd5f5f]" : "text-gray-500"
      }`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const TabsStatus = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="flex border-b mb-4 w-full">
        {tabs.map((tab, index) => (
          <TabItem
            key={index}
            title={tab.title}
            active={activeTab === index}
            onClick={() => setActiveTab(index)}
          />
        ))}
      </div>

      <div className="p-4">{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabsStatus;
