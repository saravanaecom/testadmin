import React, { useState, useEffect } from "react";
import { fetcDeliveryTime, deleteDeliveryTime } from "../services/DeliveryTime";
import { useNavigate } from "react-router-dom";
import { PageLayout, TableCard, TableHead, StatusBadge, ActionButtons, EmptyState, LoadingState, Pagination } from "../components/PageLayout";

const DeliveryTime = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [adminId, setAdminId] = useState(null);
  const [areaData, setAreaData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed."); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  useEffect(() => {
    if (adminId) fetchAreaData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminId]);

  const fetchAreaData = async () => {
    setLoading(true);
    try {
      const data = await fetcDeliveryTime(adminId);
      if (data) { setAreaData(data); localStorage.setItem("AdminDeliveryTime", JSON.stringify(data)); }
    } catch (err) { setError("Error fetching data: " + err.message); }
    finally { setLoading(false); }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Delete this delivery time?")) return;
    try {
      const isDeleted = await deleteDeliveryTime(id);
      if (isDeleted) setAreaData((prev) => prev.filter((a) => a.Id !== id));
      else alert("Failed to delete.");
    } catch (error) { alert("Error: " + error.message); }
  };

  const handlePageChange = (dir) => {
    if (dir === "prev" && currentPage > 1) setCurrentPage((p) => p - 1);
    else if (dir === "next" && currentPage < Math.ceil(areaData.length / rowsPerPage)) setCurrentPage((p) => p + 1);
  };

  const currentRows = areaData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <PageLayout title="Delivery Time" subtitle={`${areaData.length} time slots`} buttonLabel="Add Delivery Time" onButtonClick={() => navigate('/AddDeliveryTime/:id')}>
      {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">{error}</div>}
      <TableCard>
        {loading ? <LoadingState /> : areaData.length === 0 ? <EmptyState message="No delivery times found" /> : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <TableHead headers={["#", "Delivery Time", "Status", "Actions"]} />
                <tbody className="divide-y divide-gray-50">
                  {currentRows.map((item, index) => (
                    <tr key={item.Id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-5 py-4 text-gray-400 text-xs">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td className="px-5 py-4 font-medium text-gray-800">{item.Deliverytime}</td>
                      <td className="px-5 py-4"><StatusBadge active={item.Active} /></td>
                      <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/AddDeliveryTime/${item.Id}`)} onDelete={() => handleDeleteClick(item.Id)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {areaData.length > rowsPerPage && <Pagination currentPage={currentPage} totalPages={Math.ceil(areaData.length / rowsPerPage)} onPageChange={handlePageChange} totalItems={areaData.length} rowsPerPage={rowsPerPage} />}
          </>
        )}
      </TableCard>
    </PageLayout>
  );
};

export default DeliveryTime;
