import Input from "./Input";
import InputContainer from "./InputContainer";

export default function Form({
  desc,
  inputs,
  handleSubmit,
  onChange,
  title,
  values = {},
}) {
  return (
    <div className="Form">
      <div className="relative mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-x-16 lg:grid-cols-1 lg:px-8 xl:gap-x-12">
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
