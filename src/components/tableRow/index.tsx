import React from "react";

interface TableRowProps {
  serialNumber: number;
  percentageFunded: number | string;
  amountPledged: number | string;
}

const TableRow: React.FC<TableRowProps> = ({ serialNumber, percentageFunded, amountPledged }) => {
  return (
    <tr>
      <td>{serialNumber}</td>
      <td>{percentageFunded}</td>
      <td>{amountPledged}</td>
    </tr>
  );
};

export default TableRow;
