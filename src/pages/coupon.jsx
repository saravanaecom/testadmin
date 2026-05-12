import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchSelectCoupon, DeleteCoupon } from "../services/addcouppon";
import { PageLayout, TableCard, FilterBar, SearchInput, TableHead, ActionButtons, EmptyState, LoadingState } from "../components/PageLayout";

const Coupon = () => {
  const [adminId, setAdminId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchMobile, setSearchMobile] = useState("");
  const [searchCouponCode, setSearchCouponCode] = useState("");
  const navigate = useNavigate();

  const formatDate = (date) => {
    const d = new Date(date);
    return `${String(d.getDate()).padStart(2, '0')}-${String(d.getMonth() + 1).padStart(2, '0')}-${d.getFullYear()}`;
  };

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed."); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  useEffect(() => {
    if (adminId) {
      setLoading(true);
      fetchSelectCoupon(adminId)
        .then((data) => { setCoupon(data || []); setFilteredProducts(data || []); })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    }
  }, [adminId]);

  useEffect(() => {
    let filtered = coupon;
    if (searchMobile) filtered = filtered.filter((c) => c.MobileNo?.toString().includes(searchMobile));
    if (searchCouponCode) filtered = filtered.filter((c) => c.code?.toLowerCase().includes(searchCouponCode.toLowerCase()));
    setFilteredProducts(filtered);
  }, [searchMobile, searchCouponCode, coupon]);

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Delete this coupon?")) return;
    try {
      const isDeleted = await DeleteCoupon(id);
      if (isDeleted) setCoupon((prev) => prev.filter((c) => c.Id !== id));
      else alert("Failed to delete.");
    } catch (error) { alert("Error: " + error.message); }
  };

  return (
    <PageLayout title="Coupons" subtitle={`${filteredProducts.length} coupons`} buttonLabel="Add Coupon" onButtonClick={() => navigate('/Addcoupon/:id')}>
      <FilterBar>
        <SearchInput value={searchMobile} onChange={(e) => setSearchMobile(e.target.value)} placeholder="Search by mobile..." />
        <SearchInput value={searchCouponCode} onChange={(e) => setSearchCouponCode(e.target.value)} placeholder="Search by coupon code..." />
      </FilterBar>
      <TableCard>
        {loading ? <LoadingState /> : filteredProducts.length === 0 ? <EmptyState message="No coupons found" /> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <TableHead headers={["#", "Coupon Code", "Customer", "Mobile", "Status", "Expires At", "Actions"]} />
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map((c, index) => (
                  <tr key={c.Id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-5 py-4 text-gray-400 text-xs">{index + 1}</td>
                    <td className="px-5 py-4"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-mono font-semibold">{c.code}</span></td>
                    <td className="px-5 py-4 font-medium text-gray-800">{c.AccountName}</td>
                    <td className="px-5 py-4 text-gray-600">{c.MobileNo}</td>
                    <td className="px-5 py-4">
                      {c.isActive === 1
                        ? <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-medium"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>Active</span>
                        : <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 px-2.5 py-1 rounded-full text-xs font-medium"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>Inactive</span>}
                    </td>
                    <td className="px-5 py-4 text-gray-500 text-xs">{formatDate(c.expiresAt)}</td>
                    <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/Addcoupon/${c.Id}`)} onDelete={() => handleDeleteClick(c.Id)} /></td>
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

export default Coupon;
