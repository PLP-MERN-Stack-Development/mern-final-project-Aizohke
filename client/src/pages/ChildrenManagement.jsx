import React, { useState } from "react";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import ChildModal from "../components/ChildModal";

// Children Management
const ChildrenManagement = () => {
  const [children, setChildren] = useState([
    {
      id: 1,
      name: "Amina Mwangi",
      dob: "2022-05-15",
      gender: "Female",
      allergies: "None",
      vaccines: 12,
    },
    {
      id: 2,
      name: "James Otieno",
      dob: "2023-01-20",
      gender: "Male",
      allergies: "Peanuts",
      vaccines: 8,
    },
  ]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Children Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your children's profiles and health records
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
        >
          <Edit size={20} />
          <span>Add Child</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children.map((child) => (
          <div
            key={child.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {child.name[0]}
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">
              {child.name}
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Date of Birth:</span>
                <span className="font-medium text-gray-900">
                  {new Date(child.dob).toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gender:</span>
                <span className="font-medium text-gray-900">
                  {child.gender}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Allergies:</span>
                <span className="font-medium text-gray-900">
                  {child.allergies}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Vaccines:</span>
                <span className="font-medium text-green-600">
                  {child.vaccines} completed
                </span>
              </div>
            </div>

            <button className="w-full mt-6 bg-blue-50 text-blue-600 py-3 rounded-lg hover:bg-blue-100 transition-colors font-medium flex items-center justify-center space-x-2">
              <Eye size={18} />
              <span>View Records</span>
            </button>
          </div>
        ))}
      </div>

      {showModal && <ChildModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ChildrenManagement;
