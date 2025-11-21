import React from "react";
import {
  Shield,
  MapPin,
  Users,
  Syringe,
  Calendar,
  Activity,
  Bell,
  MessageSquare,
  Bot,
  Settings,
  X,
} from "lucide-react";

// Sidebar
const Sidebar = ({ isOpen, onClose, navigate, currentPage }) => {
  const navItems = [
    { id: "dashboard", icon: Activity, label: "Dashboard" },
    { id: "children", icon: Users, label: "Children" },
    { id: "tracker", icon: Syringe, label: "Vaccination Tracker" },
    { id: "clinics", icon: MapPin, label: "Clinic Finder" },
    { id: "reminders", icon: Bell, label: "Reminders" },
    { id: "ai-assistant", icon: Bot, label: "AI Assistant" },
    { id: "chat", icon: MessageSquare, label: "Live Chat" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-blue-700">
            <h2 className="text-xl font-bold">VaxTrack</h2>
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded hover:bg-blue-800"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    currentPage === item.id
                      ? "bg-blue-700 shadow-lg transform scale-105"
                      : "hover:bg-blue-800"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-blue-700">
            <div className="flex items-center space-x-3 p-3 bg-blue-800 rounded-lg">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <Users size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">Parent Account</p>
                <p className="text-xs text-blue-200 truncate">
                  Healthcare Plan
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
