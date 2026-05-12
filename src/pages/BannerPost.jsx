import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePathRoutes } from "../routes/imagePathRoutes";
import { fetchSelectbannerpost, deleteBannerPost } from "../services/BannerPost";
import { PageLayout, TableCard, TableHead, StatusBadge, ActionButtons, EmptyState, LoadingState, Pagination } from "../components/PageLayout";

const BannerPost = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [adminId, setAdminId] = useState(null);
  const [bannerpost, setBannerpost] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed."); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  useEffect(() => {
    if (adminId) fetchBannerData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminId]);

  const fetchBannerData = async () => {
    setLoading(true);
    try {
      const data = await fetchSelectbannerpost(adminId);
      if (data) { setBannerpost(data); localStorage.setItem("Bannerpost", JSON.stringify(data)); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Delete this banner?")) return;
    try {
      const isDeleted = await deleteBannerPost(id);
      if (isDeleted) setBannerpost((prev) => prev.filter((b) => b.Id !== id));
      else alert("Failed to delete.");
    } catch (error) { alert("Error: " + error.message); }
  };

  const handlePageChange = (dir) => {
    if (dir === "prev" && currentPage > 1) setCurrentPage((p) => p - 1);
    else if (dir === "next" && currentPage < Math.ceil(bannerpost.length / rowsPerPage)) setCurrentPage((p) => p + 1);
  };

  const imgClass = "w-14 h-14 object-cover rounded-xl border border-gray-100 shadow-sm";
  const fallback = "https://t3.ftcdn.net/jpg/05/11/01/02/360_F_511010254_pVaBHjs5DooDMPkCPrC4Pw2C39cfhyOa.jpg";
  const paginatedData = bannerpost.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <PageLayout title="Banner Posts" subtitle={`${bannerpost.length} banners`} buttonLabel="Add Banner" onButtonClick={() => navigate('/addbannerpost/:id')}>
      <TableCard>
        {loading ? <LoadingState /> : bannerpost.length === 0 ? <EmptyState message="No banners found" /> : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <TableHead headers={["#", "Category", "Image 1", "Image 2", "Image 3", "Image 4", "Status", "Actions"]} />
                <tbody className="divide-y divide-gray-50">
                  {paginatedData.map((banner, index) => (
                    <tr key={banner.Id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-5 py-4 text-gray-400 text-xs">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td className="px-5 py-4 font-medium text-gray-800">{banner.Category}</td>
                      {[banner.Bannerimg1, banner.Bannerimg2, banner.Bannerimg3, banner.Bannerimg4].map((img, i) => (
                        <td key={i} className="px-5 py-4">
                          <img src={ImagePathRoutes.BannerPostImagePath + img} alt="banner" className={imgClass} onError={(e) => e.target.src = fallback} />
                        </td>
                      ))}
                      <td className="px-5 py-4"><StatusBadge active={banner.Active} /></td>
                      <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/addbannerpost/${banner.Id}`)} onDelete={() => handleDeleteClick(banner.Id)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={Math.ceil(bannerpost.length / rowsPerPage)} onPageChange={handlePageChange} totalItems={bannerpost.length} rowsPerPage={rowsPerPage} />
          </>
        )}
      </TableCard>
    </PageLayout>
  );
};

export default BannerPost;
