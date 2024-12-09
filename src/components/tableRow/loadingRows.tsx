import React from "react";

const LoadingRow: React.FC = () => {
  return (
    <tr>
      <td className="skeleton" colSpan={3}></td>
    </tr>
  );
};

export default LoadingRow;
