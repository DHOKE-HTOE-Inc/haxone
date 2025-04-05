const Table = ({ columns, data, selectedItems, onSelectAll, onSelectItem }) => {
  return (
    <div className="flex-1 overflow-auto px-2">
      <table className="w-full table-fixed">
        {/* Table header */}
        <thead className="border-b border-gray-200">
          <tr className="text-left text-sm sticky top-0 bg-white">
            <th className="pb-4 font-normal w-[40px]">
              <input
                type="checkbox"
                onChange={onSelectAll}
                checked={selectedItems.length === data.length}
                className="w-4 h-4 border-2 border-gray-300 rounded accent-black"
              />
            </th>
            {columns.map((column) => (
              <th
                key={column.key}
                className={`pb-4 font-normal w-[${column.width}] text-muted-gray`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        {/* Table body */}
        <tbody className="text-sm">
          {data.map((item) => (
            <tr
              key={item.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-4">
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item.id)}
                  onChange={() => onSelectItem(item.id)}
                  className="w-4 h-4 border-2 border-gray-300 rounded accent-black"
                />
              </td>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
