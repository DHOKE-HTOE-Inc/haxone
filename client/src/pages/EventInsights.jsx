import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import GeneralTab from "../components/organizer/insights/GeneralTab";
import ApplicationsTab from "../components/organizer/insights/ApplicationsTab";
import TeamsTab from "../components/organizer/insights/TeamsTab";
import ChatTab from "../components/organizer/insights/ChatTab";

const EventInsights = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    eventName: "Tech Innovators Summit 2025",
    description: "Tech Innovators Summit 2025 is a premier gathering ...",
    location: "Bago, Myanmar",
    maxParticipants: "250",
    startDate: "2025-08-10",
    endDate: "2025-08-14",
    applicationDeadline: "2025-07-10",
    submissionDeadline: "2025-08-13",
    reward: "1000",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <GeneralTab formData={formData} handleChange={handleChange} />;
      case "applications":
        return <ApplicationsTab />;
      case "teams":
        return <TeamsTab />;
      case "chat":
        return <ChatTab />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-130px)]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pt-3">
        <Link to="/manage-events">
          <ArrowLeft size={24} />
        </Link>
        <h1 className="text-2xl font-medium">Event Insights</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-8 border-b border-gray-200 px-8">
        {["general", "applications", "teams", "chat"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-1 py-2 capitalize ${
              activeTab === tab
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-primary"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Dynamic Tab Content */}
      <div className="flex-1 overflow-hidden">{renderTabContent()}</div>
    </div>
  );
};

export default EventInsights;
