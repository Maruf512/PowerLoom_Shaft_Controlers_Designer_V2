import Dashboard from "@/components/layout/Dashboard";
import apiClient from "@/lib/apiClient";

const page = async () => {
  const { data, error, status } = await apiClient<{ success: boolean }>(
    "login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        username: "sami",
        email: "sami@gmail.com",
        password: "928374gfbusjd",
      },
      credentials: "include",
    }
  );

  console.log(error);

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default page;
