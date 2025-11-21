import React from "react";
import Sidebar from "./components/Sidebar";
import PrivateHeader from "./components/PrivateHeader";
import Dashboard from "./pages/Dashboard";
import ChildrenManagement from "./pages/ChildrenManagement";
import VaccinationTracker from "./pages/VaccinationTracker";
import ClinicFinder from "./pages/ClinicFinder";
import Reminders from "./pages/Reminders";
import AIAssistant from "./pages/AIAssistant";
import RealTimeChat from "./pages/RealTimeChat";
import Settings from "./pages/Settings";

// Private App for Authenticated Users
const PrivateApp = ({
  currentPage,
  navigate,
  signOut,
  user,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigate={navigate}
        currentPage={currentPage}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <PrivateHeader
          onMenuClick={() => setSidebarOpen(true)}
          user={user}
          signOut={signOut}
        />

        <main className="flex-1 overflow-auto p-6">
          {currentPage === "dashboard" && <Dashboard navigate={navigate} />}
          {currentPage === "children" && <ChildrenManagement />}
          {currentPage === "tracker" && <VaccinationTracker />}
          {currentPage === "clinics" && <ClinicFinder />}
          {currentPage === "reminders" && <Reminders />}
          {currentPage === "ai-assistant" && <AIAssistant />}
          {currentPage === "chat" && <RealTimeChat />}
          {currentPage === "settings" && <Settings signOut={signOut} />}
        </main>
      </div>
    </div>
  );
};

export default PrivateApp;
