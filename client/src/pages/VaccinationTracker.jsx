import React, { useState } from "react";
import {
  Clock,
  CheckCircle,
  Calendar,
  Plus,
  Edit,
  AlertCircle,
} from "lucide-react";

// Vaccination Tracker
const VaccinationTracker = () => {
  const [records, setRecords] = useState([
    {
      id: 1,
      child: "Amina Mwangi",
      vaccine: "BCG",
      date: "2023-01-15",
      status: "completed",
    },
    {
      id: 2,
      child: "Amina Mwangi",
      vaccine: "Polio",
      date: "2024-02-15",
      status: "scheduled",
    },
    {
      id: 3,
      child: "James Otieno",
      vaccine: "DPT",
      date: "2023-12-01",
      status: "completed",
    },
  ]);

  const getStatusColor = (status) => {
    return status === "completed"
      ? "bg-green-100 text-green-800 border-green-200"
      : status === "scheduled"
      ? "bg-blue-100 text-blue-800 border-blue-200"
      : "bg-red-100 text-red-800 border-red-200";
  };

  const getStatusIcon = (status) => {
    return status === "completed" ? (
      <CheckCircle className="w-5 h-5" />
    ) : status === "scheduled" ? (
      <Clock className="w-5 h-5" />
    ) : (
      <AlertCircle className="w-5 h-5" />
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Vaccination Tracker
          </h1>
          <p className="text-gray-600 mt-1">
            Track and manage all vaccination records
          </p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center space-x-2">
          <Plus size={20} />
          <span>Record Vaccine</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Records",
            value: "20",
            icon: Calendar,
            color: "text-blue-600",
          },
          {
            label: "Completed",
            value: "15",
            icon: CheckCircle,
            color: "text-green-600",
          },
          {
            label: "Scheduled",
            value: "3",
            icon: Clock,
            color: "text-orange-600",
          },
          {
            label: "Missed",
            value: "2",
            icon: AlertCircle,
            color: "text-red-600",
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Vaccination Records
          </h2>
        </div>
        <div className="divide-y divide-gray-200">
          {records.map((record) => (
            <div
              key={record.id}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div
                    className={`p-2 rounded-lg ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {getStatusIcon(record.status)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {record.vaccine}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {record.child} •{" "}
                      {new Date(record.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                      record.status
                    )}`}
                  >
                    {record.status.charAt(0).toUpperCase() +
                      record.status.slice(1)}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-blue-600">
                    <Edit size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VaccinationTracker;
