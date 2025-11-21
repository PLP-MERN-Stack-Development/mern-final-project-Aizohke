import React from 'react';
import PublicHeader from './components/PublicHeader';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import VaccineInfoPage from './pages/VaccineInfoPage';
// NO MORE modal or useAuth imports!

// Public App for Non-Authenticated Users
// Look how simple it is now!
// It doesn't need to manage state. It just shows the right page.
const PublicApp = ({ currentPage, navigate }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100">
      {/* This PublicHeader component was also modified in our last step
        to use Clerk's <SignInButton> and <SignUpButton>.
      */}
      <PublicHeader navigate={navigate} />

      {currentPage === 'landing' && <LandingPage navigate={navigate} />}
      {currentPage === 'about' && <AboutPage navigate={navigate} />}
      {currentPage === 'info' && <VaccineInfoPage navigate={navigate} />}
      
      {/* All the modal logic is GONE.
        Clerk's <SignInButton> and <SignUpButton> (which are
        in PublicHeader and LandingPage) handle all of it.
      */}
    </div>
  );
};

export default PublicApp;