import React from 'react';
import { Shield } from 'lucide-react';
// Import Clerk's button components
import { SignInButton, SignUpButton } from '@clerk/clerk-react';

// No more onLoginClick or onRegisterClick props
const PublicHeader = ({ navigate }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => navigate('landing')} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">VaxTrack</span>
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigate('landing')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Home
            </button>
            <button onClick={() => navigate('about')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              About
            </button>
            <button onClick={() => navigate('info')} className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Vaccine Info
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            {/* This wraps our button. Clerk handles the modal. */}
            <SignInButton mode="modal">
              <button className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
                Sign In
              </button>
            </SignInButton>
            {/* This wraps our button. Clerk handles the modal. */}
            <SignUpButton mode="modal">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg">
                Get Started
              </button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </header>
  );
};

export default PublicHeader;