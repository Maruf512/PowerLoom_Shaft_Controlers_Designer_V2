"use client";

import AuthForm from "@/components/layout/AuthForm";
import useStateCustom from "@/hooks/useAuth";
import apiClient from "@/lib/apiClient";
import { AuthFieldsTypes, AuthUserResponseType } from "@/types/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const { error, loading, setData, setLoading, setError } =
    useStateCustom<AuthUserResponseType>();
  const router = useRouter();

  const handleSubmit = async (values: Record<AuthFieldsTypes, string>) => {
    setError(undefined);
    setLoading(true);

    const { data, error, status } = await apiClient<AuthUserResponseType>(
      "login",
      {
        method: "POST",
        body: values,
      }
    );

    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
    }

    setLoading(false);

    if (status >= 200 && status < 300 && !error) {
      setData(data);
      router.push("/");
    } else {
      setError(error || "Registration failed");
    }
  };

  return (
    <>
      <p className="absolute top-2 left-2">{error && JSON.stringify(error)}</p>
      <div className="h-screen flex items-center justify-center">
        <AuthForm
          fields={["email", "password"]}
          title={"Login to your account"}
          subtitle="Enter your credentials below to login to your account"
          submitHandler={handleSubmit}
          isLoading={loading}
          footerContent={
            <div>
              Don't have an account?{" "}
              <Link className="underline hover:scale-105" href="/auth/register">
                Sign Up
              </Link>
            </div>
          }
        />
      </div>
    </>
  );
};

export default page;
