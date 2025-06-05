export const baseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (baseUrl) {
    return baseUrl;
  }

  return "http://localhost:8000/designer";
};
