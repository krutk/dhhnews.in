// components/Tabs.js
import { useState } from "react";

const Tabs = ({ tabs }: any) => {
    const [activeTab, setActiveTab] = useState(tabs[0].id);

    return (
        <div className="mt-8">
            <div className="flex space-x-4 mb-4">
                {tabs.map((tab: any) => (
                    <button
                        key={tab.id}
                        className={`pr-4 py-2 ${activeTab === tab.id ? "underline underline-offset-8" : ""
                            }`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div>
                {tabs.map((tab: any) => (
                    <div key={tab.id} className={`${activeTab !== tab.id && "hidden"}`}>
                        {tab.content}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Tabs;
