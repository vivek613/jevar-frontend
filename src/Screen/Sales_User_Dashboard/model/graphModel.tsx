import { Dialog } from "@material-tailwind/react";
import React from "react";
import ReactECharts from "echarts-for-react";
const GraphModel = (props: any) => {
  console.log("props", props);
  const xData = Object.keys(props.data);
  const leftYData = xData.map((key) => props.data[key]?.length);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      formatter: function (params: any) {
        const axisValue = params[0].axisValue;
        const totalPayAmount = params.reduce(
          (sum: number, param: any) => sum + param.data,
          0
        );

        return `${axisValue}<br/>Total Pay Amount: ${totalPayAmount}`;
      },
    },
    xAxis: {
      type: "category",
      data: xData,
      name: "register",
      nameLocation: "middle", // You can also use 'start' or 'end' for nameLocation
      nameGap: 50, // Gap between axis name and axis line
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
      axisLabel: {
        interval: 0,
        rotate: 15,
        fontSize: 12,
        formatter: function (value: string, index: number) {
          if (index % 1 === 0) {
            return value;
          }
          return "\n"; // Use newline to create gap between labels
        },
      },
    },
    yAxis: [
      {
        type: "value",
        name: "Count",
        position: "left",
        data: leftYData,
      },
    ],
    series: [
      {
        name: "Total Pay Amount",
        type: "bar",
        yAxisIndex: 0,
        data: xData.map((key) => {
          const categoryData = props.data[key] || [];
          return categoryData.reduce(
            (sum: number, item: any) => sum + item.pay_amount,
            0
          );
        }),
      },
    ],
  };
  return (
    <React.Fragment>
      <Dialog
        size="md"
        open={props.open}
        handler={props.handleOpen}
        // className="bg-transparent shadow-none"
      >
        {/* max-w-[24rem] */}
        <div className="p-5">
          <h2> income deatils</h2>
          <ReactECharts
            option={option}
            style={{ height: "400px", width: "100%" }}
            opts={{ renderer: "svg" }}
          />
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default GraphModel;
