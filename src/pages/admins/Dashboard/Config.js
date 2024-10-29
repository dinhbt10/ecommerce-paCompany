import { formatNumber } from "../../../utils/common";

export const optionChart = {
  series: [],
  chart: {
    type: "bar",
    height: 200,
    toolbar: {
      show: false,
    },
  },
  colors: ["#cd5f5f"],
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  fill: {
    opacity: 1,
  },
  xaxis: {
    categories: [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ],
  },
  yaxis: {
    min: 0,
    tickAmount: 5,
    labels: {
      formatter: (value) => `${formatNumber(value)}`,
    },
  },
};
