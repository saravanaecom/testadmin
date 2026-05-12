import React, { useState, useEffect } from "react";
import { fetchSaleOrderview } from "../services/DashBordServices";

const RecentOrders = () => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);

  const [fromDate, setFromDate] = useState(startOfWeek.toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(endOfWeek.toISOString().split("T")[0]);
  const [status, setStatus] = useState("All");
  const [orders, setOrders] = useState([]);
  const [Comid, setCompanyId] = useState(null);
  const Status1 = ["All", "Pending", "Cancel", "Accepted", "Delivered"];

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-700",
    Cancel: "bg-red-100 text-red-700",
    Accepted: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
  };

  useEffect(() => {
    const adminuserid = localStorage.getItem("adminuserid");
    if (adminuserid) setCompanyId(Number(adminuserid));
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await fetchSaleOrderview([{ Id: 0, Comid, fromdate: fromDate, todate: toDate, Type: status }]);
      if (data && Array.isArray(data)) setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  useEffect(() => {
    if (Comid) fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Comid, fromDate, toDate, status]);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-5">
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-500 mb-1">From Date</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-500 mb-1">To Date</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
        </div>
        <div className="flex flex-col">
          <label className="text-xs font-medium text-gray-500 mb-1">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none">
            {Status1.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="flex items-end">
          <button onClick={fetchOrders}
            className="px-5 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors shadow-md">
            Apply
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-100">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 uppercase text-xs">
            <tr>
              {["Order No", "Order Date", "Customer", "Payment", "Amount", "Delivery Date", "Status"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-semibold tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.length > 0 ? orders.map((order, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">{order.OrderNo}</td>
                <td className="px-4 py-3 text-gray-600">{new Date(order.OrderDate).toLocaleDateString('en-GB')}</td>
                <td className="px-4 py-3 text-gray-700">{order.CustomerName}</td>
                <td className="px-4 py-3 text-gray-600">{order.OrderType}</td>
                <td className="px-4 py-3 font-semibold text-green-600">₹{order.NetAmt}</td>
                <td className="px-4 py-3 text-gray-600">{new Date(order.DeliveryDate).toLocaleDateString('en-GB')}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.orderstatus] || 'bg-gray-100 text-gray-600'}`}>
                    {order.orderstatus}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="7" className="px-4 py-8 text-center text-gray-400">No orders found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
