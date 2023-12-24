import { Dialog } from "@material-tailwind/react";
import React from "react";
import Table from "../components/Table";
const GraphModel = (props: any) => {
  const xData = Object.keys(props.data);
  const TableData = xData.map((key) => props.data[key]);
  console.log("data", TableData);
  return (
    <React.Fragment>
      <Dialog
        size="xl"
        open={props.open}
        handler={props.handleOpen}
        // className="bg-transparent shadow-none"
      >
        {/* max-w-[24rem] */}
        <div className="p-5">
          <h2> income deatils</h2>
          <Table TableData={TableData} />
        </div>
      </Dialog>
    </React.Fragment>
  );
};

export default GraphModel;
