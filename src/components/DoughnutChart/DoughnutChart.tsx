import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { forwardRef, ForwardedRef } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

import "./styles.css";
import { Statistic } from "@/types";

const TRANSLATE: Record<string, string> = {
  scenarios: "Сценарии",
  lists: "Списки",
  dialogs: "Диалоги",
};

interface DoughnutChartProps {
  title: string;
  data: Array<{ id: keyof Statistic; value: number }>;
  onHover: (statisticIndex: number | null) => void;
  hoveredItem: keyof Statistic | null;
}

const DoughnutChart = forwardRef(
  (
    { data, onHover, hoveredItem, title }: DoughnutChartProps,
    ref: ForwardedRef<ChartJS<"doughnut"> | undefined>
  ) => {
    const getAmount = () => {
      let amount;

      if (hoveredItem) {
        amount = data.find((item) => item.id === hoveredItem)?.value;
      } else {
        amount = data.reduce((acc, item) => {
          return acc + item.value;
        }, 0);
      }

      return amount;
    };

    return (
      <div className="doughnut">
        <div className="doughnut__info">
          <h3 className="doughnut__title">{TRANSLATE[title]}</h3>
          <p className="doughnut__amount">{getAmount()}</p>
        </div>
        <Doughnut
          ref={ref}
          data={{
            labels: ["active", "inactive", "completed"],
            datasets: [
              {
                label: "dataset",
                data: data.map((item) => item.value),
                backgroundColor: ["#B9B1C0", "#D0CBD6", "#F2F0F5"],
              },
            ],
          }}
          options={{
            elements: {
              arc: {
                hoverBackgroundColor: "#FCCF82",
              },
            },
            cutout: "85%",
            onHover: (event, activeEls) => {
              if (activeEls[0]) {
                onHover(activeEls[0].index);
              } else {
                onHover(null);
              }
            },
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: false,
              },
            },
          }}
        />
      </div>
    );
  }
);

export default DoughnutChart;
