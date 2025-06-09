export type AuthFieldsNameType = "email" | "password" | "username";

export interface AuthFieldsTypes {
  fieldName: AuthFieldsNameType;
  fieldType: "text" | "password" | "email" | "url";
  placeholder?: string;
}

export type AuthFormTypes = {
  fields: AuthFieldsTypes[];
  submitHandler: (data: Record<AuthFieldsNameType, string>) => void;
  title: string;
  subtitle: string;
  footerContent: React.ReactNode;
  isLoading?: boolean;
};

export interface AuthUserResponseType {
  id: number;
  username: string;
  email: string;
}
