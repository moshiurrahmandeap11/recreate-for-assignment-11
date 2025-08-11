import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, FacebookAuthProvider, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.init';
import axios from 'axios';

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); 

  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  // Create user with email & password
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login user 
  const login = (email, password) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }

  // google login 
  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider)
  }

  // facebook login
  const facebookLogin = () => {
    return signInWithPopup(auth, facebookProvider)
  }

  // forgot password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  // logout user
  const logout = () => {
    return signOut(auth)
  }

  // Auth state observer
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    setUser(currentUser);
    setLoading(false);

    if (currentUser?.email) {
      try {
        const token = await currentUser.getIdToken(); 
        await axios.post(
          "https://coursion-server.vercel.app/jwt",
          { email: currentUser.email, token },
          { withCredentials: true }
        );
        console.log("JWT sent successfully");
      } catch (err) {
        console.error("JWT error:", err);
      }
    }
  });

  return () => unsubscribe();
}, []);



  const userinfo = {
    user,
    loading,
    createUser,
    login,
    logout,
    googleLogin,
    facebookLogin,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={userinfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
