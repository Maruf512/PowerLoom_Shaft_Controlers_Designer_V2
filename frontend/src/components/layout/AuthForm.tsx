"use client";

import {
  AuthFieldsNameType,
  AuthFieldsTypes,
  AuthFormTypes,
} from "@/types/auth";
import { cn } from "@/utils/cn";
import { authFormValidator } from "@/utils/validators";
import React, { useMemo, useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import Button from "../ui/Button";

const AuthForm = ({
  fields,
  submitHandler,
  title,
  subtitle,
  footerContent,
  isLoading,
}: AuthFormTypes) => {
  const initialFormData = useMemo(() => {
    return fields.reduce((acc, field) => {
      acc[field.fieldName] = "";
      return acc;
    }, {} as Record<AuthFieldsNameType, string>);
  }, [fields]);

  const [formData, setFormData] = useState(initialFormData);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState(
    {} as Record<AuthFieldsNameType, string>
  );

  const formHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errors = authFormValidator(formData);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    submitHandler(formData);
  };

  const handelChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: AuthFieldsNameType
  ) => {
    setFormData({ ...formData, [field]: e.target.value });
    setErrors({ ...errors, [field]: "" });
  };

  return (
    <form
      onSubmit={(e) => formHandler(e)}
      className="flex flex-col items-center px-8 py-10 rounded-radius-sm md:w-[35rem] w-[90%] bg-surface border border-muted shadow"
    >
      <div className="w-full space-y-4">
        <div className="mb-6 space-y-1">
          <h3 className="text-xl text-strong font-semibold">{title}</h3>
          <p className="text-basec line-clamp-2">{subtitle}</p>
        </div>
        {fields.map((field) => (
          <div key={field.fieldName} className="flex flex-col gap-1 w-full">
            <label
              htmlFor={field.fieldType}
              className="capitalize text-basec font-medium"
            >
              {field.fieldName}
            </label>
            <div className="relative">
              <input
                className={cn(
                  "",
                  errors[field.fieldName] && "outline-1 outline-error"
                )}
                type={field.fieldType}
                id={field.fieldName}
                name={field.fieldName}
                value={formData[field.fieldName]}
                placeholder={field.placeholder}
                onChange={(e) => handelChange(e, field.fieldName)}
              />
              {field.fieldType === "password" && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer px-1 py-1 hover:bg-on-surface duration-200 rounded-sm
                "
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                </button>
              )}
            </div>
            <p className="text-xs text-error">
              {errors && errors[field.fieldName]}
            </p>
          </div>
        ))}
      </div>
      <Button className="mt-6 w-full" isLoading={isLoading}>
        {title.split(" ")[0]}
      </Button>
      <div className="mt-2 text-basec">{footerContent}</div>
    </form>
  );
};

export default AuthForm;
