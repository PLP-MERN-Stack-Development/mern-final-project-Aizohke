import React, { useState } from "react";
import {
  Clock,
  Calendar,
  Bell,
  MessageSquare,
  Mail,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

// Reminders
const Reminders = () => {
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    push: true,
    days: 3,
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Reminders & Notifications
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your notification preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Notification Settings
          </h2>

          <div className="space-y-4">
            {[
              {
                key: "email",
                icon: Mail,
                label: "Email Notifications",
                desc: "Receive reminders via email",
              },
              {
                key: "sms",
                icon: MessageSquare,
                label: "SMS Notifications",
                desc: "Receive reminders via SMS",
              },
              {
                key: "push",
                icon: Bell,
                label: "Push Notifications",
                desc: "Receive app notifications",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="font-medium text-gray-900">{item.label}</p>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key],
                    }))
                  }
                  className="relative"
                >
                  {settings[item.key] ? (
                    <ToggleRight className="w-12 h-6 text-blue-600" />
                  ) : (
                    <ToggleLeft className="w-12 h-6 text-gray-400" />
                  )}
                </button>
              </div>
            ))}

            <div className="p-4 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Remind me (days before)
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="range"
                  min="1"
                  max="7"
                  value={settings.days}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      days: parseInt(e.target.value),
                    }))
                  }
                  className="flex-1"
                />
                <span className="text-lg font-bold text-gray-900 w-8">
                  {settings.days}
                </span>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
              Save Settings
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Upcoming Reminders
            </h2>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>

          <div className="space-y-4">
            {[
              {
                id: 1,
                child: "Amina Mwangi",
                vaccine: "Polio Booster",
                date: "2024-02-15",
                priority: "high",
              },
              {
                id: 2,
                child: "James Otieno",
                vaccine: "Measles",
                date: "2024-02-20",
                priority: "medium",
              },
            ].map((reminder) => (
              <div
                key={reminder.id}
                className={`p-4 rounded-lg border-2 ${
                  reminder.priority === "high"
                    ? "bg-red-50 border-red-200"
                    : "bg-yellow-50 border-yellow-200"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900">
                    {reminder.vaccine}
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-white">
                    {reminder.priority}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{reminder.child}</span>
                  <div className="flex items-center space-x-1">
                    <Clock size={14} />
                    <span>{new Date(reminder.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
