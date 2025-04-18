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
  const [branchData, setBranchData] = useState([]);
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetails] = useState({
    CompanyName: "",
    CompanyEmailAddress: "",
    CompanyMobileNumber: "",
    Address1: "",
    Address2: "",
    AreaName: "",
    Pincode: "",
  });

  const updateCompanyDetails = (BranchList) => {
    if (BranchList.length !== 0) {
      const company = BranchList[0];
      setCompanyDetails({
        CompanyName: company.CName || "",
        CompanyEmailAddress: company.Email || "",
        CompanyMobileNumber: company.MobileNo1 || "",
        Address1: company.Address1 || "",
        Address2: company.Address2 || "",
        AreaName: company.AreaName || "",
        Pincode: company.Pincode || "",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const adminUserId = localStorage.getItem("adminuserid");
        if (!adminUserId) {
          console.error("No admin user ID found in localStorage.");
          return;
        }

        const data = await fetchBranchAddress(adminUserId);
        setBranchData(data);
        updateCompanyDetails(data);
      } catch (error) {
        console.error("Failed to load branch data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleHomeNavigate = () => {
    navigate(`/index`);
  };

  const handleNavigate = () => {
    navigate(`/Setting`);
  };

  return (
    <>
      <div className="bg-white shadow-sm z-50 w-full">
        <div className="container flex justify-between items-center px-4 py-3">
          <h1 className="text-lg md:text-2xl font-semibold">
            <span role="img" aria-label="wave" className="mr-2">👋</span>
            Hi, <span className="font-bold text-indigo-600">{companyDetails.CompanyName}</span>
          </h1>

          <button
            onClick={handleDropdownToggle}
            className="flex items-center gap-5 text-gray-700"
          >
            <div className="w-14 h-14 bg-white rounded-full overflow-hidden">
              <img
                className="w-full h-full object-cover"
                alt="Admin Avatar"
                src={AdminLogo}
              />
            </div>
            <span className="hidden sm:block text-base font-bold md:text-lg">Admin</span>
            <IoMdArrowDropdownCircle className="text-2xl md:text-3xl" />
          </button>
        </div>

        {isDropdownOpen && (
          <div className="absolute right-4 mt-2 bg-white border rounded-lg shadow-md w-48 z-50">
            <button
              onClick={handleHomeNavigate}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <i className="bi bi-house mr-2"></i> Home
            </button>
            <button
              onClick={handleNavigate}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <i className="bi bi-gear mr-2"></i> Settings
            </button>
            <div className="border-t my-2"></div>
            <button
              onClick={() => {
                localStorage.removeItem('adminuserid');
                window.location.href = '/login';
              }}
              className="block w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
            >
              <i className="bi bi-person mr-2"></i> Logout
            </button>
          </div>
        )}

        <Card top="80px" />

        {/* Graph Section */}
        <div className="flex flex-row justify-between mt-8 px-4">
          <div className="relative w-1/2 p-2 top-16">
            <Graf className="h-full w-full" />
          </div>
          <div className="relative w-1/2 p-2 top-16">
            <Grafinamount className="h-full w-full" />
          </div>
        </div>

        <div className="mt-20 px-4">
  <Topsaleproduct className="w-full p-4" />
</div>




        {/* Recent Orders Section */}
        <RecentOrderSearch className="mt-8" />
      </div>
    </>
  );
};

export default Header;