'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, UserProfile } from '@/types';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut as fbSignOut } from 'firebase/auth';

export const DEMO_USERS: Record<UserRole, UserProfile> = {
  SUPER_ADMIN: {
    uid: 'usr-admin-1',
    email: 'admin@kaluliniboys.ac.ke',
    displayName: 'Dr. Josephat Ndambuki',
    role: 'SUPER_ADMIN',
    photoURL: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    phoneNumber: '+254 722 000 111',
    createdAt: '2023-01-01',
    updatedAt: '2026-01-01',
    status: 'active'
  },
  ADMIN: {
    uid: 'usr-admin-2',
    email: 'deputy@kaluliniboys.ac.ke',
    displayName: 'Mr. Peter Mumo',
    role: 'ADMIN',
    photoURL: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    phoneNumber: '+254 722 000 222',
    createdAt: '2023-01-01',
    updatedAt: '2026-01-01',
    status: 'active'
  },
  TEACHER: {
    uid: 'usr-teacher-1',
    email: 'g.musyoka@kaluliniboys.ac.ke',
    displayName: 'Mr. Geoffrey Musyoka',
    role: 'TEACHER',
    teacherId: 'tch-101',
    photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    phoneNumber: '+254 722 100 200',
    createdAt: '2023-05-10',
    updatedAt: '2026-01-01',
    status: 'active'
  },
  STUDENT: {
    uid: 'usr-student-1',
    email: 'brian.mutua@student.kaluliniboys.ac.ke',
    displayName: 'Brian Mutua Kyalo',
    role: 'STUDENT',
    studentId: 'std-1001',
    photoURL: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
    phoneNumber: '+254 712 345 678',
    createdAt: '2023-01-15',
    updatedAt: '2026-01-01',
    status: 'active'
  },
  PARENT: {
    uid: 'usr-parent-1',
    email: 'j.kyalo@example.com',
    displayName: 'Mr. Joseph Kyalo',
    role: 'PARENT',
    studentId: 'std-1001',
    photoURL: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
    phoneNumber: '+254 712 345 678',
    createdAt: '2023-01-15',
    updatedAt: '2026-01-01',
    status: 'active'
  },
  STAFF: {
    uid: 'usr-staff-1',
    email: 'accounts@kaluliniboys.ac.ke',
    displayName: 'Senior Bursar - Finance',
    role: 'STAFF',
    photoURL: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    phoneNumber: '+254 700 888 999',
    createdAt: '2023-01-01',
    updatedAt: '2026-01-01',
    status: 'active'
  },
  APPLICANT: {
    uid: 'usr-applicant-1',
    email: 'applicant.collins@example.com',
    displayName: 'Collins Mutiso (Applicant)',
    role: 'APPLICANT',
    photoURL: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    phoneNumber: '+254 711 223 344',
    createdAt: '2026-01-06',
    updatedAt: '2026-01-06',
    status: 'active'
  }
};

interface AuthContextType {
  currentUser: UserProfile | null;
  loading: boolean;
  loginAsRole: (role: UserRole) => void;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateCurrentProfile: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: false,
  loginAsRole: () => {},
  loginWithEmail: async () => false,
  logout: async () => {},
  updateCurrentProfile: () => {}
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kbhs_current_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return DEMO_USERS.ADMIN;
        }
      }
    }
    return DEMO_USERS.ADMIN; // Default initial user for instant review
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && currentUser) {
      localStorage.setItem('kbhs_current_user', JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    // Listen to Firebase Auth state if configured
    if (auth && typeof auth.onAuthStateChanged === 'function') {
      const unsubscribe = onAuthStateChanged(auth, (fbUser) => {
        if (fbUser) {
          // If a real Firebase user logged in
          setCurrentUser((prev) => ({
            uid: fbUser.uid,
            email: fbUser.email || 'user@kaluliniboys.ac.ke',
            displayName: fbUser.displayName || 'Authorized User',
            role: prev?.role || 'STUDENT',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'active'
          }));
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const loginAsRole = (role: UserRole) => {
    const demo = DEMO_USERS[role];
    setCurrentUser(demo);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kbhs_current_user', JSON.stringify(demo));
    }
  };

  const loginWithEmail = async (email: string, pass: string): Promise<boolean> => {
    setLoading(true);
    // Find matching role in demo directory or mock authentication
    const lowerEmail = email.toLowerCase().trim();
    let matchedUser = Object.values(DEMO_USERS).find((u) => u.email.toLowerCase() === lowerEmail);

    if (!matchedUser) {
      if (lowerEmail.includes('admin')) matchedUser = DEMO_USERS.ADMIN;
      else if (lowerEmail.includes('teacher')) matchedUser = DEMO_USERS.TEACHER;
      else if (lowerEmail.includes('student')) matchedUser = DEMO_USERS.STUDENT;
      else if (lowerEmail.includes('parent')) matchedUser = DEMO_USERS.PARENT;
      else if (lowerEmail.includes('applicant')) matchedUser = DEMO_USERS.APPLICANT;
      else {
        // Generic authenticated student user
        matchedUser = {
          uid: 'usr-' + Date.now(),
          email,
          displayName: email.split('@')[0],
          role: 'STUDENT',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'active'
        };
      }
    }

    setCurrentUser(matchedUser);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kbhs_current_user', JSON.stringify(matchedUser));
    }
    setLoading(false);
    return true;
  };

  const logout = async () => {
    try {
      if (auth && typeof auth.signOut === 'function') {
        await fbSignOut(auth);
      }
    } catch (e) {
      console.warn("Sign out fallback:", e);
    }
    setCurrentUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('kbhs_current_user');
    }
  };

  const updateCurrentProfile = (updates: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates, updatedAt: new Date().toISOString() };
    setCurrentUser(updated);
    if (typeof window !== 'undefined') {
      localStorage.setItem('kbhs_current_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        loginAsRole,
        loginWithEmail,
        logout,
        updateCurrentProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
