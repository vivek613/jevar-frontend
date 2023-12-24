import { Card, Typography } from "@material-tailwind/react";

interface TableInterface {
  TableData: any[];
}
const Table: React.FC<TableInterface> = ({ TableData }) => {
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
    "sales_user",
    "adhar_card_image",
    "bank_ifsc_code",
    "bank_number",

    "pancard_image",
  ];
  const columns = Object.keys(TableData[0])
    .filter((key) => !excludedColumns.includes(key))
    .map((key) => ({
      key,
      title: key.charAt(0).toUpperCase() + key.slice(1),
    }));

  return (
    <table className="w-auto text-left mt-3">
      <thead>
        <tr>
          {columns.map((head, index) => (
            <th
              key={index}
              className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
            >
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                {head.title}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {TableData.map((row, index) => {
          const isLast = index === TableData.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={row._id}>
              {columns.map((column) => (
                <td key={column.key} className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {row[column.key]}
                  </Typography>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
