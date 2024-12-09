import { useState, useEffect } from "react";
import { IKickstarterProjectData } from "./types";
import Pagination from "./components/pagination";
import TableRow from "./components/tableRow";
import LoadingRow from "./components/tableRow/loadingRows";

const apiURL = "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";
const recordsPerPage = 5;

const App = () => {
  const [data, setData] = useState<IKickstarterProjectData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiURL);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / recordsPerPage);

  const currentData = data.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="app">
      <h1>Saas Labs</h1>
      <table className="styled-table">
        <thead>
          <tr>
            <th align="center">S.No.</th>
            <th align="center">Percentage Funded</th>
            <th align="center">Amount Pledged</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <LoadingRow />
          ) : (
            <>
              {currentData.map((item, index) => (
                <TableRow key={index} serialNumber={(currentPage - 1) * recordsPerPage + index + 1} percentageFunded={item["percentage.funded"]} amountPledged={item["amt.pledged"]} />
              ))}
            </>
          )}
        </tbody>
      </table>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
