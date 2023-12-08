export default function Input({ handleChange, props, values }) {
  const inputClass =
    "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm";

  const {
    className = "3",
    desc = "",
    label,
    name = "name",
    type = "text",
  } = props;

  const newProps = {
    ...props,
    autoComplete: name,
    id: name,
    label: label || name,
  };

  return (
    <div className={`sm:col-span-${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        {type === "textarea" && (
          <textarea
            {...props}
            onChange={handleChange}
            className={inputClass}
            defaultValue={values.howHelp || ""}
          />
        )}
        {(type === "text" || type === "email" || type === "number") && (
          <input
            {...props}
            onChange={handleChange}
            value={values[name]}
            className={inputClass}
            // defaultValue={user[values.name]}
          />
        )}
        {type === "select" && (
          <select {...props} onChange={handleChange} className={inputClass}>
            <option disabled selected>
              -- select an option --
            </option>
            {props.options.map((o, i) => {
              if (o === values.occupation || o === values.industry) {
                return (
                  <option key={i} selected>
                    {o}
                  </option>
                );
              } else {
                return <option key={i}>{o}</option>;
              }
            })}
          </select>
        )}
      </div>
      {type === "textarea" && (
        <p className="mt-2 text-sm text-gray-500">{desc}</p>
      )}
    </div>
  );
}
