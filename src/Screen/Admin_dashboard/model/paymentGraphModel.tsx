import { Dialog } from "@material-tailwind/react";
import React from "react";
import ReactECharts from "echarts-for-react";

const PaymentGraphModel = (props: any) => {
  console.log("props", props);
  const { jewellerPaymentDone, jewellerPaymentNotDone } = props.data;

  const mergedData = [
    ...jewellerPaymentDone.map((item: any) => ({
      ...item,
      type: true,
    })),
    ...jewellerPaymentNotDone.map((item: any) => ({
      ...item,
      type: false,
    })),
  ];

  const xData = mergedData.map((item) => item.jeweller_name.name);
  const uniqueXData = [...new Set(xData)];
  const paymentDoneData = mergedData
    .filter((item) => item.type === true)
    .map((item) => item.count);
  const paymentNotDoneData = mergedData
    .filter((item) => item.type === false)
    .map((item) => item.count);
  console.log("payment", paymentDoneData, paymentNotDoneData);
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      formatter: function (params: any) {
        // Iterate through all data points in the tooltip
        const lines = params.map((param: any) => {
          const seriesName = param.seriesName;
          const data = param.data;
          return `${seriesName}: ${data}`;
        });

        // Display data with line breaks in the tooltip
        return `${params[0].axisValue}<br/>${lines.join("<br/>")}`;
      },
    },
    xAxis: {
      type: "category",
      data: uniqueXData,
      name: "Jeweller Name",
      nameLocation: "middle",
      nameGap: 30,
      nameTextStyle: {
        fontSize: 14,
        fontWeight: "bold",
      },
    },
    yAxis: [
      {
        type: "value",
        name: "Amount",
        position: "left",
      },
    ],
    series: [
      {
        name: "Payment Done",
        type: "bar",
        data: paymentDoneData,
        itemStyle: {
          color: "blue",
        },
      },
      {
        name: "Payment Not Done",
        type: "bar",
        data: paymentNotDoneData,
        itemStyle: {
          color: "red",
        },
      },
    ],
  };

  return (
    <React.Fragment>
      <Dialog size="sm" open={props.open} handler={props.handleOpen}>
        <div className="p-5">
          <h2>Total Payment details</h2>
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

export default PaymentGraphModel;
