import React, { useState, useEffect } from "react";
import { insertBrand } from "../services/addBrand";
import { useParams, useNavigate } from "react-router-dom";
import { PageLayout } from "../components/PageLayout";

const Brand = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brandName, setBrandName] = useState("");
  const [adminId, setAdminId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [Active, setActive] = useState(true);

  useEffect(() => {
    const Brandlists = JSON.parse(localStorage.getItem("BrandDataList"));
    if (Brandlists) {
      const selectedBrand = Brandlists.find((b) => b.Id === parseInt(id));
      if (selectedBrand) { setBrandName(selectedBrand.BrandName || ""); setActive(selectedBrand.Active === 1); }
    }
  }, [id]);

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed."); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const success = await insertBrand([{ Id: id ? parseInt(id) : "", Active: Active ? 1 : 0, BrandName: brandName }], adminId);
      if (success) { alert("Brand saved successfully!"); navigate('/AllBrand'); }
      else alert("Failed to save.");
    } catch (error) { alert("Error: " + error.message); }
    finally { setLoading(false); }
  };

  return (
    <PageLayout title={id && !isNaN(parseInt(id)) ? "Edit Brand" : "Add Brand"} subtitle="Manage brand information">
      <div className="max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide">Brand Name <span className="text-red-400">*</span></label>
              <input type="text" value={brandName} onChange={(e) => setBrandName(e.target.value)} placeholder="Enter brand name"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" required />
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
              <input type="checkbox" id="active" checked={Active} onChange={(e) => setActive(e.target.checked)} className="w-4 h-4 text-blue-600 rounded" />
              <label htmlFor="active" className="text-sm font-medium text-gray-700">Active Status</label>
              <span className={`ml-auto text-xs font-semibold px-2 py-1 rounded-full ${Active ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                {Active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" disabled={loading}
                className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 transition-colors shadow-md">
                {loading ? "Saving..." : "Save Brand"}
              </button>
              <button type="button" onClick={() => navigate('/AllBrand')}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default Brand;
