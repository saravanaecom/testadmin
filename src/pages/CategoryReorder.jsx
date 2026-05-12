import React, { useState, useEffect } from "react";
import { fetchSelectCategory, UpdateReorder } from "../services/Category";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PageLayout } from "../components/PageLayout";

const CategoryReorder = () => {
  const [categories, setCategories] = useState([]);
  const [adminId, setAdminId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const adminUserId = JSON.parse(localStorage.getItem("adminuserid"));
    if (!adminUserId) { alert("Session Closed."); navigate("/"); }
    else setAdminId(Number(adminUserId));
  }, [navigate]);

  useEffect(() => {
    if (adminId) {
      fetchSelectCategory(adminId).then((data) => { if (data) setCategories(data); }).catch(console.error);
    }
  }, [adminId]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updated = Array.from(categories);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    setCategories(updated);
  };

  const handleReorderSubmit = async () => {
    const reorderedData = categories.map((item, index) => ({ Id: item.Id, Comid: adminId, Category: item.Category, Order: index + 1, Active: 1 }));
    try {
      const success = await UpdateReorder(reorderedData);
      if (success) { alert("Reorder saved!"); navigate("/CategoryReorder"); }
      else alert("Failed to save reorder.");
    } catch (error) { alert("Error: " + error.message); }
  };

  return (
    <PageLayout title="Category Reorder" subtitle="Drag and drop to reorder categories">
      <div className="max-w-lg">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
          <p className="text-sm text-gray-500 mb-4">Drag items to change their display order</p>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="categories">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                  {categories.map((category, index) => (
                    <Draggable key={category.Id} draggableId={String(category.Id)} index={index}>
                      {(provided, snapshot) => (
                        <li {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}
                          className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${snapshot.isDragging ? 'bg-blue-50 border-blue-200 shadow-lg' : 'bg-gray-50 border-gray-100 hover:bg-blue-50 hover:border-blue-100'}`}>
                          <span className="text-gray-300 text-lg">⠿</span>
                          <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-xs font-bold flex items-center justify-center">{index + 1}</span>
                          <span className="text-sm font-medium text-gray-700">{category.Category}</span>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className="flex gap-3">
          <button onClick={handleReorderSubmit} className="px-6 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors shadow-md">
            💾 Save Reorder
          </button>
          <button onClick={() => navigate("/category")} className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </PageLayout>
  );
};

export default CategoryReorder;
