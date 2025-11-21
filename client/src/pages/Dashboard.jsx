import React from "react";
import {
  Users,
  CheckCircle,
  Calendar,
  Activity,
  Bot,
  Plus,
  TrendingUp,
  MapPin,
} from "lucide-react";

// Dashboard Page
const Dashboard = ({ navigate }) => {
  const stats = [
    {
      icon: Users,
      label: "Children",
      value: "2",
      color: "bg-blue-500",
      trend: "+0",
    },
    {
      icon: Calendar,
      label: "Upcoming",
      value: "3",
      color: "bg-orange-500",
      trend: "This month",
    },
    {
      icon: CheckCircle,
      label: "Completed",
      value: "15",
      color: "bg-green-500",
      trend: "+2 this week",
    },
    {
      icon: MapPin,
      label: "Nearby Clinics",
      value: "8",
      color: "bg-purple-500",
      trend: "Within 5km",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's your vaccination overview.
          </p>
        </div>
        <button
          onClick={() => navigate("children")}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Add Child</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {stat.value}
            </p>
            <p className="text-xs text-gray-500 mt-2">{stat.trend}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Upcoming Vaccines
            </h2>
            <button
              onClick={() => navigate("tracker")}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </button>
          </div>
          <div className="space-y-4">
            {[
              {
                child: "Amina Mwangi",
                vaccine: "Polio Booster",
                date: "Feb 15, 2024",
                days: 3,
              },
              {
                child: "James Otieno",
                vaccine: "DPT",
                date: "Feb 20, 2024",
                days: 8,
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200"
              >
                <div>
                  <p className="font-semibold text-gray-900">{item.vaccine}</p>
                  <p className="text-sm text-gray-600">{item.child}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {item.date}
                  </p>
                  <p className="text-xs text-orange-600 font-semibold">
                    {item.days} days left
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {[
              {
                action: "Vaccine recorded",
                detail: "Amina - Measles",
                time: "2h ago",
              },
              {
                action: "Appointment booked",
                detail: "City Hospital",
                time: "1d ago",
              },
              { action: "Child added", detail: "James Otieno", time: "3d ago" },
            ].map((activity, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">{activity.detail}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold mb-2">Need Help?</h3>
            <p className="text-blue-100 mb-4">
              Our AI assistant is available 24/7 to answer your questions
            </p>
            <button
              onClick={() => navigate("ai-assistant")}
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Ask AI Assistant
            </button>
          </div>
          <Bot className="w-24 h-24 opacity-20" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
