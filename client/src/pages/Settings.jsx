import React, { useState } from 'react';
import {
  Shield,
  Bell,
  LogOut,
  Save,
  HelpCircle,
  User,
} from 'lucide-react';

// Settings
const Settings = ({ signOut }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield },
    { id: 'help', label: 'Help & Support', icon: HelpCircle }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-64 border-b md:border-b-0 md:border-r border-gray-200">
            <nav className="p-4 space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}

              <button
                onClick={signOut}
                className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors mt-4"
              >
                <LogOut size={20} />
                <span className="font-medium">Sign Out</span>
              </button>
            </nav>
          </div>

          <div className="flex-1 p-8">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                <form className="space-y-6 max-w-md">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        defaultValue="Jane"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        defaultValue="Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue="jane.doe@example.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+254 712 345 678"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Save size={20} />
                    <span>Save Changes</span>
                  </button>
                </form>
              </div>
            )}

            {activeTab === 'privacy' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy & Security</h2>
                <div className="space-y-6 max-w-md">
                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-2">Data Privacy</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Your health data is encrypted and stored securely. We comply with all healthcare data protection regulations.
                    </p>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      View Privacy Policy →
                    </button>
                  </div>

                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-2">Two-Factor Authentication</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Add an extra layer of security to your account.
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Enable 2FA
                    </button>
                  </div>

                  <div className="p-6 border-2 border-red-200 rounded-lg bg-red-50">
                    <h3 className="font-bold text-red-900 mb-2">Danger Zone</h3>
                    <p className="text-sm text-red-700 mb-4">
                      Permanently delete your account and all associated data.
                    </p>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'help' && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Help & Support</h2>
                <div className="space-y-6 max-w-md">
                  <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-2">FAQs</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Find answers to commonly asked questions about using VaxTrack.
                    </p>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                      Browse FAQs →
                    </button>
                  </div>

                  <div className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-gray-900 mb-2">Contact Support</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Get help from our support team for any issues or questions.
                    </p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      Contact Us
                    </button>
                  </div>

                  <div className="p-6 border border-gray-200 rounded-lg">
                    <h3 className="font-bold text-gray-900 mb-3">App Information</h3>
                    <div className="text-sm text-gray-600 space-y-2">
                      <div className="flex justify-between">
                        <span>Version:</span>
                        <span className="font-medium">1.0.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Updated:</span>
                        <span className="font-medium">November2025</span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <button className="text-blue-600 hover:text-blue-700">Terms of Service</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
