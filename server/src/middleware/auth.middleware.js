// server/src/middleware/auth.middleware.js

// --- (Step 1) Import the "translator" ---
import { createRequire } from 'module';

// --- (Step 2) Create a 'require' function ---
const require = createRequire(import.meta.url);

// --- (Step 3) Use 'require' to load the CommonJS package ---
const { ClerkExpressRequireAuth, ClerkExpressWithAuth } = require('@clerk/express');

// --- (Step 4) Now we can export them for the rest of our app ---

// This replaces your old `protect` function
export const requireAuth = ClerkExpressRequireAuth();

// This is for checking auth without blocking
export const withAuth = ClerkExpressWithAuth();

// Optional: Role-based helpers
export const requireAdmin = ClerkExpressRequireAuth({
  role: 'admin'
});

export const requireDoctor = ClerkExpressRequireAuth({
  role: 'doctor'
});
