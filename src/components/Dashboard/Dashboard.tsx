import { useQuery } from "@apollo/client";

import { DASHBOARD } from "@/apollo/dashboard";
import DashboardItem from "@/components/DashboardItem";
import { DashboardStat } from "@/types";

import "./styles.css";

const DASHBOARD_STAT: Array<keyof DashboardStat> = [
  "scenarios",
  "lists",
  "dialogs",
];

interface Dashboard {
  dashboard: DashboardStat;
}

const Dashboard = () => {
  const { data, loading } = useQuery<Dashboard>(DASHBOARD);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <div className="dashboard">
      {DASHBOARD_STAT.map((item) => (
        <DashboardItem
          key={item}
          statistic={data.dashboard[item]}
          title={item}
        />
      ))}
    </div>
  );
};

export default Dashboard;
