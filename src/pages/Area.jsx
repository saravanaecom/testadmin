import React, { useEffect, useState } from "react";
import { fetcArea, deleteArea } from "../services/Area";
import { useNavigate } from "react-router-dom";
import { PageLayout, TableCard, TableHead, StatusBadge, ActionButtons, EmptyState, LoadingState } from "../components/PageLayout";

const Area = () => {
  const [adminId, setAdminId] = useState(null);
  const [areaData, setAreaData] = useState([]);
  const [loading, setLoading] = useState(false);
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
      const data = await fetcArea(adminId);
      if (data) { setAreaData(data); localStorage.setItem("AdminArea", JSON.stringify(data)); }
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Delete this area?")) return;
    try {
      const isDeleted = await deleteArea(id);
      if (isDeleted) setAreaData((prev) => prev.filter((a) => a.Id !== id));
      else alert("Failed to delete.");
    } catch (error) { alert("Error: " + error.message); }
  };

  return (
    <PageLayout title="Area Management" subtitle={`${areaData.length} areas`} buttonLabel="Add Area" onButtonClick={() => navigate('/AddArea/:id')}>
      <TableCard>
        {loading ? <LoadingState /> : areaData.length === 0 ? <EmptyState message="No areas found" /> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <TableHead headers={["#", "Area Name", "Pincode", "Status", "Actions"]} />
              <tbody className="divide-y divide-gray-50">
                {areaData.map((area, index) => (
                  <tr key={area.Id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-5 py-4 text-gray-400 text-xs">{index + 1}</td>
                    <td className="px-5 py-4 font-medium text-gray-800">{area.AreaName}</td>
                    <td className="px-5 py-4"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-mono">{area.Pincode}</span></td>
                    <td className="px-5 py-4"><StatusBadge active={area.Active === 1} /></td>
                    <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/AddArea/${area.Id}`)} onDelete={() => handleDeleteClick(area.Id)} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </TableCard>
    </PageLayout>
  );
};

export default Area;
