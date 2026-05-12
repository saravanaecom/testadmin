import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchSelectdriver, DeleteDriver } from '../services/drivermaster';
import { PageLayout, TableCard, TableHead, StatusBadge, ActionButtons, EmptyState, LoadingState } from "../components/PageLayout";

const Drivermaster = () => {
  const navigate = useNavigate();
  const [Comid, setCompanyId] = useState(null);
  const [driverData, setDriverData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const adminuserid = localStorage.getItem("adminuserid");
    if (adminuserid) setCompanyId(Number(adminuserid));
  }, []);

  useEffect(() => {
    if (Comid !== null) fetchDriverData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Comid]);

  const fetchDriverData = async () => {
    setLoading(true);
    try {
      const data = await fetchSelectdriver(Comid);
      if (data && Array.isArray(data)) setDriverData(data);
    } catch (error) { console.error("Failed to fetch driver data."); }
    finally { setLoading(false); }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Delete this driver?")) return;
    try {
      const isDeleted = await DeleteDriver(id);
      if (isDeleted) setDriverData((prev) => prev.filter((d) => d.Id !== id));
      else alert("Failed to delete.");
    } catch (error) { alert("Error: " + error.message); }
  };

  return (
    <PageLayout title="Driver Master" subtitle={`${driverData.length} drivers`} buttonLabel="Add Driver" onButtonClick={() => navigate('/AddDriver/:id')}>
      <TableCard>
        {loading ? <LoadingState /> : driverData.length === 0 ? <EmptyState message="No drivers found" /> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <TableHead headers={["#", "Name", "Mobile", "Status", "Actions"]} />
              <tbody className="divide-y divide-gray-50">
                {driverData.map((driver, index) => (
                  <tr key={driver.Id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-5 py-4 text-gray-400 text-xs">{index + 1}</td>
                    <td className="px-5 py-4 font-medium text-gray-800">{driver.Name}</td>
                    <td className="px-5 py-4 text-gray-600">{driver.Mobile}</td>
                    <td className="px-5 py-4"><StatusBadge active={driver.Active === 1} /></td>
                    <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/AddDriver/${driver.Id}`)} onDelete={() => handleDeleteClick(driver.Id)} /></td>
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

export default Drivermaster;
