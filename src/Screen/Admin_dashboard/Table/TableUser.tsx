import { Table } from "antd";
import React from "react";
interface TableInterface {
  TableData: any[];
  columns: any[];
}
const TableUser: React.FC<TableInterface> = ({ TableData, columns }) => {
  return <Table dataSource={TableData} columns={columns} />;
};

export default TableUser;
