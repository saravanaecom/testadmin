import { BsCreditCard } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { IoMdTime } from "react-icons/io";
import { AiOutlineDollarCircle } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import { fetchDashboardData } from "../services/DashBordServices";

const Card = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardDataAsync = async () => {
      try {
        const adminUserId = localStorage.getItem("adminuserid");
        if (!adminUserId) return;
        const data = await fetchDashboardData(adminUserId);
        setDashboardData(data);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      }
    };
    fetchDashboardDataAsync();
  }, []);

  if (!dashboardData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-32 bg-gray-200 rounded-2xl animate-pulse" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Pending Orders",
      value: dashboardData.Pendingorder,
      icon: <BsCreditCard className="text-2xl" />,
      bg: "from-blue-500 to-blue-600",
      iconBg: "bg-blue-400",
    },
    {
      label: "Cancelled Orders",
      value: dashboardData.Cancelledorder,
      icon: <RxCross1 className="text-2xl" />,
      bg: "from-red-500 to-red-600",
      iconBg: "bg-red-400",
    },
    {
      label: "Total Orders",
      value: dashboardData.TotalOrder,
      icon: <IoMdTime className="text-2xl" />,
      bg: "from-green-500 to-green-600",
      iconBg: "bg-green-400",
    },
    {
      label: "Total Income",
      value: `₹${dashboardData.TotalOrderAmount}`,
      icon: <AiOutlineDollarCircle className="text-2xl" />,
      bg: "from-yellow-500 to-orange-500",
      iconBg: "bg-yellow-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-6">
      {cards.map((card, i) => (
        <div key={i} className={`bg-gradient-to-r ${card.bg} rounded-2xl p-5 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium opacity-90 mb-1">{card.label}</p>
              <p className="text-3xl font-bold">{card.value}</p>
              <p className="text-xs opacity-75 mt-2">Since last month</p>
            </div>
            <div className={`${card.iconBg} bg-opacity-40 p-3 rounded-xl`}>
              {card.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;
