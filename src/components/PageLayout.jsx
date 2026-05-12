import React from 'react';
import Slider from './sidebar';
import { HiOutlinePlus } from 'react-icons/hi';
import { HiOutlineSearch } from 'react-icons/hi';

export const PageLayout = ({ title, subtitle, buttonLabel, onButtonClick, children }) => (
  <div className="flex h-screen bg-gray-100 overflow-hidden">
    <div className="flex-shrink-0"><Slider /></div>
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
        {buttonLabel && (
          <button onClick={onButtonClick}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl shadow-md transition-all text-sm font-medium">
            <HiOutlinePlus className="text-lg" />{buttonLabel}
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-6">{children}</div>
    </div>
  </div>
);

export const TableCard = ({ children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">{children}</div>
);

export const FilterBar = ({ children }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6">
    <div className="flex flex-wrap gap-3 items-center">{children}</div>
  </div>
);

export const SearchInput = ({ value, onChange, placeholder = "Search..." }) => (
  <div className="relative flex-1 min-w-48">
    <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
    <input type="text" value={value} onChange={onChange} placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none" />
  </div>
);

export const TableHead = ({ headers }) => (
  <thead className="bg-gray-50 border-b border-gray-100">
    <tr>
      {headers.map((h) => (
        <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
      ))}
    </tr>
  </thead>
);

export const StatusBadge = ({ active }) => (
  active ? (
    <span className="inline-flex items-center gap-1 bg-green-50 text-green-600 px-2.5 py-1 rounded-full text-xs font-medium">
      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Active
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 bg-red-50 text-red-500 px-2.5 py-1 rounded-full text-xs font-medium">
      <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> Inactive
    </span>
  )
);

export const ActionButtons = ({ onEdit, onDelete }) => (
  <div className="flex items-center gap-2">
    {onEdit && (
      <button onClick={onEdit} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium px-3">
        ✏️ Edit
      </button>
    )}
    {onDelete && (
      <button onClick={onDelete} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium px-3">
        🗑️ Delete
      </button>
    )}
  </div>
);

export const EmptyState = ({ message = "No data found" }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <p className="text-4xl mb-3">📭</p>
    <p className="text-gray-500 font-medium">{message}</p>
  </div>
);

export const LoadingState = () => (
  <div className="flex flex-col items-center justify-center py-20">
    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
    <p className="text-gray-400 text-sm">Loading...</p>
  </div>
);

export const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, rowsPerPage }) => (
  <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 bg-gray-50">
    <p className="text-sm text-gray-500">
      Showing <span className="font-medium text-gray-700">{Math.min((currentPage - 1) * rowsPerPage + 1, totalItems)}</span> to{" "}
      <span className="font-medium text-gray-700">{Math.min(currentPage * rowsPerPage, totalItems)}</span> of{" "}
      <span className="font-medium text-gray-700">{totalItems}</span>
    </p>
    <div className="flex items-center gap-2">
      <button onClick={() => onPageChange("prev")} disabled={currentPage === 1}
        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">← Prev</button>
      <span className="px-3 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg">{currentPage} / {totalPages}</span>
      <button onClick={() => onPageChange("next")} disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed">Next →</button>
    </div>
  </div>
);
