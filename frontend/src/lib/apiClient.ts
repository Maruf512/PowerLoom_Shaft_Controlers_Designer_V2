import {
  ApiClientOptionsType,
  ApiErrorType,
  ApiResponseType,
} from "@/types/api";
import { baseUrl } from "@/utils/baseUrl";

const apiClient = async <T = any>(
  url: string,
  options: ApiClientOptionsType = {}
): Promise<ApiResponseType<T>> => {
  const { method = "GET", body, ...restOpts } = options;

  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers || {}),
  };

  const config: RequestInit = {
    method,
    headers: defaultHeaders,
    ...(body && method !== "GET" ? { body: JSON.stringify(body) } : {}),
    credentials: "include",
    ...restOpts,
  };

  try {
    const res = await fetch(`${baseUrl()}/${url}`, config);
    const status = res.status;
    let data: T | null = null;
    let error: ApiErrorType = null;

    const contentType = res.headers.get("content-type");

    console.log(res);

    if (contentType && contentType.includes("application/json")) {
      const json = await res.json();
      if (res.ok) {
        data = json;
      } else {
        error = json?.message ?? json?.detail ?? json ?? "An error occurred";
      }
    } else if (!res.ok) {
      error = "Non-JSON error response";
    }

    return { data, error, status };
  } catch (err: any) {
    return {
      data: null,
      error: err.message ?? "An unexpected error occurred",
      status: 500,
    };
  }
};

export default apiClient;
