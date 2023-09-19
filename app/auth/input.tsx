import { InputHTMLAttributes, forwardRef } from "react";

const ErrorText = ({ children }: { children?: string }) => (
  <>{children && <p className="text-xs text-red-500 pt-1">{children}</p>}</>
);

type TextFieldParams = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "className"
> & {
  label: string;
  error?: string;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldParams>(
  function Comp({ label, error, ...inputParams }, ref) {
    return (
      <>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
        <div className="mt-2">
          <input
            ref={ref}
            {...inputParams}
            className="block border-0 focus:ring-2 focus:ring-blue-600 focus:ring-inset p-2.5 pl-5 ring-1 ring-inset rounded-lg shadow-sm sm:leading-6 sm:text-sm w-full"
          />
        </div>
        <ErrorText>{error}</ErrorText>
      </>
    );
  }
);
