export type AuthFieldsTypes = "username" | "email" | "password";

export type AuthFormTypes = {
  fields: AuthFieldsTypes[];
  submitHandler: (data: Record<AuthFieldsTypes, string>) => void;
  title: string;
  subtitle: string;
  footerContent: React.ReactNode;
  isLoading?: boolean;
};

export interface AuthUserResponseType {
  success: boolean;
  id: number;
}
