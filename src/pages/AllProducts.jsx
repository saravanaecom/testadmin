import React, { useState, useEffect } from "react";
import Slider from "../components/sidebar";
import { useNavigate } from "react-router-dom";
import { fetchSelectProduct, Deleteproduct } from "../services/Product";
import { ImagePathRoutes } from "../routes/imagePathRoutes";
import ErrorModal from "../components/error";
import SuccessModal from "../components/sucessmodel";
import { MdDelete } from "react-icons/md";
import { GrEdit } from "react-icons/gr";
import { HiOutlineSearch, HiOutlinePlus } from "react-icons/hi";
import { fetchSelectCategory, fetchSelectsubCategoryid, insertProduct } from "../services/addproducts";
import * as XLSX from 'xlsx';

const AllProducts = () => {
  const [rows, setRows] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [inputPage, setInputPage] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [adminId, setAdminId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [dsubcategory, setSubCategoryd] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryid, setCategoryid] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState([]);

  const handleFile = (e) => {
    const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (fileTypes.includes(selectedFile.type)) {
        setTypeError(null);
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => setExcelFile(e.target.result);
      } else {
        setTypeError('Please select only excel file types');
        setExcelFile(null);
      }
    }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "binary" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      setExcelData(XLSX.utils.sheet_to_json(worksheet));
    } else {
      setExcelData([]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productsToSave = excelData.map((product) => ({
        Comid: adminId, ProductCode: product.ProductCode, ProductName: product.ProductName,
        CategoryId: 0, SubCategoryId: 0, SubCategory: product.SubCategory, Category: product.Category,
        MRP: product.MRP, SalesRate: product.SalesRate, UOM: product.UOM,
        ImagePath: "Undefined.jpg", img1: "Undefined.jpg", img2: "Undefined.jpg",
        img3: "Undefined.jpg", img4: "Undefined.jpg", ProductDescription: product.productDescription,
        Sort: 0, IsStock: 1, OfferProduct: 0, FeatureProduct: 0, FreshProduct: 0, NewProduct: 0,
        MultiplePriceEnabled: 0, ProductWeightType: [], ActiveStatus: 1, Aproximiatedays: null,
        ReturnsAvailability: 0, ReturnPolicyDays: null, OurChoice: 0, Brandname: product.Brandname, BrandId: 0
      }));
      const success = await insertProduct(productsToSave);
      if (success) {
        setSuccessMessage("Products saved successfully!");
        setIsSuccessModalOpen(true);
        setTimeout(() => navigate('/AllProducts'), 1500);
      } else {
        setErrorMessage("Failed to save the products.");
        setIsErrorModalOpen(true);
      }
    } catch (error) {
      setErrorMessage("An error occurred while saving the products.");
      setIsErrorModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed. Please Login Again!"); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try { const data = await fetchSelectCategory(adminId); setCategory(data); }
      catch (error) { console.error("Failed to fetch categories", error); }
      finally { setLoading(false); }
    };
    if (adminId) fetchCategories();
  }, [adminId]);

  useEffect(() => {
    if (categoryid) {
      setLoading(true);
      const fetchSubCategories = async () => {
        try { const data = await fetchSelectsubCategoryid(adminId, categoryid); setSubCategoryd(data); }
        catch (error) { console.error("Failed to fetch subcategories", error); }
        finally { setLoading(false); }
      };
      fetchSubCategories();
    }
  }, [categoryid, adminId]);

  useEffect(() => {
    if (adminId) {
      setLoading(true);
      const fetchProducts = async () => {
        try {
          const data = await fetchSelectProduct(adminId);
          setProducts(data); setFilteredProducts(data);
          setTotalPages(Math.ceil(data.length / rows));
        } catch (error) { console.error("Failed to fetch products", error); }
        finally { setLoading(false); }
      };
      fetchProducts();
    }
  }, [adminId, rows]);

  useEffect(() => {
    const catfiltered = products.filter((p) => {
      if (categoryid && selectedCategory) return p.CId === parseInt(categoryid) && p.SId === parseInt(selectedCategory);
      if (categoryid) return p.CId === parseInt(categoryid);
      if (selectedCategory) return p.SId === parseInt(selectedCategory);
      return true;
    });
    const searchFiltered = searchKey
      ? catfiltered.filter((p) =>
          p.Description.toLowerCase().includes(searchKey.toLowerCase()) ||
          p.ProductCode.toLowerCase().includes(searchKey.toLowerCase()) ||
          p.SubCategoryName.toLowerCase().includes(searchKey.toLowerCase()))
      : catfiltered;
    setFilteredProducts(searchFiltered);
    setTotalPages(Math.ceil(searchFiltered.length / rows));
    setCurrentPage(1);
  }, [products, categoryid, selectedCategory, searchKey, rows]);

  useEffect(() => {
    const savedCategoryId = localStorage.getItem("savedCategoryId");
    const savedSelectedCategory = localStorage.getItem("savedSelectedCategory");
    const savedSearchKey = localStorage.getItem("savedSearchKey");
    if (savedCategoryId) { setCategoryid(savedCategoryId); localStorage.removeItem("savedCategoryId"); }
    if (savedSelectedCategory) { setSelectedCategory(savedSelectedCategory); localStorage.removeItem("savedSelectedCategory"); }
    if (savedSearchKey) { setSearchKey(savedSearchKey); localStorage.removeItem("savedSearchKey"); }
    const savedPage = Number(localStorage.getItem("lastVisitedPage"));
    if (!isNaN(savedPage) && savedPage >= 1 && savedPage <= totalPages) {
      setCurrentPage(savedPage); localStorage.removeItem("lastVisitedPage");
    }
  }, [totalPages]);

  const paginatedProducts = filteredProducts.slice((currentPage - 1) * rows, currentPage * rows);

  const handlePageChange = (page) => {
    if (typeof page === "number" && page >= 1 && page <= totalPages) setCurrentPage(page);
    else if (page === "prev" && currentPage > 1) setCurrentPage((p) => p - 1);
    else if (page === "next" && currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handleJumpToPage = () => {
    const page = Number(inputPage);
    if (!isNaN(page) && page >= 1 && page <= totalPages) { setCurrentPage(page); setInputPage(""); }
  };

  const handleNavigate = (id) => {
    localStorage.setItem("lastVisitedPage", currentPage);
    localStorage.setItem("savedCategoryId", categoryid || "");
    localStorage.setItem("savedSelectedCategory", selectedCategory || "");
    localStorage.setItem("savedSearchKey", searchKey || "");
    navigate(`/AddProducts/${id}`);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      const isDeleted = await Deleteproduct(id);
      if (isDeleted) setProducts((prev) => prev.filter((p) => p.Id !== id));
      else alert("Failed to delete the product.");
    } catch (error) { alert("Error deleting the product: " + error.message); }
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <div className="flex-shrink-0"><Slider /></div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Products</h1>
            <p className="text-sm text-gray-400">{filteredProducts.length} products found</p>
          </div>
          <button
            onClick={() => handleNavigate()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-md transition-all duration-200 text-sm font-medium"
          >
            <HiOutlinePlus className="text-lg" /> Add Product
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          {/* Filters Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
            <div className="flex flex-wrap gap-3 items-center">
              {/* Search */}
              <div className="relative flex-1 min-w-48">
                <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input
                  type="text"
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
              </div>

              {/* Category */}
              <select
                value={categoryid}
                onChange={(e) => setCategoryid(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">All Categories</option>
                {category.map((item) => <option key={item.Id} value={item.Id}>{item.Category}</option>)}
              </select>

              {/* SubCategory */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="">All SubCategories</option>
                {dsubcategory.map((item) => <option key={item.Id} value={item.Id}>{item.SubCategory}</option>)}
              </select>

              {/* Rows */}
              <select
                value={rows}
                onChange={(e) => { setRows(parseInt(e.target.value, 10)); setCurrentPage(1); }}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="10">10 / page</option>
                <option value="20">20 / page</option>
                <option value="50">50 / page</option>
              </select>
            </div>

            {/* Excel Upload */}
            <div className="mt-3 pt-3 border-t border-gray-100">
              <form onSubmit={handleFileSubmit} className="flex flex-wrap items-center gap-3">
                <input
                  type="file" required onChange={handleFile}
                  className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer"
                />
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">
                  Upload Excel
                </button>
                {excelData.length > 0 && (
                  <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                    Save to Database ({excelData.length} rows)
                  </button>
                )}
                {typeError && <span className="text-xs text-red-500">{typeError}</span>}
              </form>
            </div>
          </div>

          {/* Table Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                <p className="text-gray-400 text-sm">Loading products...</p>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-4xl mb-3">📦</p>
                <p className="text-gray-500 font-medium">No products found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {["#", "Code", "Image", "Product Name", "SubCategory", "MRP", "Price", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {paginatedProducts.map((product, index) => (
                      <tr key={product.Id} className="hover:bg-blue-50 transition-colors duration-150">
                        <td className="px-5 py-4 text-gray-400 text-xs">{(currentPage - 1) * rows + index + 1}</td>
                        <td className="px-5 py-4">
                          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-mono">{product.ProductCode}</span>
                        </td>
                        <td className="px-5 py-4">
                          <img
                            src={ImagePathRoutes.ProductImagePath + product.Img0}
                            alt={product.Description}
                            className="w-12 h-12 object-cover rounded-xl border border-gray-100 shadow-sm"
                            onError={(e) => e.target.src = "https://t3.ftcdn.net/jpg/05/11/01/02/360_F_511010254_pVaBHjs5DooDMPkCPrC4Pw2C39cfhyOa.jpg"}
                          />
                        </td>
                        <td className="px-5 py-4 font-medium text-gray-800 max-w-xs truncate">{product.Description}</td>
                        <td className="px-5 py-4 text-gray-500">{product.SubCategoryName || "—"}</td>
                        <td className="px-5 py-4 text-gray-500 line-through text-xs">₹{product.MRP}</td>
                        <td className="px-5 py-4 font-semibold text-green-600">₹{product.Price}</td>
                        <td className="px-5 py-4">
                          {product.Active === 1 ? (
                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-medium">
                              <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 px-2.5 py-1 rounded-full text-xs font-medium">
                              <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Inactive
                            </span>
                          )}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleNavigate(product.Id)}
                              className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                              title="Edit"
                            >
                              <GrEdit className="text-sm" />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(product.Id)}
                              className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors"
                              title="Delete"
                            >
                              <MdDelete className="text-sm" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium text-gray-700">{(currentPage - 1) * rows + 1}</span> to{" "}
                  <span className="font-medium text-gray-700">{Math.min(currentPage * rows, filteredProducts.length)}</span> of{" "}
                  <span className="font-medium text-gray-700">{filteredProducts.length}</span> products
                </p>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange("prev")} disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >← Prev</button>

                  <span className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">
                    {currentPage} / {totalPages}
                  </span>

                  <button
                    onClick={() => handlePageChange("next")} disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >Next →</button>

                  <div className="flex items-center gap-1 ml-2">
                    <input
                      type="number" value={inputPage}
                      onChange={(e) => setInputPage(e.target.value)}
                      placeholder="Page"
                      className="w-16 px-2 py-1.5 text-sm border border-gray-200 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                      onClick={handleJumpToPage}
                      className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >Go</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isErrorModalOpen && <ErrorModal title="Error" message={errorMessage} onClose={() => setIsErrorModalOpen(false)} />}
      {isSuccessModalOpen && <SuccessModal title="Success" message={successMessage} onClose={() => setIsSuccessModalOpen(false)} />}
    </div>
  );
};

export default AllProducts;
