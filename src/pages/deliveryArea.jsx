import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSelectDeliveryarea, DeleteArea, insertDeliveryArea, ExcelDownload } from "../services/addDeliveryArea";
import { fetchSelectCompanyAdmin } from "../services/branch";
import * as XLSX from "xlsx";
import { PageLayout, TableCard, TableHead, ActionButtons, EmptyState, LoadingState } from "../components/PageLayout";

const DeliveryArea = () => {
  const [adminId, setAdminId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterCompany, setFilterCompany] = useState([]);
  const [branchdata, setBranchdata] = useState([]);
  const [selectBranchId, setSelectBranchId] = useState("");
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed."); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  useEffect(() => {
    if (adminId) { fetchDelivery(); fetchAdminData(); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminId]);

  const fetchDelivery = async () => {
    setLoading(true);
    try {
      const data = await fetchSelectDeliveryarea(adminId);
      setFilteredProducts(data); setFilterCompany(data);
    } catch (error) { console.error(error); }
    finally { setLoading(false); }
  };

  const fetchAdminData = async () => {
    try {
      const data = await fetchSelectCompanyAdmin(adminId);
      if (data && Array.isArray(data)) setBranchdata(data);
    } catch (error) { console.error(error); }
  };

  const handleFile = (e) => {
    const fileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    const selectedFile = e.target.files[0];
    if (selectedFile && fileTypes.includes(selectedFile.type)) {
      setTypeError(null);
      const reader = new FileReader();
      reader.readAsArrayBuffer(selectedFile);
      reader.onload = (e) => setExcelFile(e.target.result);
    } else { setTypeError('Please select only excel file types'); setExcelFile(null); }
  };

  const handleFileSubmit = (e) => {
    e.preventDefault();
    if (excelFile) {
      const workbook = XLSX.read(excelFile, { type: "binary" });
      const data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      const mappedData = data.map((row) => {
        const company = filterCompany.find((c) => c.CompanyName?.toLowerCase() === row.companyname?.toLowerCase());
        return { ...row, CompanyRefId: company ? company.CompanyRefId : null };
      });
      setExcelData(mappedData);
    } else setExcelData([]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productsToSave = excelData.map((p) => ({ CompanyRefId: p.CompanyRefId, pincode: p.pincode, Active: 1 }));
      const success = await insertDeliveryArea(productsToSave);
      if (success === true) { alert("Saved successfully!"); navigate('/DeliveryArea'); }
      else alert("Already exists or failed.");
    } catch (error) { alert("Error: " + error.message); }
    finally { setLoading(false); }
  };

  const handleBranchChange = (e) => {
    const id = e.target.value;
    setSelectBranchId(id);
    setFilteredProducts(id ? filterCompany.filter((p) => p.CompanyRefId?.toString() === id) : filterCompany);
  };

  const handleDeleteClick = async (id) => {
    if (!window.confirm("Delete this area?")) return;
    try {
      const isDeleted = await DeleteArea(id);
      if (isDeleted) setFilteredProducts((prev) => prev.filter((p) => p.Id !== id));
      else alert("Failed to delete.");
    } catch (error) { alert("Error: " + error.message); }
  };

  const DownloadExcel = async () => {
    try {
      const data = await ExcelDownload();
      if (data) window.open(data.trim().replace(/^"|"$/g, ""), "_blank");
    } catch (error) { console.error(error); }
  };

  return (
    <PageLayout title="Delivery Area" subtitle={`${filteredProducts.length} pincodes`} buttonLabel="Add Pincode" onButtonClick={() => navigate('/AddDeliveryArea/:id')}>

      {/* Filter & Upload Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
        <div className="flex flex-wrap gap-3 items-center">
          <select value={selectBranchId} onChange={handleBranchChange}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none">
            <option value="">All Companies</option>
            {branchdata.map((b) => <option key={b.Id} value={b.Id}>{b.BranchName}</option>)}
          </select>
          <button onClick={DownloadExcel} className="px-4 py-2.5 bg-green-600 text-white text-sm rounded-xl hover:bg-green-700 transition-colors">
            📥 Download Excel
          </button>
        </div>
        <form onSubmit={handleFileSubmit} className="flex flex-wrap items-center gap-3 mt-3 pt-3 border-t border-gray-100">
          <input type="file" required onChange={handleFile}
            className="text-sm text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer" />
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors">Upload</button>
          {excelData.length > 0 && (
            <button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
              Save ({excelData.length} rows)
            </button>
          )}
          {typeError && <span className="text-xs text-red-500">{typeError}</span>}
        </form>
      </div>

      <TableCard>
        {loading ? <LoadingState /> : filteredProducts.length === 0 ? <EmptyState message="No delivery areas found" /> : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <TableHead headers={["#", "Pincode", "Company Name", "Actions"]} />
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map((product, index) => (
                  <tr key={product.Id || index} className="hover:bg-blue-50 transition-colors">
                    <td className="px-5 py-4 text-gray-400 text-xs">{index + 1}</td>
                    <td className="px-5 py-4"><span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-lg text-xs font-mono">{product.pincode}</span></td>
                    <td className="px-5 py-4 font-medium text-gray-800">{product.CompanyName}</td>
                    <td className="px-5 py-4"><ActionButtons onEdit={() => navigate(`/AddDeliveryArea/${product.Id}`)} onDelete={() => handleDeleteClick(product.Id)} /></td>
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

export default DeliveryArea;
