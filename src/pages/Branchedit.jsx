import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { insertSelectBranchAdmin } from "../services/branch";
import { PageLayout } from "../components/PageLayout";

const inputClass = "w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none bg-white";
const labelClass = "block text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wide";

const Branchedit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    branchName: "", userName: "", password: "", areaName: "", pincode: "",
    address1: "", address2: "", city: "", landMark: "", email: "",
    mobileNo1: "", mobileNo2: "", latitude: "", longitude: "", upiId: "", activeStatus: true,
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const CompanyList = JSON.parse(localStorage.getItem("AdminBranch"));
    const selectedBranch = CompanyList?.find((b) => b.Id === parseInt(id));
    if (selectedBranch) {
      setFormData({
        branchName: selectedBranch.BranchName || "", userName: selectedBranch.Username || "",
        password: selectedBranch.Password || "", areaName: selectedBranch.AreaName || "",
        pincode: selectedBranch.Pincode || "", address1: selectedBranch.Address1 || "",
        address2: selectedBranch.Address2 || "", city: selectedBranch.City || "",
        landMark: selectedBranch.LandMark || "", email: selectedBranch.Email || "",
        mobileNo1: selectedBranch.MobileNo1 || "", mobileNo2: selectedBranch.MobileNo2 || "",
        latitude: selectedBranch.Latitude || "", longitude: selectedBranch.Longitude || "",
        upiId: selectedBranch.UpiId || "", activeStatus: selectedBranch.CStatus,
      });
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({ ...formData, [id]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const objlist = {
      Id: id, BranchName: formData.branchName, CName: formData.branchName,
      Username: formData.userName, Password: formData.password, AreaName: formData.areaName,
      Pincode: formData.pincode, Address1: formData.address1, Address2: formData.address2,
      City: formData.city, LandMark: formData.landMark, Email: formData.email,
      MobileNo1: formData.mobileNo1, MobileNo2: formData.mobileNo2,
      Latitude: formData.latitude, Longitude: formData.longitude, UpiId: formData.upiId,
      Active: formData.activeStatus ? 1 : 0, CompanyRefId: 0, CCode: 0, ComputerName: formData.userName,
    };
    try {
      const data = await insertSelectBranchAdmin([objlist]);
      if (data) { setMessage({ text: "Branch updated successfully!", type: "success" }); setTimeout(() => navigate("/branch"), 1500); }
      else setMessage({ text: "Failed to update.", type: "error" });
    } catch (error) { setMessage({ text: "An error occurred.", type: "error" }); }
  };

  const leftFields = [
    { label: "Branch Name", id: "branchName", required: true },
    { label: "User Name", id: "userName", required: true },
    { label: "Password", id: "password", required: true },
    { label: "Area Name", id: "areaName", required: true },
    { label: "Pincode", id: "pincode", required: true },
    { label: "Address 1", id: "address1", required: true },
    { label: "Address 2", id: "address2" },
    { label: "City", id: "city", required: true },
  ];

  const rightFields = [
    { label: "Landmark", id: "landMark" },
    { label: "Email", id: "email", required: true },
    { label: "Mobile No 1", id: "mobileNo1", required: true },
    { label: "Mobile No 2", id: "mobileNo2" },
    { label: "Latitude", id: "latitude" },
    { label: "Longitude", id: "longitude" },
    { label: "UPI ID", id: "upiId" },
  ];

  return (
    <PageLayout title="Edit Branch" subtitle="Update branch information">
      {message.text && (
        <div className={`mb-4 p-3 rounded-xl text-sm ${message.type === "success" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Basic Information</h3>
            {leftFields.map(({ label, id, required }) => (
              <div key={id}>
                <label className={labelClass}>{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
                <input type="text" id={id} value={formData[id]} onChange={handleInputChange} className={inputClass} />
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2">
              <input type="checkbox" id="activeStatus" checked={formData.activeStatus} onChange={handleInputChange} className="w-4 h-4 text-blue-600 rounded" />
              <label htmlFor="activeStatus" className="text-sm font-medium text-gray-700">Active Status</label>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-4">Contact & Location</h3>
            {rightFields.map(({ label, id, required }) => (
              <div key={id}>
                <label className={labelClass}>{label}{required && <span className="text-red-400 ml-1">*</span>}</label>
                <input type="text" id={id} value={formData[id]} onChange={handleInputChange} className={inputClass} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-md">
            Update Branch
          </button>
          <button type="button" onClick={() => navigate("/branch")} className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors">
            Cancel
          </button>
        </div>
      </form>
    </PageLayout>
  );
};

export default Branchedit;
