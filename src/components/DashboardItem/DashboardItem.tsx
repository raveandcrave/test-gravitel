import { useState, useRef } from "react";
import { Chart as ChartJS } from "chart.js";
import cn from "classnames";

import DoughnutChart from "@/components/DoughnutChart";
import { Statistic } from "@/types";

import "./styles.css";

const STATISTIC: Array<keyof Statistic> = ["active", "inactive", "completed"];

const TRANSLATE: Record<string, string> = {
  active: "Активных",
  inactive: "Неактивных",
  completed: "Завершенных",
};

interface DashboardItemProps {
  statistic: Statistic;
  title: string;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ statistic, title }) => {
  const [hoveredItem, setHoveredItem] = useState<keyof Statistic | null>(null);

  const chartRef = useRef<ChartJS<"doughnut">>(null);

  const data = STATISTIC.map((item) => ({
    id: item,
    value: statistic[item],
  }));

  const onHover = (statisticIndex: number | null) => {
    if (typeof statisticIndex === "number") {
      setHoveredItem(STATISTIC[statisticIndex]);
    } else {
      setHoveredItem(null);
    }
  };

  const onMouseEnter = (statisticItem: keyof Statistic, index: number) => {
    setHoveredItem(statisticItem);
    chartRef.current?.setActiveElements([{ datasetIndex: 0, index }]);
    chartRef.current?.update();
  };

  const onMouseLeave = () => {
    chartRef.current?.setActiveElements([]);
    setHoveredItem(null);
  };

  const setAllStatisticActive = () => {
    const activeElements = Object.keys(statistic)
      .filter((key) => key !== "__typename")
      .map((key, index) => ({
        datasetIndex: 0,
        index,
      }));
    chartRef.current?.setActiveElements(activeElements);
    chartRef.current?.update();
  };

  return (
    <div>
      <DoughnutChart
        ref={chartRef}
        data={data}
        onHover={onHover}
        hoveredItem={hoveredItem}
        title={title}
      />
      <div>
        <div
          onMouseEnter={setAllStatisticActive}
          onMouseLeave={onMouseLeave}
          className="dashboard-info"
        >
          <p>Всего:</p>
          <p>{statistic.active + statistic.completed + statistic.inactive}</p>
        </div>
        {STATISTIC.map((item, index) => (
          <div
            key={item}
            onMouseEnter={() => onMouseEnter(item, index)}
            onMouseLeave={onMouseLeave}
            className={cn("dashboard-info", {
              "dashboard-info--active": hoveredItem === item,
            })}
          >
            <p>{TRANSLATE[item]}</p>
            <p>{statistic[item]}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardItem;
