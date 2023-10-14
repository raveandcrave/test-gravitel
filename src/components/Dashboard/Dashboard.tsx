import { useQuery } from "@apollo/client";

import { DASHBOARD } from "@/apollo/dashboard";

const Dashboard = () => {
  const { data, error, loading } = useQuery(DASHBOARD);

  console.log("data", data);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return <div>Dashboard</div>;
};

export default Dashboard;
