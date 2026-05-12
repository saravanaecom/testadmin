import React, { useState } from 'react';
import AdminLogo from '../assets/logo.png';
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useNavigate, useLocation } from 'react-router-dom';
import { TbReportSearch } from "react-icons/tb";
import { GiKnightBanner } from "react-icons/gi";
import { TbBrandCodesandbox } from "react-icons/tb";
import { FaPersonBiking } from "react-icons/fa6";
import { MdOutlinePriceCheck, MdOutlineLocalOffer, MdKeyboardArrowDown } from "react-icons/md";
import { PiMapPinArea } from "react-icons/pi";
import { BiHome, BiCategory, BiSubdirectoryRight, BiBriefcase, BiGift, BiUser, BiCart, BiBell } from "react-icons/bi";

const Sidebbar = () => {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategory] = useState(false);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isOfferOpen, setIsOfferpostOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isDeliveryAreaOpen, setIsDeliveryAreaOpen] = useState(false);
  const [isDeliverychargeopen, setIsDeliverychargeopen] = useState(false);
  const [IsDriver, setIsDriver] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const menuItemClass = (path) =>
    `flex items-center gap-3 px-4 py-2.5 w-full rounded-lg transition-all duration-200 text-sm font-medium ${
      isActive(path)
        ? 'bg-white text-blue-600 shadow-md'
        : 'text-blue-100 hover:bg-blue-600 hover:text-white'
    }`;

  const subMenuItemClass = (path) =>
    `flex items-center gap-2 px-3 py-2 w-full rounded-lg text-sm transition-all duration-200 ${
      isActive(path)
        ? 'bg-white text-blue-600 font-semibold'
        : 'text-blue-200 hover:bg-blue-600 hover:text-white'
    }`;

  const MenuGroup = ({ icon, label, isOpen, onToggle, children }) => (
    <div>
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full px-4 py-2.5 rounded-lg text-blue-100 hover:bg-blue-600 hover:text-white transition-all duration-200 text-sm font-medium"
      >
        <span className="flex items-center gap-3">{icon}<span>{label}</span></span>
        <MdKeyboardArrowDown className={`text-lg transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="ml-4 mt-1 space-y-1 border-l-2 border-blue-400 pl-3">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-blue-600 text-white p-2 rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <IoMdClose size={22} /> : <IoMdMenu size={22} />}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed md:static top-0 left-0 h-full z-40 flex flex-col w-64 bg-gradient-to-b from-blue-700 to-blue-900 shadow-2xl transform transition-transform duration-300 ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>

        {/* Logo */}
        <div className="flex items-center justify-center px-4 py-5 border-b border-blue-600">
          <div className="bg-white rounded-xl p-1 shadow-md">
            <img src={AdminLogo} alt="Logo" className="h-12 w-48 object-contain" />
          </div>
        </div>

        {/* Nav */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">

          <button onClick={() => navigate('/index')} className={menuItemClass('/index')}>
            <BiHome className="text-lg" /><span>Dashboard</span>
          </button>

          <button onClick={() => navigate('/branch')} className={menuItemClass('/branch')}>
            <BiBriefcase className="text-lg" /><span>Branch</span>
          </button>

          <MenuGroup icon={<GiKnightBanner className="text-lg" />} label="Banner Post" isOpen={isBannerOpen} onToggle={() => setIsBannerOpen(!isBannerOpen)}>
            <button onClick={() => navigate('/bannerpost/:id')} className={subMenuItemClass('/bannerpost')}>All Banner Post</button>
            <button onClick={() => navigate('/addbannerpost/:id')} className={subMenuItemClass('/addbannerpost')}>Add Banner Post</button>
          </MenuGroup>

          <MenuGroup icon={<BiCategory className="text-lg" />} label="Category" isOpen={isCategoryOpen} onToggle={() => setCategoryOpen(!isCategoryOpen)}>
            <button onClick={() => navigate('/category')} className={subMenuItemClass('/category')}>All Category</button>
            <button onClick={() => navigate('/addcategory/:id')} className={subMenuItemClass('/addcategory')}>Add Category</button>
            <button onClick={() => navigate('/CategoryReorder')} className={subMenuItemClass('/CategoryReorder')}>Category Reorder</button>
          </MenuGroup>

          <MenuGroup icon={<BiSubdirectoryRight className="text-lg" />} label="SubCategory" isOpen={isSubCategoryOpen} onToggle={() => setIsSubCategory(!isSubCategoryOpen)}>
            <button onClick={() => navigate('/SubCategory')} className={subMenuItemClass('/SubCategory')}>All SubCategory</button>
            <button onClick={() => navigate('/AddSubCategory/:id')} className={subMenuItemClass('/AddSubCategory')}>Add SubCategory</button>
            <button onClick={() => navigate('/SubCategoryReorder')} className={subMenuItemClass('/SubCategoryReorder')}>SubCategory Reorder</button>
          </MenuGroup>

          <MenuGroup icon={<BiCart className="text-lg" />} label="Products" isOpen={isProductsOpen} onToggle={() => setIsProductsOpen(!isProductsOpen)}>
            <button onClick={() => navigate('/AllProducts')} className={subMenuItemClass('/AllProducts')}>All Products</button>
            <button onClick={() => navigate('/AddProducts/:id')} className={subMenuItemClass('/AddProducts')}>Add Products</button>
          </MenuGroup>

          <MenuGroup icon={<TbBrandCodesandbox className="text-lg" />} label="Brand" isOpen={isBrandOpen} onToggle={() => setIsBrandOpen(!isBrandOpen)}>
            <button onClick={() => navigate('/AllBrand')} className={subMenuItemClass('/AllBrand')}>All Brand</button>
            <button onClick={() => navigate('/Brand/:id')} className={subMenuItemClass('/Brand')}>Add Brand</button>
          </MenuGroup>

          <MenuGroup icon={<FaPersonBiking className="text-lg" />} label="Driver Master" isOpen={IsDriver} onToggle={() => setIsDriver(!IsDriver)}>
            <button onClick={() => navigate('/AllDriver')} className={subMenuItemClass('/AllDriver')}>All Driver</button>
            <button onClick={() => navigate('/AddDriver/:id')} className={subMenuItemClass('/AddDriver')}>Add Driver</button>
          </MenuGroup>

          <MenuGroup icon={<MdOutlinePriceCheck className="text-lg" />} label="Delivery Charge" isOpen={isDeliverychargeopen} onToggle={() => setIsDeliverychargeopen(!isDeliverychargeopen)}>
            <button onClick={() => navigate('/DeliveryCharge')} className={subMenuItemClass('/DeliveryCharge')}>All Delivery Charge</button>
            <button onClick={() => navigate('/AddDeliveryCharge/:id')} className={subMenuItemClass('/AddDeliveryCharge')}>Add Delivery Charge</button>
          </MenuGroup>

          <MenuGroup icon={<PiMapPinArea className="text-lg" />} label="Delivery Area" isOpen={isDeliveryAreaOpen} onToggle={() => setIsDeliveryAreaOpen(!isDeliveryAreaOpen)}>
            <button onClick={() => navigate('/DeliveryArea')} className={subMenuItemClass('/DeliveryArea')}>All Delivery Area</button>
            <button onClick={() => navigate('/AddDeliveryArea/:id')} className={subMenuItemClass('/AddDeliveryArea')}>Add Delivery Area</button>
          </MenuGroup>

          <MenuGroup icon={<BiGift className="text-lg" />} label="Offer Coupon" isOpen={isCouponOpen} onToggle={() => setIsCouponOpen(!isCouponOpen)}>
            <button onClick={() => navigate('/Coupon')} className={subMenuItemClass('/Coupon')}>All Coupon</button>
            <button onClick={() => navigate('/Addcoupon/:id')} className={subMenuItemClass('/Addcoupon')}>Add Coupon</button>
          </MenuGroup>

          <MenuGroup icon={<MdOutlineLocalOffer className="text-lg" />} label="Offer Post" isOpen={isOfferOpen} onToggle={() => setIsOfferpostOpen(!isOfferOpen)}>
            <button onClick={() => navigate('/OfferPost')} className={subMenuItemClass('/OfferPost')}>All Posters</button>
            <button onClick={() => navigate('/AddOfferPost/:id')} className={subMenuItemClass('/AddOfferPost')}>Add Poster</button>
          </MenuGroup>

          <button onClick={() => navigate('/OfferNotification')} className={menuItemClass('/OfferNotification')}>
            <BiBell className="text-lg" /><span>Offer Notification</span>
          </button>

          <button onClick={() => navigate('/Order')} className={menuItemClass('/Order')}>
            <BiCart className="text-lg" /><span>Orders</span>
          </button>

          <button onClick={() => navigate('/Customer')} className={menuItemClass('/Customer')}>
            <BiUser className="text-lg" /><span>Customers</span>
          </button>

          <button onClick={() => navigate('/ReportView')} className={menuItemClass('/ReportView')}>
            <TbReportSearch className="text-lg" /><span>Reports</span>
          </button>

        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-blue-600 text-center text-xs text-blue-300">
          © 2025 Admin Panel
        </div>
      </div>
    </>
  );
};

export default Sidebbar;
