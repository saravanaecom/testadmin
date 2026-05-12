import React, { useEffect, useState } from "react";
import { fetchSelectBrand, DeleteBrand } from "../services/addBrand";
import { useNavigate } from 'react-router-dom';
import { PageLayout, TableCard, TableHead, StatusBadge, ActionButtons, EmptyState, LoadingState } from "../components/PageLayout";

const AllBrand = () => {
  const [adminId, setAdminId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed."); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  useEffect(() => {
    if (adminId) {
      setLoading(true);
      fetchSelectBrand(adminId)
        .then((data) => setBrands(data || []))
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    }
  }, [adminId]);

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this brand?")) return;
    try {
      const isDeleted = await DeleteBrand(id);
      if (isDeleted) setBrands((prev) => prev.filter((b) => b.Id !== id));
      else alert("Failed to delete.");
    } catch (error) { alert("Error: " + error.message); }
  };

  return (
    <PageLayout title="Brands" subtitle={`${brands.length} brands`} buttonLabel="Add Brand" onButtonClick={() => navigate('/Brand/:id')}>
      <TableCard>
        {loading ? <LoadingState /> : brands.length === 0 ? <EmptyState message="No brands found" /> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <TableHead headers={["#", "Brand Name", "Status", "Actions"]} />
              <tbody className="divide-y divide-gray-50">
                {brands.map((brand, index) => (
                  <tr key={brand.Id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-5 py-4 text-gray-400 text-xs">{index + 1}</td>
                    <td className="px-5 py-4 font-medium text-gray-800">{brand.BrandName}</td>
                    <td className="px-5 py-4"><StatusBadge active={brand.Active === 1} /></td>
                    <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/Brand/${brand.Id}`)} onDelete={() => handleDeleteClick(brand.Id)} /></td>
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

export default AllBrand;
