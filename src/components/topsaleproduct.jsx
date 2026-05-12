import React, { useEffect, useState } from "react";
import { fetctopsaleproduct } from "../services/topsaleproduct";

const Topsaleproduct = () => {
  const [Comid, setCompanyId] = useState(null);
  const [admindata, setAdmindata] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const adminuserid = localStorage.getItem("adminuserid");
    if (adminuserid) setCompanyId(Number(adminuserid));
  }, []);

  useEffect(() => {
    if (Comid !== null) fetchsaleData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Comid]);

  const fetchsaleData = async () => {
    try {
      const data = await fetctopsaleproduct(Comid);
      if (data && Array.isArray(data)) setAdmindata(data);
    } catch (error) {
      console.log("Failed to fetch top sale data.");
    }
  };

  const totalPages = Math.ceil(admindata.length / rowsPerPage);
  const currentData = admindata.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              {["#", "Product Name", "Qty Sold", "Total Sales"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentData.length > 0 ? currentData.map((product, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 text-gray-500">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                <td className="px-4 py-3 font-medium text-gray-800">{product.Description || "N/A"}</td>
                <td className="px-4 py-3 text-gray-600">{parseInt(product.TotalQuantitySold) || 0}</td>
                <td className="px-4 py-3 font-semibold text-green-600">₹{parseFloat(product.TotalSales).toFixed(2)}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="px-4 py-8 text-center text-gray-400">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors">
            ← Previous
          </button>
          <span className="text-sm text-gray-500">Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition-colors">
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Topsaleproduct;
