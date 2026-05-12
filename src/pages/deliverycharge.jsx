import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { fetchdeliverycharges, deleteDeliverycharge } from "../services/deliverycharges";
import { PageLayout, TableCard, TableHead, StatusBadge, ActionButtons, EmptyState, LoadingState } from "../components/PageLayout";

const DeliveryCharge = () => {
  const [adminId, setAdminId] = useState(null);
  const [chargesData, setChargesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed."); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  useEffect(() => {
    if (adminId) fetchdeliverycharge();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminId]);

  const fetchdeliverycharge = async () => {
    setLoading(true);
    try {
      const data = await fetchdeliverycharges(adminId);
      if (data) { setChargesData(data); localStorage.setItem("Deliverycharge", JSON.stringify(data)); }
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Delete this delivery charge?")) return;
    try {
      const isDeleted = await deleteDeliverycharge(id);
      if (isDeleted) setChargesData((prev) => prev.filter((c) => c.Id !== id));
      else alert("Failed to delete.");
    } catch (err) { alert("Error: " + err.message); }
  };

  return (
    <PageLayout title="Delivery Charges" subtitle={`${chargesData.length} charges`} buttonLabel="Add Charge" onButtonClick={() => navigate('/AddDeliveryCharge/:id')}>
      <TableCard>
        {loading ? <LoadingState /> : chargesData.length === 0 ? <EmptyState message="No delivery charges found" /> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <TableHead headers={["#", "Start KM", "End KM", "Delivery Charge", "Status", "Actions"]} />
              <tbody className="divide-y divide-gray-50">
                {chargesData.map((item, index) => (
                  <tr key={item.Id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-5 py-4 text-gray-400 text-xs">{index + 1}</td>
                    <td className="px-5 py-4 text-gray-700">{item.StartKM} km</td>
                    <td className="px-5 py-4 text-gray-700">{item.EndKM} km</td>
                    <td className="px-5 py-4 font-semibold text-green-600">₹{item.DeliveryCharges}</td>
                    <td className="px-5 py-4"><StatusBadge active={item.Active === 1} /></td>
                    <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/AddDeliveryCharge/${item.Id}`)} onDelete={() => handleDeleteClick(item.Id)} /></td>
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

export default DeliveryCharge;
