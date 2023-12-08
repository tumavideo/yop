import Input from "./Input";
import InputContainer from "./InputContainer";

export default function Form({
  inputs,
  onChange,
  desc = "",
  title = "",
  handleSubmit = {},
  values = {},
}) {
  return (
    <div className="Form w-full">
      <div className="relative grid grid-cols-1 gap-x-16 lg:grid-cols-1 lg:px-0 xl:gap-x-12">
        <form onSubmit={handleSubmit}>
          <InputContainer title={title} desc={desc} numcolumns={2}>
            {inputs.map((i) => (
              <Input
                key={i.id}
                props={i}
                values={values}
                handleChange={onChange}
              />
            ))}
          </InputContainer>
        </form>
      </div>
    </div>
  );
}
