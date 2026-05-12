import React, { useState, useEffect } from "react";
import { fetchSelectCompanyAdmin } from "../services/branch";
import { useNavigate } from "react-router-dom";
import { PageLayout, TableCard, TableHead, StatusBadge, ActionButtons, EmptyState, LoadingState } from "../components/PageLayout";

const Branch = () => {
  const navigate = useNavigate();
  const [Comid, setCompanyId] = useState(null);
  const [admindata, setAdmindata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const adminuserid = localStorage.getItem("adminuserid");
    if (adminuserid) setCompanyId(Number(adminuserid));
  }, []);

  useEffect(() => {
    if (Comid !== null) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fetchAdminData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Comid]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const data = await fetchSelectCompanyAdmin(Comid);
      if (data && Array.isArray(data)) {
        setAdmindata(data);
        localStorage.setItem("AdminBranch", JSON.stringify(data));
      }
    } catch (error) {
      console.error("Failed to fetch admin data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Branch Management" subtitle={`${admindata.length} branches`}>
      <TableCard>
        {loading ? <LoadingState /> : admindata.length === 0 ? <EmptyState message="No branches found" /> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <TableHead headers={["#", "Branch Code", "Branch Name", "Username", "Password", "Status", "Action"]} />
              <tbody className="divide-y divide-gray-50">
                {admindata.map((item, index) => (
                  <tr key={item.Id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-5 py-4 text-gray-400 text-xs">{index + 1}</td>
                    <td className="px-5 py-4"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-mono">{item.CCode}</span></td>
                    <td className="px-5 py-4 font-medium text-gray-800">{item.BranchName}</td>
                    <td className="px-5 py-4 text-gray-600">{item.Username}</td>
                    <td className="px-5 py-4 text-gray-400 text-xs">••••••••</td>
                    <td className="px-5 py-4"><StatusBadge active={item.CStatus} /></td>
                    <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/branchedit/${item.Id}`)} /></td>
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

export default Branch;
