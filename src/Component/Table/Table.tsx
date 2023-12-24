import { Table } from "antd";

interface TableInterface {
  TableData: any[];
}
const TableComponents: React.FC<TableInterface> = ({ TableData }) => {
  if (!TableData || TableData.length === 0) {
    // Handle empty data or loading state
    return null;
  }
  const excludedColumns = [
    "password",
    "createdAt",
    "updatedAt",
    "pincode",
    "state",
    "id",
    "_id",
    "__v",
    "adhar_card_image",
    "bank_ifsc_code",
    "bank_number",
    "pancard_image",
    "is_verify_account",
  ];
  const columns = Object.keys(TableData[0])
    .filter((key) => !excludedColumns.includes(key))
    .map((key) => ({
      key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
      dataIndex: key,
    }));

  return <Table dataSource={TableData} columns={columns} />;
};

export default TableComponents;
