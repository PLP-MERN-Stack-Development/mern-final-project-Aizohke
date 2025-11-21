import React from 'react';
import {
  Shield, MapPin, Users, CheckCircle, Bell, Bot, Sparkles
} from 'lucide-react';
// Import Clerk's button component
import { SignUpButton } from '@clerk/clerk-react';

// No more onRegisterClick prop
const LandingPage = ({ navigate }) => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-20 overflow-hidden">
        {/* ... (Hero content) ... */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <SignUpButton mode="modal">
            <button
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Free
            </button>
          </SignUpButton>
          <button
            onClick={() => navigate('about')}
            className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition-all"
          >
            Learn More
          </button>
        </div>
        {/* ... (rest of hero) ... */}
      </section>

      {/* ... (Stats, Features, etc.) ... */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="container mx-auto px-6 text-center">
          {/* ... (CTA content) ... */}
          <SignUpButton mode="modal">
            <button
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Your Journey Today
            </button>
          </SignUpButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        {/* ... (rest of footer) ... */}
      </footer>
    </div>
  );
};

export default LandingPage;