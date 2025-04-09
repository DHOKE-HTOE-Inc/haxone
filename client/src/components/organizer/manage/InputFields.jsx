// TextField
export const TextField = ({
  label,
  name,
  value,
  onChange,
  error,
  ...props
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 mb-2 text-sm">
      {label}
    </label>
    <input
      id={name}
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      className={`w-full h-12 px-4 py-2 text-sm border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-xs focus:outline-none ${
        error ? "" : "focus:ring-2 focus:ring-accent"
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// NumberField
export const NumberField = ({
  label,
  name,
  value,
  onChange,
  error,
  ...props
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 mb-2 text-sm">
      {label}
    </label>
    <input
      id={name}
      type="number"
      name={name}
      value={value || ""}
      onChange={onChange}
      className={`w-full h-12 px-4 py-2 text-sm border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-xs focus:outline-none ${
        error ? "" : "focus:ring-2 focus:ring-accent"
      }`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// TextAreaField
export const TextAreaField = ({
  label,
  name,
  value,
  onChange,
  error,
  maxLength,
  ...props
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 mb-2 text-sm">
      {label}
    </label>
    <div className="relative">
      <textarea
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        maxLength={maxLength}
        className={`w-full h-12 px-4 py-2 text-sm border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-xs focus:outline-none ${
          error ? "" : "focus:ring-2 focus:ring-accent"
        } resize-none pr-12`}
        {...props}
      />
      {maxLength && (
        <span className="absolute bottom-2 right-2 text-xs text-gray-500">
          {value?.length || 0}/{maxLength}
        </span>
      )}
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// DateField
export const DateField = ({
  label,
  name,
  value,
  onChange,
  error,
  ...props
}) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 mb-2 text-sm">
      {label}
    </label>
    <input
      id={name}
      type="date"
      name={name}
      value={value || ""}
      onChange={onChange}
      className={`w-full h-12 px-4 py-2 text-sm border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-xs focus:outline-none ${
        error ? "" : "focus:ring-2 focus:ring-accent"
      } appearance-none`}
      {...props}
    />
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

// FileField
export const FileField = ({ label, name, onChange, file, error, ...props }) => (
  <div>
    <label className="block text-gray-700 mb-2 text-sm">{label}</label>
    <div className="flex items-center gap-3">
      <input
        type="file"
        id={name}
        name={name}
        onChange={onChange}
        className="hidden"
        {...props}
      />
      <label
        htmlFor={name}
        className={`px-4 py-2 text-sm border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-xs hover:bg-gray-50 cursor-pointer`}
      >
        Choose file
      </label>
      <span className="text-sm text-gray-500">
        {file instanceof File
          ? file.name
          : file
          ? file.split("/").pop()
          : "No file chosen"}
      </span>
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);
