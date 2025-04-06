import { useState } from "react";
import { Filter, Search, Trash2, SortDesc } from "lucide-react";
import TablePagination from "./TablePagination";
import Table from "./Table";

const ApplicationsTab = () => {
  {/* Mock data for applications */}
  const [applications] = useState([
    {
      id: 1,
      name: "Alice",
      email: "Alice@gmail.com",
      showcaseUrl: "https://alice.vercel.app",
      appliedAt: "14 Mar, 2025",
      status: "pending",
    },
    {
      id: 2,
      name: "Alice",
      email: "Alice@gmail.com",
      showcaseUrl: "https://alice.vercel.app",
      appliedAt: "14 Mar, 2025",
      status: "accepted",
    },
    {
      id: 3,
      name: "Alice",
      email: "Alice@gmail.com",
      showcaseUrl: "https://alice.vercel.app",
      appliedAt: "14 Mar, 2025",
      status: "rejected",
    },
    {
      id: 4,
      name: "Alice",
      email: "Alice@gmail.com",
      showcaseUrl: "https://alice.vercel.app",
      appliedAt: "14 Mar, 2025",
      status: "rejected",
    },
    {
      id: 5,
      name: "Alice",
      email: "Alice@gmail.com",
      showcaseUrl: "https://alice.vercel.app",
      appliedAt: "14 Mar, 2025",
      status: "rejected",
    },
    {
      id: 6,
      name: "Alice",
      email: "Alice@gmail.com",
      showcaseUrl: "https://alice.vercel.app",
      appliedAt: "14 Mar, 2025",
      status: "rejected",
    },
    {
      id: 7,
      name: "Alice",
      email: "Alice@gmail.com",
      showcaseUrl: "https://alice.vercel.app",
      appliedAt: "14 Mar, 2025",
      status: "rejected",
    },
    {
      id: 8,
      name: "Alice",
      email: "Alice@gmail.com",
      showcaseUrl: "https://alice.vercel.app",
      appliedAt: "14 Mar, 2025",
      status: "rejected",
    },
    {
      id: 9,
      name: "Alice",
      email: "Alice@gmail.com",
      showcaseUrl: "https://alice.vercel.app",
      appliedAt: "14 Mar, 2025",
      status: "rejected",
    },
    {
      id: 10,
      name: "Alice",
      email: "Alice@gmail.com",
      showcaseUrl: "https://alice.vercel.app",
      appliedAt: "14 Mar, 2025",
      status: "rejected",
    },
  ]);

  const [selectedItems, setSelectedItems] = useState([]);

  const columns = [
    { key: "id", header: "Id", width: "100px" },
    { key: "name", header: "Name", width: "180px" },
    { key: "email", header: "Email", width: "200px" },
    {
      key: "showcaseUrl",
      header: "Showcase URL",
      width: "280px",
      render: (item) => (
        <a
          href={item.showcaseUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline"
        >
          {item.showcaseUrl}
        </a>
      ),
    },
    { key: "appliedAt", header: "Applied at", width: "160px" },
    {
      key: "status",
      header: "Status",
      width: "80px",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-lg capitalize ${
            item.status === "pending"
              ? "text-yellow-600 border border-yellow-600 bg-yellow-50"
              : item.status === "accepted"
              ? "text-green-600 border border-green-600 bg-green-50"
              : "text-red-600 border border-red-600 bg-red-50"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];

  {/* Handlers for checkbox selections */}
  const handleSelectAll = (e) => {
    setSelectedItems(e.target.checked ? applications.map((app) => app.id) : []);
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
        data={applications}
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

export default ApplicationsTab;
