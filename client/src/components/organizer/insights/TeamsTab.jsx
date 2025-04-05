import { useState } from "react";
import { Filter, Search, Trash2, SortDesc } from "lucide-react";
import TablePagination from "./TablePagination";
import Table from "./Table";

const TeamsTab = () => {
  {/* Mock data for teams */}
  const [teams] = useState([
    {
      id: 1,
      teamName: "IT Lu Nge",
      eventName: "ICTMM",
      projectUrl: "https://project.vercel.app",
      submittedAt: "14 Mar, 2025",
      status: "none",
    },
    {
      id: 2,
      teamName: "IT Lu Nge",
      eventName: "ICTMM",
      projectUrl: "https://project.vercel.app",
      submittedAt: "14 Mar, 2025",
      status: "none",
    },
    {
      id: 3,
      teamName: "IT Lu Nge",
      eventName: "ICTMM",
      projectUrl: "https://project.vercel.app",
      submittedAt: "14 Mar, 2025",
      status: "none",
    },
    {
      id: 4,
      teamName: "IT Lu Nge",
      eventName: "ICTMM",
      projectUrl: "https://project.vercel.app",
      submittedAt: "14 Mar, 2025",
      status: "winner",
    },
    {
      id: 5,
      teamName: "IT Lu Nge",
      eventName: "ICTMM",
      projectUrl: "https://project.vercel.app",
      submittedAt: "14 Mar, 2025",
      status: "none",
    },
    {
      id: 6,
      teamName: "IT Lu Nge",
      eventName: "ICTMM",
      projectUrl: "https://project.vercel.app",
      submittedAt: "14 Mar, 2025",
      status: "none",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const columns = [
    { key: "id", header: "Id", width: "100px" },
    { key: "teamName", header: "Team Name", width: "180px" },
    { key: "eventName", header: "Event Name", width: "200px" },
    {
      key: "projectUrl",
      header: "Project URL",
      width: "280px",
      render: (item) => (
        <a
          href={item.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {item.projectUrl}
        </a>
      ),
    },
    { key: "submittedAt", header: "Submitted at", width: "160px" },
    {
      key: "status",
      header: "Status",
      width: "80px",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-lg capitalize ${
            item.status === "winner"
              ? "text-green-600 bg-green-50 border border-green-600"
              : "text-gray-600 bg-gray-50 border border-gray-400"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  const handleSelectAll = (e) => {
    setSelectedItems(e.target.checked ? teams.map((team) => team.id) : []);
  };

  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Action buttons */}
      <div className="flex justify-end gap-4 px-3 py-6">
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50">
          <Filter size={20} />
          <span>Filter</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50">
          <SortDesc size={20} />
          <span>Sort</span>
        </button>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50">
          <Search size={20} />
          <span>Search</span>
        </button>
        {/* Delete button */}
        <button
          className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg ${
            selectedItems.length > 0
              ? "bg-red-500 hover:bg-red-600 transition-colors text-white"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          disabled={selectedItems.length === 0}
        >
          <Trash2 size={20} /> Delete
        </button>
      </div>

      {/* Table */}
      <Table
        columns={columns}
        data={teams}
        selectedItems={selectedItems}
        onSelectAll={handleSelectAll}
        onSelectItem={handleSelectItem}
      />

      {/* Pagination */}
      <div>
        <TablePagination />
      </div>
    </div>
  );
};

export default TeamsTab;
