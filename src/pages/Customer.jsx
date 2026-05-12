import React, { useState, useEffect } from "react";
import { fetchSelectCoustomer, UpdateCustomer } from "../services/Customer";
import customerimage from '../assets/customer-avat.jpg';
import { PageLayout, TableCard, FilterBar, SearchInput, TableHead, StatusBadge, EmptyState, LoadingState, Pagination } from "../components/PageLayout";

const Customer = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isB2BChecked, setIsB2BChecked] = useState(false);
  const companyId = localStorage.getItem("adminuserid");

  useEffect(() => {
    if (companyId) fetchCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId]);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await fetchSelectCoustomer(Number(companyId));
      if (data && Array.isArray(data)) setCustomers(data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleUpdate = async (id) => {
    if (!window.confirm("Update this customer?")) return;
    try {
      const isUpdated = await UpdateCustomer(id, isB2BChecked ? 1 : 0);
      if (isUpdated) { alert("Customer updated successfully."); setIsModalOpen(false); }
      else alert("Failed to update.");
    } catch (error) { alert("Error: " + error.message); }
  };

  const filteredCustomers = customers.filter((c) => c.MobileNo.includes(searchTerm));
  const totalPages = Math.ceil(filteredCustomers.length / rowsPerPage);
  const currentCustomers = filteredCustomers.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePageChange = (dir) => {
    if (dir === "prev" && currentPage > 1) setCurrentPage((p) => p - 1);
    else if (dir === "next" && currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <PageLayout title="Customers" subtitle={`${filteredCustomers.length} customers`}>
      <FilterBar>
        <SearchInput value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by mobile number..." />
      </FilterBar>

      <TableCard>
        {loading ? <LoadingState /> : filteredCustomers.length === 0 ? <EmptyState message="No customers found" /> : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <TableHead headers={["#", "Customer Name", "Email", "Mobile", "Status", "Action"]} />
                <tbody className="divide-y divide-gray-50">
                  {currentCustomers.map((customer, index) => (
                    <tr key={customer.Id} className="hover:bg-blue-50 transition-colors">
                      <td className="px-5 py-4 text-gray-400 text-xs">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={customerimage} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                          <span className="font-medium text-gray-800">{customer.CustomerName}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-gray-500">{customer.Email}</td>
                      <td className="px-5 py-4 text-gray-600">{customer.MobileNo}</td>
                      <td className="px-5 py-4"><StatusBadge active={customer.Active === 1} /></td>
                      <td className="px-5 py-4">
                        <button onClick={() => { setCurrentCustomer(customer); setIsB2BChecked(customer.GSTNo === '1'); setIsModalOpen(true); }}
                          className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium px-3">
                          ✏️ Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} totalItems={filteredCustomers.length} rowsPerPage={rowsPerPage} />
          </>
        )}
      </TableCard>

      {/* Customer Modal */}
      {isModalOpen && currentCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-800">Customer Details</h2>
              <button onClick={() => setIsModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 text-lg">&times;</button>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center mb-6">
                <img src={customerimage} alt="avatar" className="w-20 h-20 rounded-full border-4 border-blue-100 mb-3" />
                <h3 className="font-semibold text-gray-800 text-lg">{currentCustomer.CustomerName}</h3>
                <p className="text-gray-400 text-sm">{currentCustomer.MobileNo}</p>
              </div>

              <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 rounded-xl">
                <input type="checkbox" id="b2b" checked={isB2BChecked} onChange={() => setIsB2BChecked(!isB2BChecked)}
                  className="w-4 h-4 text-blue-600 rounded" />
                <label htmlFor="b2b" className="text-sm font-medium text-gray-700">B2B Customer</label>
              </div>

              {[
                { label: "Name", value: currentCustomer.CustomerName },
                { label: "Email", value: currentCustomer.Email },
                { label: "Mobile", value: currentCustomer.MobileNo },
                { label: "City", value: currentCustomer.City },
                { label: "Pincode", value: currentCustomer.Pincode },
              ].map(({ label, value }) => (
                <div key={label} className="mb-4">
                  <label className="block text-xs font-medium text-gray-500 mb-1">{label}</label>
                  <input type="text" value={value || ''} disabled className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-700" />
                </div>
              ))}

              <div className="mb-4">
                <label className="block text-xs font-medium text-gray-500 mb-1">Address</label>
                <textarea value={`${currentCustomer.Address1 || ''} ${currentCustomer.Address2 || ''}`} disabled
                  className="w-full px-3 py-2 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-700 resize-none" rows={2} />
              </div>

              <button onClick={() => handleUpdate(currentCustomer.Id)}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors">
                Update Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default Customer;
