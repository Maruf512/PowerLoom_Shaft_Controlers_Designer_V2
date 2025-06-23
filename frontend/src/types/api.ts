export type HttpMethodsType =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | "HEAD"
  | "OPTIONS";

export interface ApiClientOptionsType
  extends Omit<RequestInit, "body" | "headers"> {
  method?: HttpMethodsType;
  headers?: Record<string, string>;
  body?: unknown;
}

export type ApiErrorType = string | null;

export interface ApiResponseType<T> {
  data: T | null;
  error: ApiErrorType;
  status: number;
}
