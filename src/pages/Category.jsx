import React, { useState, useEffect } from "react";
import { fetchSelectCategory, deleteCategory } from "../services/Category";
import { useNavigate } from "react-router-dom";
import { ImagePathRoutes } from "../routes/imagePathRoutes";
import { PageLayout, TableCard, FilterBar, SearchInput, TableHead, StatusBadge, ActionButtons, EmptyState, LoadingState, Pagination } from "../components/PageLayout";

const Category = () => {
  const [rows] = useState(10);
  const [category, setCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminId, setAdminId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed."); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  useEffect(() => {
    if (adminId) fetchCategoryData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminId]);

  const fetchCategoryData = async () => {
    setLoading(true);
    try {
      const data = await fetchSelectCategory(adminId);
      if (data) { setCategory(data); setFilteredCategory(data); }
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredCategory(query ? category.filter((i) => i.Category.toLowerCase().includes(query)) : category);
    setCurrentPage(1);
  };

  const handleDeleteClick = async (id) => {
    try {
      const isDeleted = await deleteCategory(id);
      if (isDeleted) setCategory((prev) => prev.filter((i) => i.Id !== id));
      else alert("Failed to delete.");
    } catch (error) { alert("Error: " + error.message); }
  };

  const handlePageChange = (dir) => {
    if (dir === "prev" && currentPage > 1) setCurrentPage((p) => p - 1);
    else if (dir === "next" && currentPage < Math.ceil(filteredCategory.length / rows)) setCurrentPage((p) => p + 1);
  };

  const startIndex = (currentPage - 1) * rows;
  const currentRows = filteredCategory.slice(startIndex, startIndex + rows);

  return (
    <PageLayout title="Category" subtitle={`${filteredCategory.length} categories`} buttonLabel="Add Category" onButtonClick={() => navigate('/addcategory/:id')}>
      <FilterBar>
        <SearchInput value={searchQuery} onChange={handleSearch} placeholder="Search categories..." />
      </FilterBar>
      <TableCard>
        {loading ? <LoadingState /> : filteredCategory.length === 0 ? <EmptyState message="No categories found" /> : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <TableHead headers={["#", "Image", "Category Name", "Status", "Actions"]} />
                <tbody className="divide-y divide-gray-50">
                  {currentRows.map((item, index) => (
                    <tr key={item.Id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-5 py-4 text-gray-400 text-xs">{startIndex + index + 1}</td>
                      <td className="px-5 py-4">
                        <img src={ImagePathRoutes.BannerPostImagePath + item.ImagePath} alt={item.Category}
                          className="w-12 h-12 object-cover rounded-xl border border-gray-100 shadow-sm"
                          onError={(e) => e.target.src = "https://t3.ftcdn.net/jpg/05/11/01/02/360_F_511010254_pVaBHjs5DooDMPkCPrC4Pw2C39cfhyOa.jpg"} />
                      </td>
                      <td className="px-5 py-4 font-medium text-gray-800">{item.Category}</td>
                      <td className="px-5 py-4"><StatusBadge active={item.Active} /></td>
                      <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/addcategory/${item.Id}`)} onDelete={() => handleDeleteClick(item.Id)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredCategory.length / rows)} onPageChange={handlePageChange} totalItems={filteredCategory.length} rowsPerPage={rows} />
          </>
        )}
      </TableCard>
    </PageLayout>
  );
};

export default Category;
