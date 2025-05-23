import React, { useState } from 'react';
import AdminLogo from '../assets/logo.png';
import { IoMdMenu } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { TbReportSearch } from "react-icons/tb";

import { GiKnightBanner } from "react-icons/gi"; 
import { TbBrandCodesandbox } from "react-icons/tb";
import { FaPersonBiking } from "react-icons/fa6";
import { MdOutlinePriceCheck } from "react-icons/md";
import { PiMapPinArea } from "react-icons/pi";
import { MdOutlineLocalOffer } from "react-icons/md";
import { BiHome, BiCategory, BiSubdirectoryRight, BiBriefcase, BiGift, BiUser, BiCart, BiBell } from "react-icons/bi"; 


const Sidebbar = () => {
const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isSubCategoryOpen, setIsSubCategory] = useState(false);
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isOfferOpen, setIsOfferpostOpen] = useState(false);
  const [isDeliveryTimeOpen, setIsDeliveryTime] = useState(false);
  const [isAreasOpen, setIsAreaOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCouponOpen, setIsCouponOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isDeliveryAreaOpen, setIsDeliveryAreaOpen] = useState(false);
 const [isDeliverychargeopen,setIsDeliverychargeopen] =useState(false);
  const [IsDriver, setIsDriver] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };
  const toggleAreas = () => {
    setIsAreaOpen(!isAreasOpen);
  };
  const toggleDeliveryTime = () => {
    setIsDeliveryTime(!isDeliveryTimeOpen);
  };
  const toggleOffer = () => {
    setIsOfferpostOpen(!isOfferOpen);
  };
  const toggleBanner = () => {
    setIsBannerOpen(!isBannerOpen);
  };
  const toggleCategory = () => {
    setCategoryOpen(!isCategoryOpen);
  };
  const toggleSubCategory = () => {
    setIsSubCategory(!isSubCategoryOpen);
  };
  const toggleCoupon = () => {
    setIsCouponOpen(!isCouponOpen);
  };

  const toggleBrand = () => {
    setIsBrandOpen(!isBrandOpen);
  };

  const toggledeliveryArea = () => {
    setIsDeliveryAreaOpen(!isDeliveryAreaOpen);
  };


  const toggledeliverycharge = () => {
    setIsDeliverychargeopen(!isDeliverychargeopen);
  };


  const toggledriver = () => {
    setIsDriver(!IsDriver);
  };




  return (
    <>
    <div className='flex ' >
  <div
        className={`bg-[#0166ff] text-gray-100 w-64 min-h-screen transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform duration-300`}
      >
        <div className="p-4 text-center text-xl font-bold border-b border-gray-700">
          <div className="header mb-6">
            <div className="logo bg-white rounded-lg h-20">
              <img src={AdminLogo} alt="Admin Logo" className="w-56 mx-auto h-20" />
            </div>
          </div>
        </div>

       
          <ul className="space-y-2">
            {/* Products Dropdown */}
           

            <li>
            <button
                onClick={() => navigate('/index')}
                className="flex items-center gap-3 p-3 w-full text-left rounded-lg hover:bg-gray-700 transition font-900"
              >
                <i className="bi bi-house text-xs font-light"></i>
                <BiHome className="text-lg" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
            <button
                onClick={() => navigate('/branch')}
                className="flex items-center gap-3 p-3 w-full text-left rounded-lg hover:bg-gray-700 transition font-900"
              >
                <i className="bi bi-house text-lg font-900"></i>
                <BiBriefcase className="text-lg" />
                <span>Branch</span>
              </button>
            </li>


            {/* <li>
              <div className="group">
                <button
                  onClick={toggleAreas}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
               
                >
                  <span className="flex items-center gap-3 text-md font-900 text-white">
                    <i className="bi bi-briefcase text-md font-900"></i>
                    <span>Areas</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      isAreasOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {isAreasOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                     <li>
                  <button
                   onClick={() => navigate('/Area')}
               className="block p-2 rounded-lg hover:bg-gray-600 text-white w-full text-left"
                 >
                All Areas
               </button>
               </li>
                    <li>
           <button
                         onClick={() => navigate("/AddArea/id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Add Areas
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li> */}
            {/* <li>
              <div className="group">
                <button
                  onClick={toggleDeliveryTime }
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
                 
                >
                  <span className="flex items-center gap-3 text-md font-900 text-white">
                    <i className="bi bi-briefcase text-md"></i>
                    <span>Delivery Time</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      isDeliveryTimeOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {isDeliveryTimeOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                    <button
                         onClick={() => navigate("/DeliveryTime")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                     All Delivery Time 
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => navigate("/AddDeliveryTime/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Add DeliveryTime
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li> */}
          
            <li>
              <div className="group">
                <button
                  onClick={toggleBanner }
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
                 
                >
                  <span className="flex items-center gap-3 text-mg font-900 text-white">
                    <i className="bi bi-briefcase text-md"></i>
                    <GiKnightBanner className="text-md" /> {/* Icon for Banner Post */}
                    <span>Banner Post</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      isBannerOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                
                </button>
                {isBannerOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <button
                       onClick={() => navigate("/bannerpost/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        All Banner Post
                      </button>
                    </li>
                 
                    <li>
                      <button
                       onClick={() => navigate("/addbannerpost/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                       Add Banner Post
                      </button>
                    </li>


                  </ul>
                )}
              </div>
            </li>
            <li>
              <div className="group">
                <button
                  onClick={toggleCategory }
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
                 
                >
                  <span className="flex items-center gap-3 text-md font-900 text-white">
                    <i className="bi bi-briefcase text-md"></i>
                    <BiCategory className="text-md" />
                    <span>Category</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      isCategoryOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {isCategoryOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <a
                       onClick={() => navigate("/category")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        All Category
                      </a>
                    </li>
                    <li>
                      <button
                       onClick={() => navigate("/addcategory/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Add Category
                      </button>
                    </li>
                    <li>
                      <button
                       onClick={() => navigate("/CategoryReorder")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Category Recorder
                        
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            <li>
              <div className="group">
                <button
                  onClick={toggleSubCategory }
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
                 
                >
                  <span className="flex items-center gap-3 text-md font-900 text-white">
                    <i className="bi bi-briefcase text-md"></i>
                    <BiSubdirectoryRight className="text-md" />
                    <span>SubCategory</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      isSubCategoryOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {isSubCategoryOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <button
                     onClick={() => navigate("/SubCategory")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        All SubCategory
                      </button>
                    </li>
                    <li>
                      <button
                     onClick={() => navigate("/AddSubCategory/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Add SubCategory
                      </button>
                    </li>
                    <li>
                      <button
                      onClick={() => navigate("/SubCategoryReorder")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        SubCategory Recorder
                      </button>
                    </li>
                  </ul>
                )}
              </div>
              <li>
              <div className="group">
                <button
                  onClick={toggleProducts}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
                 
                >
                  <span className="flex items-center gap-3 text-md font-900 text-white">
                    <i className="bi bi-briefcase text-md"></i>
                    <BiCart className="text-md" />
                    <span>Products</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      isProductsOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {isProductsOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <button
                       onClick={() => navigate("/AllProducts")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        All Products
                      </button>
                    </li>
                    <li>
                      <button
                     onClick={() => navigate("/AddProducts/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Add Products
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            
            <li>
              <div className="group">
                <button
                  onClick={toggleBrand}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
                 
                >
                  <span className="flex items-center gap-3 text-md font-900 text-white">
                    <i className="bi bi-briefcase text-md"></i>
                    <TbBrandCodesandbox />
                    <span>Brand</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      isBrandOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {isBrandOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <button
                       onClick={() => navigate("/AllBrand")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        All Brand
                      </button>
                    </li>
                    <li>
                      <button
                     onClick={() => navigate("/Brand/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Add Brand
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>

             
            <li>
              <div className="group">
                <button
                  onClick={toggledriver }
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
                 
                >
                  <span className="flex items-center gap-3 text-md font-900 text-white">
                    <i className="bi bi-briefcase text-md"></i>
                    <FaPersonBiking />
                    <span>DriverMaster</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      IsDriver ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {IsDriver && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <button
                       onClick={() => navigate("/AllDriver")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        All Driver
                      </button>
                    </li>
                    <li>
                      <button
                     onClick={() => navigate("/AddDriver/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Add Driver
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
           

            <li>
              <div className="group">
                <button
                  onClick={toggledeliverycharge }
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
                 
                >
                  <span className="flex items-center gap-3 text-md font-900 text-white">
                    <i className="bi bi-briefcase text-md"></i>
                    <MdOutlinePriceCheck />
                    <span>DeliveryCharge</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      isDeliverychargeopen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {isDeliverychargeopen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <button
                       onClick={() => navigate("/DeliveryCharge")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        All Delivery Charge
                      </button>
                    </li>
                    <li>
                      <button
                     onClick={() => navigate("/AddDeliveryCharge/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Add Delivery Charge
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>



            <li>
              <div className="group">
                <button
                  onClick={toggledeliveryArea }
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
                 
                >
                  <span className="flex items-center gap-3 text-md font-900 text-white">
                    <i className="bi bi-briefcase text-md"></i>
                    <PiMapPinArea className="text-md" />
                    <span>DeliveryArea</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      isDeliveryAreaOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {isDeliveryAreaOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <button
                       onClick={() => navigate("/DeliveryArea")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        All DeliveryArea
                      </button>
                    </li>
                    <li>
                      <button
                     onClick={() => navigate("/AddDeliveryArea/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Add DeliveryArea
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>

            <li>
              <div className="group">
                <button
                  onClick={toggleCoupon}
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
                 
                >
                  <span className="flex items-center gap-3 text-md font-900 text-white">
                    <i className="bi bi-briefcase text-md"></i>
                    <BiGift className="text-md" />
                    <span>offer coupon</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      isCouponOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {isCouponOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <button
                       onClick={() => navigate("/Coupon")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        All Coupon
                      </button>
                    </li>
                    <li>
                      <button
                     onClick={() => navigate("/Addcoupon/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Add Coupon
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
            </li>
            <li>
              <div className="group">
                <button
                  onClick={toggleOffer }
                  className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-gray-700 transition focus:outline-none"
                 
                >
                  <span className="flex items-center gap-3 text-md font-900 text-white">
                    <i className="bi bi-briefcase text-md"></i>
                    <MdOutlineLocalOffer className="text-md" />
                    <span>Offer Post</span>
                  </span>
                  <i
                    className={`bi bi-chevron-down transition-transform ${
                      isOfferOpen ? 'rotate-180' : ''
                    }`}
                  ></i>
                </button>
                {isOfferOpen && (
                  <ul className="ml-6 mt-2 space-y-2">
                    <li>
                      <button
                        onClick={() => navigate("/OfferPost")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                         Posters
                      </button>
                    </li>
                    <li>
                      <button
                         onClick={() => navigate("/AddOfferPost/:id")}
                        className="block p-2 rounded-lg hover:bg-gray-600 text-white"
                      >
                        Posters
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </li>
         
            <li>
              <button
              onClick={() => navigate("/OfferNotification")}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition font-900"
              >
                <i className="bi bi-app-indicator text-md"></i>
                <BiBell className="text-md" />
                <span>Offer Notification</span>
              </button>
            </li>
            <li>
              <button
               onClick={() => navigate("/Order")}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition font-900"
              >
                <i className="bi bi-house text-md font-semibold"></i>
                <BiCart className="text-md" />
                <span>Orders</span>
              </button>
            </li>
            <li>
              <button
            onClick={() => navigate("/Customer")}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition font-900"
              >
                <i className="bi bi-house text-md font-semibold"></i>
                <BiUser className="text-md" />
                <span>Customers</span>
              </button>
            </li> 

            <li>
              <button
            onClick={() => navigate("/ReportView")}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 transition font-900"
              >
                <i className="bi bi-house text-md font-semibold"></i>
                <TbReportSearch  className="text-md" />
                <span>reports</span>
              </button>
            </li> 


            
          </ul>
       
      </div>
      <div className="flex-1 p-6">
  {/* Button to toggle sidebar */}
  <button
    onClick={toggleSidebar}
    className="absolute top-4 right-4 text-white focus:outline-none md:hidden lg:hidden"
  >
    <IoMdMenu style={{ height: '30px', width: '30px', color: 'black' }} />
  </button>

  {/* Content Goes Here */}
</div>

      </div>
      
    </>
  )
}

export default Sidebbar