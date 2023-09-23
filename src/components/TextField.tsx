import { HTMLInputTypeAttribute, ReactNode, forwardRef } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  type?: HTMLInputTypeAttribute;
  label: string;
  name: string;
  register: UseFormRegister<any>;
  required: boolean;
  errors: FieldErrors;
  errorMessage: ReactNode;
};

const TextField = ({ label, register, required, name, type, errors, errorMessage }: Props) => {
  return (
    <div>
      <label>
        <span className={errors[name] ? "text-red-500" : ""}>{label}</span>
        <input
          type={type}
          {...register(name, {
            required,
          })}
          className={
            "bg-gray-50 p-2 h-10 border mt-2 border-gray-300 rounded-md w-full " +
            (errors[name] ? "text-red-500 border-red-500 outline-red-500" : "")
          }
        />
      </label>
      <div className={"mt-1 text-xs text-red-500 font-medium " + (errors[name] ? "opacity-1" : "opacity-0")}>
        {errorMessage}
      </div>
    </div>
  );
};

export default TextField;
