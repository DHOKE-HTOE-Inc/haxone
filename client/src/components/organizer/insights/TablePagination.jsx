const TablePagination = () => {
  return (
    <div className="flex justify-end gap-2 mt-6 mx-2">
      <button className="px-4 py-2 border border-gray-300 rounded-md">
        &lt;
      </button>
      <button className="px-4 py-2 bg-gray-100 rounded-md border border-gray-300">
        1
      </button>
      <button className="px-4 py-2 border border-gray-300 rounded-md">2</button>
      <button className="px-4 py-2 border border-gray-300 rounded-md">3</button>
      <button className="px-4 py-2 border border-gray-300 rounded-md">4</button>
      <button className="px-4 py-2 border border-gray-300 rounded-md">
        &gt;
      </button>
    </div>
  );
};

export default TablePagination;
