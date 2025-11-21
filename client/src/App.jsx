import React, { useState, useEffect } from 'react';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import PublicApp from './PublicApp';
import PrivateApp from './PrivateApp';
import api from './api';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  const { user } = useUser();
  // We no longer need the useAuth() hook here

  useEffect(() => {
    const syncUserToBackend = async () => {
      if (user) {
        try {
          // We just make the call. The interceptor in api.js
          // will automatically attach the token.
          await api.post('/auth/sync', {
            clerkId: user.id,
            email: user.primaryEmailAddress.emailAddress,
            firstName: user.firstName,
            lastName: user.lastName,
            photoUrl: user.imageUrl
          });
          
          console.log('User synced to our local DB');
          setCurrentPage('dashboard');

        } catch (err) {
          console.error('Failed to sync user:', err);
        }
      } else {
        setCurrentPage('landing');
      }
    };
    
    syncUserToBackend();
  }, [user]); // This effect runs every time the Clerk user changes

  const navigate = (page) => {
    setCurrentPage(page);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SignedOut>
        <PublicApp currentPage={currentPage} navigate={navigate} />
      </SignedOut>
      <SignedIn>
        <PrivateApp
          currentPage={currentPage}
          navigate={navigate}
          user={user} 
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </SignedIn>
    </div>
  );
}

export default App;