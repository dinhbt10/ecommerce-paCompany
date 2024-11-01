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

export const optionChart1 = {
  series: [], // Các giá trị cho các phần của biểu đồ
  chart: {
    type: "pie",
    height: 200,
    toolbar: {
      show: false,
    },
  },
  labels: [
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
  colors: [
    "#cd5f5f",
    "#ffa500",
    "#ffd700",
    "#3cb371",
    "#20b2aa",
    "#4682b4",
    "#1e90ff",
    "#9370db",
    "#ff6347",
    "#ff69b4",
    "#dda0dd",
    "#98fb98",
  ],
  dataLabels: {
    enabled: true,
    formatter: (value) => `${formatNumber(value)}%`, // Định dạng giá trị hiển thị
  },
  stroke: {
    show: true,
    colors: ["#fff"],
  },
  fill: {
    opacity: 1,
  },
  legend: {
    position: "bottom",
  },
};
