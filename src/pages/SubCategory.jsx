import React, { useState, useEffect } from "react";
import { fetchSelectsubCategory, fetchSelectCategory, deleteSubCategory } from "../services/SubCategory";
import { useNavigate } from "react-router-dom";
import { PageLayout, TableCard, FilterBar, SearchInput, TableHead, StatusBadge, ActionButtons, EmptyState, LoadingState, Pagination } from "../components/PageLayout";

const SubCategory = () => {
  const [rows] = useState(10);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [search, setSearch] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [adminId, setAdminId] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed."); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  useEffect(() => {
    if (adminId) { fetchsubCategoryData(); fetchCategoryData(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminId]);

  const fetchsubCategoryData = async () => {
    setLoading(true);
    try {
      const data = await fetchSelectsubCategory(adminId);
      if (data) setSubCategories(data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const fetchCategoryData = async () => {
    try {
      const data = await fetchSelectCategory(adminId);
      if (data) setCategoryList(data);
    } catch (error) { console.error(error); }
  };

  const handleDeleteClick = async (id) => {
    try {
      const isDeleted = await deleteSubCategory(id);
      if (isDeleted) setSubCategories((prev) => prev.filter((s) => s.Id !== id));
      else alert("Failed to delete.");
    } catch (error) { alert("Error: " + error.message); }
  };

  const filteredSubCategories = subCategories.filter((sub) =>
    (!selectedCategory || sub.Category.toLowerCase().includes(selectedCategory.toLowerCase())) &&
    (!search || sub.SubCategory.toLowerCase().includes(search.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredSubCategories.length / rows);
  const paginatedSubCategories = filteredSubCategories.slice((currentPage - 1) * rows, currentPage * rows);

  useEffect(() => { setCurrentPage(1); }, [search, selectedCategory]);

  const handlePageChange = (dir) => {
    if (dir === "prev" && currentPage > 1) setCurrentPage((p) => p - 1);
    else if (dir === "next" && currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <PageLayout title="SubCategory" subtitle={`${filteredSubCategories.length} subcategories`} buttonLabel="Add SubCategory" onButtonClick={() => navigate('/AddSubCategory/:id')}>
      <FilterBar>
        <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search subcategories..." />
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none">
          <option value="">All Categories</option>
          {categoryList.map((item) => <option key={item.Id} value={item.Category}>{item.Category}</option>)}
        </select>
      </FilterBar>

      <TableCard>
        {loading ? <LoadingState /> : filteredSubCategories.length === 0 ? <EmptyState message="No subcategories found" /> : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <TableHead headers={["#", "SubCategory Name", "Category", "Status", "Actions"]} />
                <tbody className="divide-y divide-gray-50">
                  {paginatedSubCategories.map((item, index) => (
                    <tr key={item.Id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-5 py-4 text-gray-400 text-xs">{(currentPage - 1) * rows + index + 1}</td>
                      <td className="px-5 py-4 font-medium text-gray-800">{item.SubCategory}</td>
                      <td className="px-5 py-4"><span className="bg-purple-50 text-purple-600 px-2 py-1 rounded-lg text-xs font-medium">{item.Category}</span></td>
                      <td className="px-5 py-4"><StatusBadge active={item.Active} /></td>
                      <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/AddSubCategory/${item.Id}`)} onDelete={() => handleDeleteClick(item.Id)} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} totalItems={filteredSubCategories.length} rowsPerPage={rows} />}
          </>
        )}
      </TableCard>
    </PageLayout>
  );
};

export default SubCategory;
