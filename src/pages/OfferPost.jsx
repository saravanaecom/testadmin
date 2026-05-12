import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetcOfferpost, deleteOfferPost } from "../services/offerpost";
import { ImagePathRoutes } from '../routes/imagePathRoutes';
import { PageLayout, TableCard, TableHead, ActionButtons, EmptyState, LoadingState, Pagination } from "../components/PageLayout";

const OfferPostPanel = () => {
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed."); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  useEffect(() => {
    if (adminId) fetchOfferData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminId]);

  const fetchOfferData = async () => {
    setLoading(true);
    try {
      const data = await fetcOfferpost(adminId);
      if (data && data.length) { setOffers(data); localStorage.setItem("AdminOfferPost", JSON.stringify(data)); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Delete this offer post?")) return;
    try {
      const isDeleted = await deleteOfferPost(id);
      if (isDeleted) setOffers((prev) => prev.filter((o) => o.Id !== id));
      else alert("Failed to delete.");
    } catch (error) { alert("Error: " + error.message); }
  };

  const handlePageChange = (dir) => {
    if (dir === "prev" && currentPage > 1) setCurrentPage((p) => p - 1);
    else if (dir === "next" && currentPage < Math.ceil(offers.length / rowsPerPage)) setCurrentPage((p) => p + 1);
  };

  const paginatedOffers = offers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <PageLayout title="Offer Posts" subtitle={`${offers.length} posters`} buttonLabel="Add Offer Post" onButtonClick={() => navigate('/AddOfferPost/:id')}>
      <TableCard>
        {loading ? <LoadingState /> : offers.length === 0 ? <EmptyState message="No offer posts found" /> : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <TableHead headers={["#", "Web Poster", "Mobile Poster", "Offer Name", "Actions"]} />
                <tbody className="divide-y divide-gray-50">
                  {paginatedOffers.map((offer, index) => (
                    <tr key={offer.Id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-5 py-4 text-gray-400 text-xs">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td className="px-5 py-4">
                        <img src={ImagePathRoutes.OfferPostImagePath + offer.Imagepath} alt="web"
                          className="w-16 h-12 object-cover rounded-xl border border-gray-100 shadow-sm"
                          onError={(e) => e.target.src = "https://t3.ftcdn.net/jpg/05/11/01/02/360_F_511010254_pVaBHjs5DooDMPkCPrC4Pw2C39cfhyOa.jpg"} />
                      </td>
                      <td className="px-5 py-4">
                        <img src={ImagePathRoutes.OfferPostImagePath + offer.MobileImagepath} alt="mobile"
                          className="w-12 h-16 object-cover rounded-xl border border-gray-100 shadow-sm"
                          onError={(e) => e.target.src = "https://t3.ftcdn.net/jpg/05/11/01/02/360_F_511010254_pVaBHjs5DooDMPkCPrC4Pw2C39cfhyOa.jpg"} />
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-800">{offer.OfferName}</td>
                      <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/AddOfferPost/${offer.Id}`)} onDelete={() => handleDeleteClick(offer.Id)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={Math.ceil(offers.length / rowsPerPage)} onPageChange={handlePageChange} totalItems={offers.length} rowsPerPage={rowsPerPage} />
          </>
        )}
      </TableCard>
    </PageLayout>
  );
};

export default OfferPostPanel;
