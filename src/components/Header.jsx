import React, { useEffect, useState } from "react";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import AdminLogo from '../assets/logoadmin.png';
import Card from '../components/card';
import RecentOrderSearch from '../components/RecentOrderTable';
import { fetchBranchAddress } from "../services/DashBordServices";
import { useNavigate } from "react-router-dom";
import Graf from "../components/Graf";
import Topsaleproduct from "../components/topsaleproduct";
import Grafinamount from "../components/Grafinamount";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetails] = useState({
    CompanyName: "",
    CompanyEmailAddress: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminUserId = localStorage.getItem("adminuserid");
        if (!adminUserId) return;
        const data = await fetchBranchAddress(adminUserId);
        if (data && data.length > 0) {
          setCompanyDetails({
            CompanyName: data[0].CName || "",
            CompanyEmailAddress: data[0].Email || "",
          });
        }
      } catch (error) {
        console.error("Failed to load branch data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Top Navbar */}
      <div className="bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex justify-between items-center sticky top-0 z-30">
        <div>
          <p className="text-xs text-gray-400">Welcome back 👋</p>
          <h1 className="text-lg font-bold text-gray-800">
            <span className="text-blue-600">{companyDetails.CompanyName || "Admin"}</span>
          </h1>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 px-3 py-2 rounded-xl border border-gray-200 transition-all"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-blue-500">
              <img src={AdminLogo} alt="Admin" className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:flex flex-col text-left">
              <span className="text-sm font-semibold text-gray-700">Admin</span>
              <span className="text-xs text-gray-400">Administrator</span>
            </div>
            <IoMdArrowDropdownCircle className={`text-xl text-blue-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl w-52 z-50 overflow-hidden">
              <div className="px-4 py-3 bg-blue-50 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-700">Admin Panel</p>
                <p className="text-xs text-gray-400 truncate">{companyDetails.CompanyEmailAddress || "admin@example.com"}</p>
              </div>
              <button onClick={() => navigate('/index')} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                <i className="bi bi-house text-blue-500"></i> Dashboard
              </button>
              <button onClick={() => navigate('/Setting')} className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50">
                <i className="bi bi-gear text-blue-500"></i> Settings
              </button>
              <div className="border-t border-gray-100"></div>
              <button
                onClick={() => { localStorage.removeItem('adminuserid'); window.location.href = '/'; }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
              >
                <i className="bi bi-box-arrow-right"></i> Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="flex-1 overflow-y-auto p-6 bg-gray-100">

        {/* Stats Cards */}
        <Card />

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Order Count</h2>
            <Graf />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-5">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Order Amount</h2>
            <Grafinamount />
          </div>
        </div>

        {/* Top Sale Products */}
        <div className="bg-white rounded-2xl shadow-md p-5 mb-6">
          <h2 className="text-base font-semibold text-gray-700 mb-4">🏆 Top Sale Products</h2>
          <Topsaleproduct />
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-2xl shadow-md p-5">
          <h2 className="text-base font-semibold text-gray-700 mb-4">📦 Recent Orders</h2>
          <RecentOrderSearch />
        </div>

      </div>
    </div>
  );
};

export default Header;
