import Slider from "../components/sidebar";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetcDeliveryTime, deleteDeliveryTime } from "../services/DeliveryTime";
import { updatesaleorder,API_FetchSelectSettingsNew } from '../services/Order';


const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orderDetails, setOrderDetails] = useState(null);
  const [deliverytime, setDeliverytime] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState("");
  const [status, setStatus] = useState("0");
  const [deliverydate, setDeliverydate] = useState("");
  const [whatsapdata, setwhatsapdata] = useState([]);   
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) {
      alert("Session Closed. Please Login Again!");
      setTimeout(() => navigate("/"), 2000);
    } else {
      setAdminId(Number(adminUserId));
    }
  }, [navigate]);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("ordereditdetails"));
    if (orderData) {
      const selectedOrder = orderData.find((order) => order.Id === parseInt(id, 10));
      if (selectedOrder) {
        setOrderDetails(selectedOrder);

        console.log(selectedOrder);
      } else {
        navigate("/Admin/OrderPanel");
      }
    } else {
      navigate("/Admin/OrderPanel");
    }
  }, [id, navigate]);

  useEffect(() => {
    if (adminId) {
      fetchDeliveryTimeData();
    }
  }, [adminId]);


  const FetchSelectSettingsNew = async () => {
    try {
        const list = await API_FetchSelectSettingsNew(adminId);
  

        if (Array.isArray(list) && list.length > 0) {
            setwhatsapdata(list); 
    
        } else {
            console.error("Fetched data is not a valid array or is empty.");
            setwhatsapdata([]); 
        }
    } catch (error) {
        setwhatsapdata([]);
        console.error("Error fetching categories:", error);
    }
};


useEffect(() => {
  // Call FetchSelectSettingsNew() just once when the component mounts
  FetchSelectSettingsNew();
}, []);





  const fetchDeliveryTimeData = async () => {
    try {
      const data = await fetcDeliveryTime(adminId);
      console.log(data)
      setDeliverytime(data || []);
    } catch (error) {
      setError("Error fetching delivery time data: " + error.message);
    }
  };



   





  const downloadInvoicePDF = () => {
    const printContent = `
      <html>
        <head>
          <title>Invoice ${OrderNo}</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
              line-height: 1.6; 
              color: #333; 
              background: #fff;
              padding: 40px;
            }
            .invoice-container {
              max-width: 800px;
              margin: 0 auto;
              background: #fff;
              border: 2px solid #e0e0e0;
              border-radius: 10px;
              overflow: hidden;
              box-shadow: 0 0 20px rgba(0,0,0,0.1);
            }
            .invoice-header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              position: relative;
            }
            .invoice-header::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="50" cy="50" r="1" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            }
            .company-name {
              font-size: 32px;
              font-weight: 700;
              margin-bottom: 5px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }
            .invoice-title {
              font-size: 18px;
              font-weight: 300;
              opacity: 0.9;
            }
            .invoice-body {
              padding: 40px;
            }
            .invoice-meta {
              display: flex;
              justify-content: space-between;
              margin-bottom: 40px;
              gap: 40px;
            }
            .invoice-info, .customer-info {
              flex: 1;
              padding: 25px;
              background: #f8f9fa;
              border-radius: 8px;
              border-left: 4px solid #667eea;
            }
            .info-title {
              font-size: 16px;
              font-weight: 600;
              color: #667eea;
              margin-bottom: 15px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }
            .info-item {
              margin-bottom: 8px;
              display: flex;
              justify-content: space-between;
            }
            .info-label {
              font-weight: 600;
              color: #555;
              min-width: 100px;
            }
            .info-value {
              color: #333;
              font-weight: 500;
            }
            .items-table {
              width: 100%;
              border-collapse: collapse;
              margin: 30px 0;
              background: #fff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .items-table thead {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
            }
            .items-table th {
              padding: 15px 12px;
              text-align: left;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.5px;
              font-size: 12px;
            }
            .items-table td {
              padding: 15px 12px;
              border-bottom: 1px solid #eee;
              vertical-align: middle;
            }
            .items-table tbody tr:hover {
              background-color: #f8f9fa;
            }
            .items-table tbody tr:last-child td {
              border-bottom: none;
            }
            .product-name {
              font-weight: 600;
              color: #333;
            }
            .amount {
              font-weight: 600;
              color: #2c5aa0;
            }
            .summary-section {
              margin-top: 40px;
              display: flex;
              justify-content: flex-end;
            }
            .summary-box {
              background: #f8f9fa;
              padding: 25px;
              border-radius: 8px;
              min-width: 300px;
              border: 1px solid #e0e0e0;
            }
            .summary-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              padding: 5px 0;
            }
            .summary-row.total {
              border-top: 2px solid #667eea;
              margin-top: 15px;
              padding-top: 15px;
              font-size: 18px;
              font-weight: 700;
              color: #667eea;
            }
            .summary-label {
              font-weight: 600;
              color: #555;
            }
            .summary-value {
              font-weight: 600;
              color: #333;
            }
            .footer {
              margin-top: 40px;
              text-align: center;
              padding: 20px;
              background: #f8f9fa;
              border-radius: 8px;
              color: #666;
              font-size: 14px;
            }
            .thank-you {
              font-size: 18px;
              font-weight: 600;
              color: #667eea;
              margin-bottom: 10px;
            }
            @media print {
              body { padding: 0; }
              .invoice-container { border: none; box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="invoice-container">
            <div class="invoice-header">
              <div class="company-name">YOUR COMPANY NAME</div>
              <div class="invoice-title">Professional Invoice</div>
            </div>
            
            <div class="invoice-body">
              <div class="invoice-meta">
                <div class="invoice-info">
                  <div class="info-title">Invoice Details</div>
                  <div class="info-item">
                    <span class="info-label">Invoice #:</span>
                    <span class="info-value">${OrderNo}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Date:</span>
                    <span class="info-value">${new Date(OrderDate).toLocaleDateString('en-GB')}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Payment:</span>
                    <span class="info-value">${OrderType || '--'}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Delivery:</span>
                    <span class="info-value">${DeliveryType || '--'}</span>
                  </div>
                </div>
                
                <div class="customer-info">
                  <div class="info-title">Bill To</div>
                  <div class="info-item">
                    <span class="info-label">Name:</span>
                    <span class="info-value">${CustomerName || '--'}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Mobile:</span>
                    <span class="info-value">${MobileNo || '--'}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Address:</span>
                    <span class="info-value">${[Address1, Address2, City, Pincode].filter(Boolean).join(', ') || '--'}</span>
                  </div>
                </div>
              </div>
              
              <table class="items-table">
                <thead>
                  <tr>
                    <th style="width: 8%">#</th>
                    <th style="width: 40%">Product Description</th>
                    <th style="width: 13%">MRP</th>
                    <th style="width: 13%">Unit Price</th>
                    <th style="width: 10%">Qty</th>
                    <th style="width: 16%">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  ${OrderDetails && OrderDetails.length > 0 ? OrderDetails.map((item, index) => `
                    <tr>
                      <td style="text-align: center; color: #666;">${index + 1}</td>
                      <td class="product-name">${item.ProductName}</td>
                      <td>₹${Number(item.MRP).toFixed(2)}</td>
                      <td>₹${Number(item.SaleRate).toFixed(2)}</td>
                      <td style="text-align: center;">${item.ItemQty}</td>
                      <td class="amount">₹${(Number(item.SaleRate) * Number(item.ItemQty)).toFixed(2)}</td>
                    </tr>
                  `).join('') : '<tr><td colspan="6" style="text-align: center; color: #999; padding: 40px;">No items found</td></tr>'}
                </tbody>
              </table>
              
              <div class="summary-section">
                <div class="summary-box">
                  <div class="summary-row">
                    <span class="summary-label">Subtotal:</span>
                    <span class="summary-value">₹${Number(Grossamt || 0).toFixed(2)}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">Delivery Charges:</span>
                    <span class="summary-value">₹${Number(DeliveryFees || 0).toFixed(2)}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">Discount:</span>
                    <span class="summary-value">-₹${Number(CouponDiscount || 0).toFixed(2)}</span>
                  </div>
                  <div class="summary-row">
                    <span class="summary-label">Wallet Used:</span>
                    <span class="summary-value">-₹${Number(WalletAmount || 0).toFixed(2)}</span>
                  </div>
                  <div class="summary-row total">
                    <span class="summary-label">Total Amount:</span>
                    <span class="summary-value">₹${totalAmount}</span>
                  </div>
                </div>
              </div>
              
              <div class="footer">
                <div class="thank-you">Thank you for your business!</div>
                <p>This is a computer-generated invoice. No signature required.</p>
                <p>For any queries, please contact our customer support.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handleSave = async () => {

    await FetchSelectSettingsNew();
    
    setLoading(true);
    const Pid = parseInt(id);
    const DD1 = selectedDeliveryTime;
    const DD = deliverydate;
    const userMobileNo = orderDetails?.MobileNo || "";
     const objlist = {
      temp: status,
      deliveryTime: selectedDeliveryTime,
      deliverydate: deliverydate,
    };

    try {
      if (whatsapdata.length > 0){
        const { WhatsAppUrl, OwnerMobileNo } = whatsapdata[0]; 

      const success = await updatesaleorder(adminId, Pid, status, DD, DD1, WhatsAppUrl, OwnerMobileNo,userMobileNo);
      if (success) {
        alert("Order updated successfully!");
        navigate(`/Order`);
      } else {
        setErrorMessage("Failed to update the order.");
      }


    } 
  
  } catch (error) {
      console.error("Error during order update:", error);
      setErrorMessage("An error occurred while updating the order.");
    } finally {
      setLoading(false);
    } 
  };

  if (!orderDetails) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  const {
    OrderNo,
    OrderDate,
    DeliveryType,
    OrderType,
    Grossamt,
    DeliveryFees,
    CouponDiscount,
    WalletAmount,
    CustomerName,
    DeliveryDate: OrderDeliveryDate,
    Address1,
    Address2,
    City,
    Pincode,
    MobileNo,
    OrderDetails,
  } = orderDetails;

  const totalAmount = (
    Number(Grossamt || 0) +
    Number(DeliveryFees || 0) - 
    Number(CouponDiscount || 0) - 
    Number(WalletAmount || 0)
  ).toFixed(2);

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex-shrink-0">
        <Slider />
      </div>
      <div className="py-6 w-full bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="px-6 py-4 bg-gray-900 text-white">
              <h5 className="text-xl font-semibold">Invoice Details</h5>
            </div>

            <div className="p-6 bg-white">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Invoice Header */}
                <div>
                  <h2 className="text-3xl font-semibold text-gray-800">Invoice #{OrderNo}</h2>
                  <p className="text-gray-600 mt-2">
                    <strong>Order Date:</strong>{" "}
                    {new Date(OrderDate).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Delivery Type:</strong>{" "} 
                    {DeliveryType || "--"}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Payment Type:</strong>{" "} 
                    {OrderType || "--"}
                  </p>
                </div>

                {/* Delivery Address */}
                <div className="text-right">
                  <p className="text-gray-600">
                    <strong>Customer:</strong> {CustomerName || "--"}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Address:</strong>{" "}
                    {`${Address1 || ""}, ${Address2 || ""}, ${City || ""}, ${Pincode || ""}`}
                  </p>
                  <p className="text-gray-600 mt-2">
                    <strong>Mobile:</strong> {MobileNo || "--"}
                  </p>
                </div>
              </div>

              {/* Order Details */}
              <div className="mt-6 overflow-x-auto">
                {OrderDetails && OrderDetails.length > 0 ? (
                  <table className="w-full table-auto border-collapse text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="px-4 py-2 text-left">S.No</th>
                        <th className="px-4 py-2 text-left">Product</th>
                        <th className="px-4 py-2 text-left">MRP</th>
                        <th className="px-4 py-2 text-left">Price</th>
                        <th className="px-4 py-2 text-left">Qty</th>
                        <th className="px-4 py-2 text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {OrderDetails.map((item, index) => (
                        <tr key={index} className="border-t border-gray-200">
                          <td className="px-4 py-2">{index + 1}</td>
                          <td className="px-4 py-2">{item.ProductName}</td>
                          <td className="px-4 py-2">{Number(item.MRP).toFixed(2)}</td>
                          <td className="px-4 py-2">{Number(item.SaleRate).toFixed(2)}</td>
                          <td className="px-4 py-2">{item.ItemQty}</td>
                          <td className="px-4 py-2">{(Number(item.SaleRate) * Number(item.ItemQty)).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center text-red-500 font-semibold text-lg">
                    No data to display!
                  </div>
                )}
              </div>

              {/* Summary Section */}
              <div className="mt-6 border-t border-gray-200 pt-4 flex justify-between">
                <div>
                  <div className="flex justify-between">
                    <strong>Sub Total:</strong>
                    <span>{Grossamt ? Number(Grossamt).toFixed(2) : "0.00"}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <strong>Delivery Fees:</strong>
                    <span>{DeliveryFees ? Number(DeliveryFees).toFixed(2) : "0.00"}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <strong>Coupon Discount:</strong>
                    <span>{CouponDiscount ? Number(CouponDiscount).toFixed(2) : "0.00"}</span>
                  </div>
                </div>
                <div className="font-semibold">
                  <div className="flex justify-between">
                    <strong>Total Amount:</strong>
                    <span>{totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Section */}
            <div className="px-6 py-4 bg-gray-50">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-medium mb-2">Delivery Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 border rounded-md"
                    value={deliverydate || (OrderDeliveryDate ? new Date(OrderDeliveryDate).toISOString().split('T')[0] : "")}
                    onChange={(e) => setDeliverydate(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Delivery Time</label>
                  <select
                    value={selectedDeliveryTime || ""}
                    onChange={(e) => setSelectedDeliveryTime(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="">Select Delivery Time</option>
                    {deliverytime.map((time) => (
                      <option key={time.id} value={time.id}>{time.time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-2">Status</label>
                  <select
                    value={status || ""}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-2 border rounded-md"
                  >
                    <option value="0">Pending</option>
                    <option value="-1">Cancelled</option>
                    <option value="1">Accepted</option>
                    <option value="2">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex justify-between">
                <button
                  onClick={downloadInvoicePDF}
                  className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
                >
                  🖨️ Print Invoice
                </button>
                <button
                  onClick={handleSave}
                  disabled={loading}
                  className={`px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} transition-colors`}
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>

            {errorMessage && <div className="text-red-500 text-center mt-4">{errorMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderEdit;
