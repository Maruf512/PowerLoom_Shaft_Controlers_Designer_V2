import {
  ApiClientOptionsType,
  ApiErrorType,
  ApiResponseType,
} from "@/types/api";
import { baseUrl } from "@/utils/baseUrl";
import { getCookie1 } from "@/utils/getCSRF";
import parseApiError from "@/utils/normalizePythonError";

const apiClient = async <T>(
  url: string,
  options: ApiClientOptionsType = {}
): Promise<ApiResponseType<T>> => {
  const { method = "GET", body, headers, ...restOpts } = options;
  const defaultHeaders = {
    "Content-Type": "application/json",
    "X-CSRFToken": getCookie1("csrftoken") || "",
    Accept: "application/json",
    ...headers,
  };

  const config: RequestInit = {
    method,
    headers: defaultHeaders,
    ...(body && method !== "GET" ? { body: JSON.stringify(body) } : {}),
    credentials: "include",
    ...restOpts,
  };

  const attemptRequest = async (urlString: string) => {
    const res = await fetch(`${baseUrl()}/${urlString}/`, config);
    const status = res.status;
    let data: T | null = null;
    let error: ApiErrorType = null;

    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const json = await res.json();
      if (res.ok) {
        data = json as T;
      } else {
        error = parseApiError(json?.message ?? json?.detail ?? json);
      }
    } else if (!res.ok) {
      error = "Non-JSON error response";
    }

    return { data, error, status };
  };

  try {
    const { data, error, status } = await attemptRequest(url);
    console.log("=============after eletial fetch====================");

    if (status === 401) {
      const {
        data: ref,
        error: err,
        status: sta,
      } = await attemptRequest("refresh");
      console.log("=============after refresh====================");
      console.log(ref, err, sta);
      const { data, error, status } = await attemptRequest(url);
      console.log("=============after second fetch====================");

      return { data, error, status };
    }

    return { data, error, status };
  } catch (err: unknown) {
    let error = "An unexpected error occurred";

    if (err instanceof Error) {
      error = err.message;
    } else if (typeof err === "string") {
      error = err;
    }

    return {
      data: null,
      error: error,
      status: 500,
    };
  }
};

export default apiClient;
