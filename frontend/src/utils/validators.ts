import { AuthFieldsTypes } from "@/types/auth";

export const authFormValidator = (
  formData: Record<AuthFieldsTypes, string>
) => {
  const newErrors = {} as Record<AuthFieldsTypes, string>;

  if (formData.email.trim() === "") {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (formData.password === "") {
    newErrors.password = "Password is required";
  } else if (formData.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  if (formData.username === "") {
    newErrors.username = "Username is required";
  }

  return newErrors;
};
