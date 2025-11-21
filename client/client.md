https://docs.google.com/document/d/1xmeVRDp-Jv6I1bmTXwz5lAZu4ZKxBfi_XXL5qPehFpQ/edit?usp=sharing

Here is the code split into a logical, multi-file structure. This new structure uses `import` and `export` statements to connect the files, but the code logic itself remains identical.

A good way to organize this in VS Code is to create folders like `components/`, `hooks/`, and `pages/` inside your `src/` directory.

### File Structure Overview

```
src/
├── components/
│   ├── ChildModal.jsx
│   ├── LoginModal.jsx
│   ├── PrivateHeader.jsx
│   ├── PublicHeader.jsx
│   └── Sidebar.jsx
├── hooks/
│   └── useAuth.js
├── pages/
│   ├── AIAssistant.jsx
│   ├── AboutPage.jsx
│   ├── ChildrenManagement.jsx
│   ├── ClinicFinder.jsx
│   ├── Dashboard.jsx
│   ├── LandingPage.jsx
│   ├── RealTimeChat.jsx
│   ├── Reminders.jsx
│   ├── Settings.jsx
│   ├── VaccineInfoPage.jsx
│   └── VaccinationTracker.jsx
├── App.jsx
├── PrivateApp.jsx
└── PublicApp.jsx
```

---

### `src/hooks/useAuth.js`

This file holds your custom authentication hook.

```jsx
import { useState, useEffect } from "react";

// Mock Authentication Hook
const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate auth check
    setTimeout(() => {
      const storedUser = localStorage.getItem("vaxtrack_user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    }, 500);
  }, []);

  const signIn = (email, password) => {
    const mockUser = {
      id: "1",
      email,
      firstName: "Jane",
      lastName: "Doe",
      role: "parent",
    };
    localStorage.setItem("vaxtrack_user", JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const signOut = () => {
    localStorage.removeItem("vaxtrack_user");
    setUser(null);
  };

  return { user, isLoading, signIn, signOut };
};

export default useAuth;
```

---

### `src/App.jsx`

This is your main app component, which acts as the entry point and router.

```jsx
import React, { useState } from "react";
import useAuth from "./hooks/useAuth";
import PublicApp from "./PublicApp";
import PrivateApp from "./PrivateApp";

// Main App Component
function App() {
  const { user, isLoading, signIn, signOut } = useAuth();
  const [currentPage, setCurrentPage] = useState("landing");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const navigate = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!user ? (
        <PublicApp
          currentPage={currentPage}
          navigate={navigate}
          signIn={signIn}
        />
      ) : (
        <PrivateApp
          currentPage={currentPage}
          navigate={navigate}
          signOut={signOut}
          user={user}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      )}
    </div>
  );
}

export default App;
```

---

### `src/PublicApp.jsx`

This component renders all public-facing pages for logged-out users.

```jsx
import React from "react";
import PublicHeader from "./components/PublicHeader";
import LandingPage from "./pages/LandingPage";
import AboutPage from "./pages/AboutPage";
import VaccineInfoPage from "./pages/VaccineInfoPage";

// Public App for Non-Authenticated Users
const PublicApp = ({ currentPage, navigate, signIn }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      <PublicHeader navigate={navigate} signIn={signIn} />
      {currentPage === "landing" && (
        <LandingPage navigate={navigate} signIn={signIn} />
      )}
      {currentPage === "about" && <AboutPage navigate={navigate} />}
      {currentPage === "info" && <VaccineInfoPage navigate={navigate} />}
    </div>
  );
};

export default PublicApp;
```

---

### `src/PrivateApp.jsx`

This component renders the main application layout for logged-in users.

```jsx
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
```

---

### `src/components/PublicHeader.jsx`

```jsx
import React, { useState } from "react";
import { Shield, X } from "lucide-react";
import LoginModal from "./LoginModal";

// Public Header
const PublicHeader = ({ navigate, signIn }) => {
  const [showLoginModal, setShowLoginModal] = useState(false);

  return (
    <>
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("landing")}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">VaxTrack</span>
            </button>

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => navigate("landing")}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Home
              </button>
              <button
                onClick={() => navigate("about")}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                About
              </button>
              <button
                onClick={() => navigate("info")}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Vaccine Info
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} signIn={signIn} />
      )}
    </>
  );
};

export default PublicHeader;
```

---

### `src/components/LoginModal.jsx`

```jsx
import React, { useState } from "react";
import { X } from "lucide-react";

// Login Modal
const LoginModal = ({ onClose, signIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn(email, password);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-8 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Demo: Use any email/password to login
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
```

---

### `src/components/PrivateHeader.jsx`

```jsx
import React, { useState } from "react";
import { Shield, Bell, Menu } from "lucide-react";

// Private Header
const PrivateHeader = ({ onMenuClick, user, signOut }) => {
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
            <h1 className="text-xl font-bold text-gray-900">
              VaxTrack & Prevent
            </h1>
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

          <div className="flex items-center space-x-3 border-l pl-4">
            <div className="text-right hidden md:block">
              <p className="text-sm font-medium text-gray-900">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
              {user.firstName[0]}
              {user.lastName[0]}
            </div>
          </div>
        </div>
      </div>

      {showNotifications && (
        <div className="absolute right-6 top-16 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="max-h-96 overflow-y-auto">
            {[
              {
                id: 1,
                text: "Polio booster due in 3 days for Amina",
                time: "2h ago",
                unread: true,
              },
              {
                id: 2,
                text: "Appointment confirmed at City Hospital",
                time: "1d ago",
                unread: false,
              },
              {
                id: 3,
                text: "New message from Dr. Sarah",
                time: "2d ago",
                unread: false,
              },
            ].map((notif) => (
              <div
                key={notif.id}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 ${
                  notif.unread ? "bg-blue-50" : ""
                }`}
              >
                <p className="text-sm text-gray-900">{notif.text}</p>
                <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
              </div>
            ))}
          </div>
          <div className="p-3 text-center border-t border-gray-200">
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All Notifications
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default PrivateHeader;
```

---

### `src/components/Sidebar.jsx`

```jsx
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
```

---

### `src/components/ChildModal.jsx`

```jsx
import React from "react";

// Child Modal Component
const ChildModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-6">Add New Child</h2>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter child's name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergies
            </label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="List any allergies"
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Add Child
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChildModal;
```

---

### `src/pages/LandingPage.jsx`

```jsx
import React from "react";
import {
  Shield,
  MapPin,
  Users,
  CheckCircle,
  Calendar,
  Activity,
  Bell,
  Bot,
  Sparkles,
} from "lucide-react";

// Landing Page
const LandingPage = ({ navigate, signIn }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute transform rotate-45 -left-20 -top-20 w-96 h-96 bg-white rounded-full"></div>
          <div className="absolute transform -rotate-45 right-0 bottom-0 w-96 h-96 bg-white rounded-full"></div>
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center space-x-2 bg-white bg-opacity-20 rounded-full px-4 py-2 mb-6 backdrop-blur-sm">
            <Sparkles size={16} />
            <span className="text-sm font-medium">
              AI-Powered Vaccination Tracking
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            VaxTrack & Prevent
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-95">
            Your trusted companion for managing your children's vaccination
            schedules. Never miss a vaccine again with our intelligent tracking
            system.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => signIn("demo@example.com", "password")}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("about")}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all"
            >
              Learn More
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle size={20} />
              <span>Free Forever</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={20} />
              <span>AI Assistant</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle size={20} />
              <span>Real-time Chat</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Parents" },
              { number: "150K+", label: "Children Tracked" },
              { number: "1M+", label: "Vaccines Recorded" },
              { number: "500+", label: "Partner Clinics" },
            ].map((stat, idx) => (
              <div key={idx}>
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need in One Place
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools to manage your child's health journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: "Smart Tracking",
                description:
                  "AI-powered vaccination schedules tailored to your child",
                color: "bg-blue-100 text-blue-600",
              },
              {
                icon: Bell,
                title: "Smart Reminders",
                description:
                  "Never miss important vaccination dates with timely alerts",
                color: "bg-green-100 text-green-600",
              },
              {
                icon: MapPin,
                title: "Clinic Finder",
                description:
                  "Find and book appointments at nearby clinics instantly",
                color: "bg-purple-100 text-purple-600",
              },
              {
                icon: Bot,
                title: "AI Assistant",
                description:
                  "24/7 expert guidance for all your vaccine questions",
                color: "bg-orange-100 text-orange-600",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-xl transition-all transform hover:-translate-y-2 cursor-pointer"
              >
                <div
                  className={`w-14 h-14 ${feature.color} rounded-lg flex items-center justify-center mb-4`}
                >
                  <feature.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Get started in 3 simple steps
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Create Account",
                  desc: "Sign up for free in under 30 seconds",
                },
                {
                  step: "2",
                  title: "Add Children",
                  desc: "Enter your children's information and vaccination history",
                },
                {
                  step: "3",
                  title: "Stay Protected",
                  desc: "Get reminders and track progress automatically",
                },
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Protect Your Child's Health?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Join thousands of parents who trust VaxTrack for their children's
            vaccination needs.
          </p>
          <button
            onClick={() => signIn("demo@example.com", "password")}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Your Journey Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Shield className="w-8 h-8" />
                <span className="text-xl font-bold">VaxTrack</span>
              </div>
              <p className="text-gray-400">
                Protecting children's health through smart vaccination
                management.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => navigate("landing")}
                    className="hover:text-white"
                  >
                    Features
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("about")}
                    className="hover:text-white"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate("info")}
                    className="hover:text-white"
                  >
                    Vaccine Info
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button className="hover:text-white">Help Center</button>
                </li>
                <li>
                  <button className="hover:text-white">Privacy Policy</button>
                </li>
                <li>
                  <button className="hover:text-white">Terms of Service</button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li>support@vaxtrack.com</li>
                <li>+254 700 000 000</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VaxTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
```

---

### `src/pages/AboutPage.jsx`

```jsx
import React from "react";
import { Shield, Heart, Users, Target } from "lucide-react";

// About Page
const AboutPage = ({ navigate }) => {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">About VaxTrack & Prevent</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-95">
            Revolutionizing child healthcare through intelligent vaccination
            tracking and parental support.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Our Mission
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              To ensure no child misses critical vaccinations by empowering
              parents with technology, education, and access to healthcare
              resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="bg-blue-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                What We Do
              </h3>
              <p className="text-gray-600 mb-4">
                VaxTrack & Prevent is a comprehensive platform that helps
                parents manage their children's vaccination schedules, track
                progress, and connect with healthcare providers seamlessly.
              </p>
              <p className="text-gray-600">
                Our AI-powered assistant provides reliable information, while
                our real-time communication tools bridge the gap between parents
                and medical professionals.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                Why It Matters
              </h3>
              <p className="text-gray-600 mb-4">
                Every year, millions of children miss essential vaccinations due
                to forgotten schedules, lack of access to information, or
                logistical challenges.
              </p>
              <p className="text-gray-600">
                We're changing that by making vaccination management simple,
                accessible, and reliable for families everywhere.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: "Safety First",
                desc: "Child health and data security prioritized",
              },
              {
                icon: Heart,
                title: "Compassionate",
                desc: "Understanding modern parent needs",
              },
              {
                icon: Users,
                title: "Community",
                desc: "Supportive networks for caregivers",
              },
              {
                icon: Target,
                title: "Impact Driven",
                desc: "Improving vaccination rates",
              },
            ].map((value, idx) => (
              <div
                key={idx}
                className="text-center p-6 bg-white rounded-xl shadow-sm"
              >
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h4 className="font-bold mb-2 text-gray-900">{value.title}</h4>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
```

---

### `src/pages/VaccineInfoPage.jsx`

```jsx
import React, { useState } from "react";
import {
  CheckCircle,
  Calendar,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Book,
} from "lucide-react";

// Vaccine Info Page
const VaccineInfoPage = ({ navigate }) => {
  const [openAccordion, setOpenAccordion] = useState(null);

  const schedules = [
    { age: "Birth", vaccines: ["BCG", "Hepatitis B", "OPV 0"] },
    {
      age: "6 Weeks",
      vaccines: ["DTaP 1", "IPV 1", "Hib 1", "PCV 1", "Rota 1"],
    },
    {
      age: "10 Weeks",
      vaccines: ["DTaP 2", "IPV 2", "Hib 2", "PCV 2", "Rota 2"],
    },
    {
      age: "14 Weeks",
      vaccines: ["DTaP 3", "IPV 3", "Hib 3", "PCV 3", "Rota 3"],
    },
    { age: "9 Months", vaccines: ["Measles 1", "Yellow Fever"] },
    {
      age: "18 Months",
      vaccines: ["DTaP Booster", "Measles 2", "IPV Booster"],
    },
  ];

  const myths = [
    {
      question: "Vaccines cause autism",
      answer:
        "FALSE. Multiple large-scale studies have thoroughly debunked this myth. There is no link between vaccines and autism. The original fraudulent study was retracted and the author lost his medical license.",
    },
    {
      question: "Natural immunity is better than vaccines",
      answer:
        "FALSE. While natural infection may provide immunity, it comes with serious risks including complications, permanent disability, or death. Vaccines provide immunity safely without these dangers.",
    },
    {
      question: "Too many vaccines overload the immune system",
      answer:
        "FALSE. Children's immune systems handle thousands of antigens daily. Modern vaccines contain far fewer antigens than older versions, and the immune system can easily handle them.",
    },
    {
      question: "Vaccines contain dangerous ingredients",
      answer:
        "FALSE. Vaccine ingredients are rigorously tested and used in tiny, safe amounts. For example, formaldehyde (used to inactivate viruses) is produced naturally in larger amounts by your own body.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <Book className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vaccine Information Center
          </h1>
          <p className="text-xl max-w-3xl mx-auto opacity-95">
            Evidence-based resources, myth-busting, and comprehensive
            information about childhood vaccinations
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-5xl">
        {/* Vaccine Schedule */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Standard Vaccination Schedule
            </h2>
          </div>

          <div className="space-y-3">
            {schedules.map((schedule, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
              >
                <div className="font-bold text-blue-600 w-32 text-lg">
                  {schedule.age}
                </div>
                <div className="flex flex-wrap gap-2">
                  {schedule.vaccines.map((vaccine, vIdx) => (
                    <span
                      key={vIdx}
                      className="px-4 py-1.5 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                    >
                      {vaccine}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
            <p className="text-blue-900">
              <strong>Important:</strong> This is a general schedule based on
              WHO and CDC guidelines. Your healthcare provider may recommend
              variations based on your child's health and local requirements.
            </p>
          </div>
        </section>

        {/* Myths & Facts */}
        <section className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <AlertCircle className="w-8 h-8 text-orange-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Common Vaccine Myths Debunked
            </h2>
          </div>

          <div className="space-y-4">
            {myths.map((myth, idx) => (
              <div
                key={idx}
                className="border-2 border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpenAccordion(openAccordion === idx ? null : idx)
                  }
                  className="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-bold text-gray-900 text-lg">
                    MYTH: {myth.question}
                  </span>
                  {openAccordion === idx ? (
                    <ChevronUp className="w-6 h-6" />
                  ) : (
                    <ChevronDown className="w-6 h-6" />
                  )}
                </button>

                {openAccordion === idx && (
                  <div className="p-5 bg-white border-t-2 border-gray-200">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700 text-lg leading-relaxed">
                          {myth.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Side Effects */}
        <section className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Understanding Side Effects
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border-2 border-green-200 bg-green-50">
              <h3 className="text-xl font-bold mb-4 text-green-900">
                Common (Normal Reactions)
              </h3>
              <ul className="space-y-2 text-green-800">
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Low-grade fever (37.5-38°C)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Soreness or redness at injection site</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Mild fussiness or fatigue</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Temporary loss of appetite</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t-2 border-green-200">
                <p className="font-semibold text-green-900">
                  Duration: 24-48 hours
                </p>
                <p className="text-sm text-green-800 mt-1">
                  Action: Rest, fluids, cool compress
                </p>
              </div>
            </div>

            <div className="p-6 rounded-lg border-2 border-red-200 bg-red-50">
              <h3 className="text-xl font-bold mb-4 text-red-900">
                Rare (Contact Doctor)
              </h3>
              <ul className="space-y-2 text-red-800">
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>High fever (over 39°C)</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Severe allergic reaction</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Seizures or convulsions</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Unusual crying (3+ hours)</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t-2 border-red-200">
                <p className="font-semibold text-red-900">
                  Action: Immediate medical attention
                </p>
                <p className="text-sm text-red-800 mt-1">
                  Call your doctor or go to emergency room
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VaccineInfoPage;
```

---

### `src/pages/Dashboard.jsx`

```jsx
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
```

---

### `src/pages/ChildrenManagement.jsx`

```jsx
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
          <Plus size={20} />
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
```

---

### `src/pages/VaccinationTracker.jsx`

```jsx
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
```

---

### `src/pages/ClinicFinder.jsx`

```jsx
import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  Search,
  Phone,
  Navigation,
  Star,
} from "lucide-react";

// Clinic Finder
const ClinicFinder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const clinics = [
    {
      id: 1,
      name: "Nairobi County Hospital",
      address: "Kapenguria Rd",
      phone: "+254 20 272 6300",
      distance: "2.3 km",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Mji wa Huruma Clinic",
      address: "Huruma Estate",
      phone: "+254 723 456 789",
      distance: "3.1 km",
      rating: 4.2,
    },
    {
      id: 3,
      name: "Westside Medical Centre",
      address: "Westlands",
      phone: "+254 20 445 6789",
      distance: "5.2 km",
      rating: 4.7,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clinic Finder</h1>
          <p className="text-gray-600 mt-1">
            Find nearby clinics and book appointments
          </p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md flex items-center space-x-2">
          <Navigation size={20} />
          <span>Use My Location</span>
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search clinics by name or location..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clinics.map((clinic) => (
          <div
            key={clinic.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">
                  {clinic.name}
                </h3>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(clinic.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">
                    ({clinic.rating})
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin size={16} className="mr-2 flex-shrink-0" />
                  <span>{clinic.address}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone size={16} className="mr-2 flex-shrink-0" />
                  <span>{clinic.phone}</span>
                </div>
                <div className="flex items-center text-sm text-blue-600 font-medium">
                  <Navigation size={16} className="mr-2 flex-shrink-0" />
                  <span>{clinic.distance} away</span>
                </div>
              </div>

              <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center space-x-2">
                <Calendar size={18} />
                <span>Book Appointment</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicFinder;
```

---

### `src/pages/Reminders.jsx`

```jsx
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
```

---

### `src/pages/AIAssistant.jsx`

```jsx
import React, { useState, useEffect, useRef } from "react";
import { Bot, Send, Sparkles, User } from "lucide-react";

// AI Assistant
const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your VaxTrack AI assistant. I can help answer questions about vaccines, schedules, side effects, and general child healthcare. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "What vaccines are due for a 6-month-old?",
    "Common side effects of vaccines?",
    "How to prepare my child?",
    "What if we miss a dose?",
  ];

  const handleSend = (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: "For a 6-month-old baby, the typical vaccines include DTaP, Hib, IPV, PCV13, Rotavirus, and Hepatitis B (3rd dose). These protect against serious diseases. Always consult your pediatrician for the exact schedule tailored to your child.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center space-x-3 p-6 border-b border-gray-200">
        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
          <Bot className="w-7 h-7 text-white" />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold text-gray-900">
            AI Health Assistant
          </h1>
          <p className="text-sm text-gray-600">
            Ask me anything about vaccines
          </p>
        </div>
        <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
          <Sparkles size={16} />
          <span>AI Powered</span>
        </div>
      </div>

      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <p className="text-sm text-gray-600 mb-3 font-medium">
          Quick questions:
        </p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(question)}
              className="bg-white border border-gray-300 text-sm text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`flex max-w-[80%] ${
                message.sender === "user" ? "flex-row-reverse" : "flex-row"
              }`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "user"
                    ? "bg-blue-600 ml-3"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 mr-3"
                }`}
              >
                {message.sender === "user" ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>

              <div
                className={`px-4 py-3 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-white text-gray-900 rounded-bl-none shadow-sm"
                }`}
              >
                <div className="whitespace-pre-wrap">{message.text}</div>
                <div
                  className={`text-xs mt-2 ${
                    message.sender === "user"
                      ? "text-blue-200"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="flex max-w-[80%]">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="p-6 border-t border-gray-200 bg-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="flex space-x-4"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about vaccines, schedules, side effects..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            <Send size={20} />
            <span>Send</span>
          </button>
        </form>

        <p className="mt-3 text-xs text-gray-500 text-center">
          AI responses are for informational purposes only. Always consult
          healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;
```

---

### `src/pages/RealTimeChat.jsx`

```jsx
import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Search,
  Send,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
} from "lucide-react";

// Real-Time Chat
const RealTimeChat = () => {
  const [conversations] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Pediatrician",
      avatar: "SJ",
      lastMessage: "The test results look good...",
      time: "2h ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      role: "Vaccination Specialist",
      avatar: "MC",
      lastMessage: "Remember the polio booster...",
      time: "1d ago",
      unread: 0,
      online: false,
    },
  ]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    if (activeChat) {
      setMessages([
        {
          id: 1,
          text: "Hello! How can I help you today?",
          sender: "doctor",
          time: new Date(Date.now() - 3600000),
        },
        {
          id: 2,
          text: "Hi Dr. Sarah, I'm concerned about Amina's reaction to her last vaccine.",
          sender: "user",
          time: new Date(Date.now() - 3500000),
        },
        {
          id: 3,
          text: "Can you describe what symptoms you're noticing?",
          sender: "doctor",
          time: new Date(Date.now() - 3400000),
        },
      ]);
    }
  }, [activeChat]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input,
      sender: "user",
      time: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="flex h-[calc(100vh-12rem)] bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Messages</h2>
        </div>

        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveChat(conv)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                activeChat?.id === conv.id ? "bg-blue-50 border-blue-200" : ""
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {conv.avatar}
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 truncate">
                      {conv.name}
                    </h3>
                    <span className="text-xs text-gray-500">{conv.time}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conv.role}</p>
                  <p className="text-sm text-gray-500 truncate mt-1">
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unread > 0 && (
                  <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
                    {conv.unread}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        {activeChat ? (
          <>
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {activeChat.avatar}
                  </div>
                  {activeChat.online && (
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{activeChat.name}</h3>
                  <p className="text-sm text-gray-600">
                    {activeChat.role} •{" "}
                    {activeChat.online ? "Online" : "Offline"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Phone size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Video size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-white text-gray-900 rounded-bl-none shadow-sm"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-blue-200"
                          : "text-gray-500"
                      }`}
                    >
                      {message.time.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-200">
              <form onSubmit={handleSend} className="flex space-x-4">
                <button
                  type="button"
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <Paperclip size={20} />
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 flex items-center space-x-2"
                >
                  <Send size={20} />
                  <span>Send</span>
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <MessageSquare className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Start a Conversation
            </h3>
            <p className="text-gray-600 max-w-md">
              Select a conversation from the sidebar to start chatting with
              healthcare providers
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RealTimeChat;
```

---

### `src/pages/Settings.jsx`

```jsx
import React, { useState } from 'react';
import {
  Shield,
  Bell,
  LogOut,
  Save, HelpCircle,
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
                    </Type>
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
                        <span className="font-medium">January 2024</span>
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
```
