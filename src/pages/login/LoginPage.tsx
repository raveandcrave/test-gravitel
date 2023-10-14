import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import LoginForm from "@/components/LoginForm";
import { ME } from "@/apollo/user";

const LoginPage = () => {
  const navigate = useNavigate();
  const { data: user, loading } = useQuery(ME);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return <LoginForm />;
};

export default LoginPage;
