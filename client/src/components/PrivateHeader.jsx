import React, { useState } from 'react';
import { Shield, Bell, Menu } from 'lucide-react';
// Import Clerk's user button
import { UserButton } from '@clerk/clerk-react';

// No more 'user' or 'signOut' props needed!
const PrivateHeader = ({ onMenuClick }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">VaxTrack & Prevent</h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <Bell size={22} className="text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* This one component replaces your avatar, name, and sign-out menu */}
          <div className="ml-4">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>

      {showNotifications && (
        <div className="absolute right-6 top-16 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          {/* ... (your notification UI is fine) ... */}
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {[
              { id: 1, text: 'Polio booster due in 3 days for Amina', time: '2h ago', unread: true },
              { id: 2, text: 'Appointment confirmed at City Hospital', time: '1d ago', unread: false },
              { id: 3, text: 'New message from Dr. Sarah', time: '2d ago', unread: false }
            ].map(notif => (
              <div key={notif.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${notif.unread ? 'bg-blue-50' : ''}`}>
                <p className="text-sm text-gray-900">{notif.text}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default PrivateHeader;