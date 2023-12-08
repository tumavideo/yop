import FormHeading from "./FormHeading";

export default function InputContainer({
  children,
  desc,
  title,
  numcolumns = 6,
}) {
  return (
    <>
      <FormHeading title={title} desc={desc} />
      <div
        className={`mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-${numcolumns}`}
      >
        {children}
      </div>
    </>
  );
}
